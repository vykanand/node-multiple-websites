<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);
require 'randomagent.php';
session_start();
$servername = "localhost";
$username = "vykanand";
$password = "navneeta";
$dbname = "companies";
$stack = array();
$sda = array(array());
for ($i = 0; $i < 49626; $i++) {
    $client = new \Goutte\Client();
$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', random_uagent());
$url = "https://www.zaubacorp.com/company-list/company-type-PTC/p-".$i."-company.html";
$crawler1 = $client->request('GET', $url);
$f = $crawler1->filter('tr')->each(function ($node) {
    $n =$node->filter('td')->each(function ($node) {
    return $node->text()."\n";
});
    return $n;
});
array_shift($f);
// $stack = array();
// $sda = array(array());

    
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   
        $cin = $f['0']['0'];
        $company= $f['0']['1'];
        $state= $f['0']['2'];
        $status= $f['0']['3'];
        $refid =gen(5);
    


$response = array("page" => $i,"CIN" => $cin, "company" => $company, "state" => $state, "status" => $status);

     $query = "INSERT into india set cin='$cin', company='$company', state='$state', status='$status', refid='$refid'";
    mysqli_query($conn, $query);
    $conn->close();
     array_push($stack, $response) ;
$sda = $stack;

}
echo json_encode($sda);



function gen($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>
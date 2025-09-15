<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);
require 'randomagent.php';
session_start();
$servername = "localhost";
$username = "vykanand";
$password = "navneeta";
$dbname = "companies";
$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', random_uagent());

// $ifs = rawurlencode($_POST['company']);


for ($n = 0; $n < 57797; $n++) {
$url = "https://www.zaubacorp.com/company-list/p".$n."-company.html";
$crawler1 = $client->request('GET', $url);
$f = $crawler1->filter('tr')->each(function ($node) {
    $n =$node->filter('td')->each(function ($node) {
    return $node->text()."\n";
});
    return $n;
});
array_shift($f);
$stack = array();
$sda = array(array());
for ($i = 0; $i < count($f); $i++) {
 		$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
 		$cin = $f[$i]['0'];
 		$company= $f[$i]['1'];
 		$state= $f[$i]['2'];
 		$status= $f[$i]['3'];
 		$refid =gen(5);
// $res = preg_replace("/[^a-zA-Z0-9]/", " ", $company);
 		
 		$t =mysql_real_escape_string($company);
$rpc = str_replace(' ', '-', $t);

$urly = "https://www.zaubacorp.com/company/".$rpc."/".$cin;

$crawler1 = $client->request('GET', $urly);
$s = $crawler1->filter('[class="col-lg-6 col-md-6 col-sm-12 col-xs-12"]')->each(function ($node) {
    $nl = $node->filter('p')->each(function ($node) {
    return $node->text()."\n";
});
     return $nl;
});

$lk = $crawler1->filter('[class="col-lg-12 col-md-12 col-sm-12 col-xs-12"]')->each(function ($node) {
    $ln = $node->filter('a')->each(function ($node) {
    return $node->text()."\n";
});
     return $ln;
});
    
	if(!empty($lk)){
$director = $lk[7][0];
    $email = str_replace(" Email ID: ", "", $s[2][0]);
    $website = str_replace("Website: ", "", $s[2][1]);
    $address = $s[2][3];
}else{
	$director = "Director not found";
    $email = "email not found";
    $website = "website private";
    $address = "private";

}





     $response = array("CIN" => $f[$i]['0'], "company" => $f[$i]['1'], "state" => $f[$i]['2'], "status" => $f[$i]['3']);

     $query = "INSERT into india set cin='$cin', company='$company', state='$state', status='$status', refid='$refid', email='$email', website='$website', address='$address', director='$director'";
    mysqli_query($conn, $query);
    $conn->close();
     array_push($stack, $response) ;
$sda = $stack;
}
echo json_encode($sda);
}

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
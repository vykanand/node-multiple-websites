<?php
require 'vendor/autoload.php';
require 'gdata.php';

ini_set('max_execution_time', 3000);
$servername = "localhost";
$username = "vykanand";
$password = "navneeta";
$dbname = "gq";
$gv = "";
$indidata = "http://localhost/gq/com.php";
$goog = "http://localhost/gq/gdata.php";

$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), ));
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$client->setClient($guzzleClient);


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['company']) && $_POST['company']!== null && isset($_POST['apikey']) && $_POST['apikey']!== null)
{
    $t = $_POST['company'];
    $a = $_POST['apikey'];

    $sqlj = "SELECT * FROM users WHERE apikey = '$a'";
  $resulty = mysqli_query($conn,$sqlj)or die("Connection failed: " . $conn->connect_error);
  $rxv = mysqli_fetch_assoc($resulty);
  $refid = $rxv['refid'];
  $addedby = $rxv['firstname']." ".$rxv['lastname'];

$post_data2 = "company=".$t;
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL,$indidata);
curl_setopt($ch2, CURLOPT_POST, 1);
curl_setopt($ch2, CURLOPT_POSTFIELDS,$post_data2);
curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec ($ch2);
curl_close ($ch2);
$eru = json_decode($server_output,true);
$contc = $eru['contact'];
$add = $eru['address'];
$dsc = $eru['description'];

// $ch3 = curl_init();
// curl_setopt($ch3, CURLOPT_URL,$goog);
// curl_setopt($ch3, CURLOPT_POST, 1);
// curl_setopt($ch3, CURLOPT_POSTFIELDS,$post_data2);
// curl_setopt($ch3, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
// curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
// $server_output3 = curl_exec ($ch3);
// curl_close ($ch3);
// $eru3 = json_decode($server_output3,true);
$eru3 = gdata($t);
$contc3 = $eru3['directorname'];
$add3 = $eru3['directorlinkedin'];
$dsc3 = $eru3['companywork'];
$wdq = $eru3['phone'];
$dqw = $eru3['address'];

if(empty($add) || empty($dsc) || empty($contc)){

 $query = "INSERT into elv set company='$t', contact='$wdq', address='$dqw', description='$dsc3', directorname='$contc3', directorlinkedin='$add3', apikey='$a', refid='$refid', addedby='$addedby'";
    mysqli_query($conn, $query);
    $conn->close();
// echo $t." Successfully added from external sources ";
echo $t.$contc3.$add3.$dsc.$wdq.$dsc3;
}

else{
    $query = "INSERT into elv set company='$t', contact='$contc', address='$add', description='$dsc', directorname='$contc3', directorlinkedin='$add3', apikey='$a'";
    mysqli_query($conn, $query);
    
$conn->close();
echo $t." Successfully added.But the all the information could not be retrieved";
}


}else{
	echo "Couldnt capture data or Failed to login.Try again!";
}


?>
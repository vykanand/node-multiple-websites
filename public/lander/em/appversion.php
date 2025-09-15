<?php
require 'vdr/autoload.php';
ini_set('max_execution_time', 3000);
 header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    date_default_timezone_set('Asia/Kolkata');
$package = $_POST['package'];

$url2 = 'https://play.google.com/store/apps/details?id='.$package.'&hl=en';

$client = new \Goutte\Client();
$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); 
$client->setClient($guzzleClient);
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$crawler2 = $client->request('GET', $url2);
$n = $crawler2->filter('span')->each(function ($node) {
   $fs = $node->text();
		return $fs;
});
$trm[] = array("version" => trim($n[105]));
echo json_encode($trm);
// print_r($n);

?>
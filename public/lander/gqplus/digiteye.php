<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);

// $co = $_POST['car'];
$url2 = 'http://www.digit-eyes.com/upcCode/8901786431014.html';

$client = new \Goutte\Client();
$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); 
$client->setClient($guzzleClient);
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$crawler2 = $client->request('GET', $url2);
$n = $crawler2->filter('[itemprop="name"]')->each(function ($node) {
return $node->text();
});
print_r($n);
?>
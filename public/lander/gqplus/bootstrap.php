<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);
require 'randomagent.php';
$client = new \Goutte\Client();
$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', random_uagent());
$url = "http://info.shine.com/company/list-of-top-companies.html";
$crawler1 = $client->request('GET', $url);
$f = $crawler1->filter('tr')->each(function ($node) {
    return $node->text()."\n";
});
print_r($f);
?>
<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);
require 'randomagent.php';

function getcrawler($rt){
$client = new \Goutte\Client();
$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', random_uagent());
$crawler = $client->request('GET', $rt);
return $crawler;
}

$url = "http://www.consultingmag.com/news/consultants-on-consulting/";
$crawler1 = getcrawler($url);
$s = $crawler1->filter('[class="edittools-contentitem media stream_item"]')->each(function ($node) {
   $v = $node->filter('h4')->each(function ($node) {
    return $node->text()."\n";

});
return $v;
});

$x = $crawler1->filter('[class="edittools-contentitem media stream_item"]')->each(function ($node) {
   $v = $node->filter('p')->each(function ($node) {
    return $node->text()."\n";

});
return $v;
});

$stack = array();
$sda = array(array());
$length = count($s);
for ($i = 0; $i < $length; $i++) {
   $response = array("topic" => trim($s[$i][0]),"description" => trim($x[$i][0]));
     array_push($stack, $response) ;
$sda = $stack;
}
echo json_encode($sda);
?>
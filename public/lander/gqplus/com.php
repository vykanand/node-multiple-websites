<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);
$iv = rawurlencode($_POST['company']);
$ei = getct($iv);
$et = getadd($iv);
$ds = getdesc($iv);
 $message = array("contact" => $ei,"address" => $et,"description" => $ds);
 $ru = json_encode($message);
 echo $ru;

function getct($iv){
$url = "https://dir.indiamart.com/search.mp?ss=".$iv;

$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);

$crawler = $client->request('GET', $url);


$t = $crawler->filter('[class="ls_co phn"]')->each(function ($node) {
    return $node->text()."\n";
});
$u = preg_replace("/[^0-9]/","",$t[0]);
return $u;
}


function getadd($iv){
$urlw = "https://dir.indiamart.com/search.mp?ss=".$iv;

$clientw = new \Goutte\Client();

$guzzleClientz = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $clientw->setClient($guzzleClientz);

$crawlerz = $clientw->request('GET', $urlw);


$tt = $crawlerz->filter('[class="srad cty-t"]')->each(function ($node) {
    return $node->text()."\n";
});

return $tt[0];
}

function getdesc($iv){
$urlw = "https://dir.indiamart.com/search.mp?ss=".$iv;

$clientw = new \Goutte\Client();

$guzzleClientz = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $clientw->setClient($guzzleClientz);

$crawlerz = $clientw->request('GET', $urlw);


$tt = $crawlerz->filter('[class="desc des_p"]')->each(function ($node) {
    return $node->text()."\n";
});
$np = $tt[0];
$vp = trim(preg_replace('/\t+/', '', $np));
return $vp;
}

function getextgoog($iv){
$url = "https://www.google.co.in/search?q=".$iv);

$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$client->setClient($guzzleClient);
$crawler = $client->request('GET', $url);


$tb = $crawler->filter('[class="mod"]')->each(function ($node) {
    return $node->text()."\n";
});
// $nadd = $tb[3];
// $ndsc = $tb[1];
// $nctc = preg_replace("/[^0-9]/","",$tb[4]);
return $tb;
}

?>
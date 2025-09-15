<?php
require 'vendor/autoload.php';

$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$client->setClient($guzzleClient);

$ifs = rawurlencode($_POST['company']);




$url = "https://www.google.co.in/search?q=".$ifs." linkedin";
$crawler1 = $client->request('GET', $url);
$r = $crawler1->filter('[class="r"]')->each(function ($node) {
    return $node->text()."\n";
});
$f = $crawler1->filter('[class="f kv _SWb"]')->each(function ($node) {
    return $node->text()."\n";
});
$s = $crawler1->filter('[class="slp f"]')->each(function ($node) {
    return $node->text()."\n";
});
$sbb = str_replace(" | LinkedIn", "", $r[1]);
$sb = str_replace("Similar", "", $f[1]);
print_r($sbb.$sb.$s[0]);




$url2 = "https://www.google.co.in/search?q=".$ifs." contact number";

$crawler2 = $client->request('GET', $url2);


$ry = $crawler2->filter('[data-dtype="d3ph"]')->each(function ($node) {
    return $node->text()."\n";
});

if(!empty($ry)){
	$rlett = preg_replace("/[^0-9]/","",$ry[0]);
$rnum =  preg_replace('/[0-9]+/', '', $ry[0]);
$maincntct = $rlett;
}
else{
	$url3 = "https://www.google.co.in/search?q=".$ifs." phone number";

$crawler3 = $client->request('GET', $url3);


$rg = $crawler3->filter('[class="st"]')->each(function ($node) {
    return $node->text()."\n";
});
$maincntct = $rg[0];
}

$url4 = "https://www.google.co.in/search?q=".$ifs." what does company do";

$crawler4 = $client->request('GET', $url4);


$rx = $crawler4->filter('[class="st"]')->each(function ($node) {
    return $node->text()."\n";
});
print_r($rx[0]);
print_r($maincntct);
?>
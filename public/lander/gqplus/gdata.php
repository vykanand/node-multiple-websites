<?php

$ifi = rawurlencode($_POST['company']);
if($ifi !== null){
    echo json_encode(gdata($ifi));
}
function gdata($ifs){
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);
// $config = [
//     'proxy' => [
//         'http' => '70.87.222.74:80'
//         ]
//     ];
$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$client->setClient($guzzleClient);


// $rpc = str_replace(' ', '-', $trl);
// $urlb = "https://www.linkedin.com/company/".$ifs;
// $crawlerb = $client->request('GET', $urlb);
// $r = $crawler1->filter('[class="r"]')->each(function ($node) {
//     return $node->text()."\n";
// });


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
$directorname = str_replace(" | LinkedIn", "", $r[1]);
$directorlinkedin = $f[0] ? $f[0]:$f[1] || !$f[1] ? $f[2]:$f[3];


$ifn = $_POST['company'];
$df = preg_replace('#[ -]+#', '-', $ifn);
$url = "https://site2corp.com/in/".$df;
$crawler1 = $client->request('GET', $url);
$r = $crawler1->filter('[itemprop="name"]')->each(function ($node) {
    return $node->text()."\n";
});
$tr = array_shift($r);
$c = implode(" ", $r);
if( $directorname == $ifn && !empty($c)){
 $directorname = $c;   
}



$url2 = "https://www.google.co.in/search?q=".$ifs." contact number";

$crawler2 = $client->request('GET', $url2);


$ry = $crawler2->filter('[data-dtype="d3ph"]')->each(function ($node) {
    return $node->text()."\n";
});

if(!empty($ry)){
	$rlett = preg_replace("/[^0-9]/","",$ry[0]);
$rnum =  preg_replace('/[0-9]+/', '', $ry[0]);
$aqa = $rlett;
$maincntct = preg_replace("/[^0-9]/","",$aqa);
}
else{
	$url3 = "https://www.google.co.in/search?q=".$ifs." phone number";

$crawler3 = $client->request('GET', $url3);


$rg = $crawler3->filter('[class="st"]')->each(function ($node) {
    return $node->text()."\n";
});
$asa = $rg[0];
$maincntct = preg_replace("/[^0-9]/","",$asa);
}

$url4 = "https://www.google.co.in/search?q=".$ifs." what does company do";

$crawler4 = $client->request('GET', $url4);


$rx = $crawler4->filter('[class="st"]')->each(function ($node) {
    return $node->text()."\n";
});
$work = $rx[0];


$url5 = "https://www.google.co.in/search?q=".$ifs." company address";

$crawler5 = $client->request('GET', $url5);


$rxi = $crawler5->filter('[class="_XWk"]')->each(function ($node) {
    return $node->text();
});
if(empty($rxi)){


	$url54 = "https://www.google.co.in/search?q=".$ifs." company full address";

$crawler54 = $client->request('GET', $url54);


$rxi = $crawler54->filter('[class="st"]')->each(function ($node) {
    return $node->text()."\n";
});
$address = $rxi[3];
}
else{
	$address = $rxi[0];
}


$message = array("directorname" => $directorname,"directorlinkedin" => $directorlinkedin,"companywork" => $work,"phone" => $maincntct,"address" => $address);
 $ru = json_encode($message);
 return $message;
}
?>
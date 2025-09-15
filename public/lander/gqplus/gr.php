<?php
require 'vendor/autoload.php';
ini_set('max_execution_time', 3000);

// $co = $_POST['car'];
// print_r(getdirectors($co)) ;
// function getdirectors($comp){
// $url2 = "https://corporatedir.com/company/Ksb-Consultancy-Private-Limited";

	// $rpc = str_replace(' ', '-', $comp);
$url2 = 'https://www.zigwheels.com/newcars/Mahindra/XUV-500/on-road-price-pune';

$client = new \Goutte\Client();
$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); 
$client->setClient($guzzleClient);
$client->setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
$crawler2 = $client->request('GET', $url2);
$n = $crawler2->filter('[class="gscr_lslide"]')->each(function ($node) {
   $b = $node->filter('tr')->each(function ($node) {
    return $node->text()."\n";

});
return $b;
});
// $dir = "";
// foreach ($n[4] as $key => $value) {
// 	$dir .= str_replace("Claim this company ", "", $value."/");
// }
// $opr1 = substr($dir, 0, -3);
// $directorname = preg_grep("/^Claim this company $/i", $n[4], PREG_GREP_INVERT);
// return $directorname;
// }
?>
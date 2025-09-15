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
// $url = "http://info.shine.com/company/list-of-top-companies.html";
// $crawler1 = $client->request('GET', $url);
// $f = $crawler1->filter('a[class="cls_company_detail"]')->each(function ($node) {
//     return $node->text()."\n";
// });
// var_dump($f[0]);

$ifi = rawurlencode($_POST['company']);
// $company = "A P Impex Private Limited";
// $rpc = str_replace(' ', '-', $company);
$url = "https://corporatedir.com/".$ifi;
$crawler1 = getcrawler($url);
$s = $crawler1->filter('tr')->each(function ($node) {
   $v = $node->filter('td')->each(function ($node) {
    return $node->text()."\n";

});
return $v;
});
array_shift($s);
$rpc = str_replace(' ', '-', $s[0][0]);
$url2 = "https://corporatedir.com/company/".$rpc;

$post_data2 = "company=".$s[0][0];
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL,"http://localhost/gq/gr.php");
curl_setopt($ch2, CURLOPT_POST, 1);
curl_setopt($ch2, CURLOPT_POSTFIELDS,$post_data2);
curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec ($ch2);
curl_close ($ch2);


print_r($server_output);
?>
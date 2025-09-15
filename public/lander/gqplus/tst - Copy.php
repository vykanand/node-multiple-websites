<?php
require 'vendor/autoload.php';
require 'randomagent.php';
$client = new \Goutte\Client();

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), )); $client->setClient($guzzleClient);
$client->setHeader('User-Agent', random_uagent());
$client->setClient($guzzleClient);

function strbefore($string, $substring) {
  $pos = strpos($string, $substring);
  if ($pos === false)
   return $string;
  else  
   return(substr($string, 0, $pos));
}

function strafter($string, $substring) {
  $pos = strpos($string, $substring);
  if ($pos === false)
   return $string;
  else  
   return(substr($string, $pos+strlen($substring)));
}
// $ifs = rawurlencode($_POST['company']);
// $i = $_POST['page'];
// $url = "https://www.fundoodata.com/companyinfo/?&pageno=".$i."&tot_rows=82471&total_results=82471&no_of_offices=0";
$i = $_POST['page'];
$url = "https://www.fundoodata.com/companyinfo/?&pageno=4&tot_rows=82471&total_results=82471&no_of_offices=0";
$crawler1 = $client->request('GET', $url);
$h = $crawler1->filter('[class="search-result-left"]')->each(function ($node) {
    return $node->text()."\n";
});
$m = str_replace("(adsbygoogle = window.adsbygoogle || []).push({});", "", $h);
// $arr = explode("  ", $h, 2);

// $company = str_replace(": ", "",  strbefore($h[0],'Industry') );
// $ind1 = strafter($h[0],'Industry');
// $industry = str_replace(": ", "",  strbefore($ind1 ,'Sub Industry') );
// $sub1 = strafter($h[0],'Sub Industry');
// $subindustry = str_replace(": ", "", strbefore($sub1 ,'Company Type') );
// $com1 = strafter($h[0],'Company Type');
// $companytype = str_replace(": ", "", strbefore($com1 ,'Level of Office') );
// $coml = strafter($h[0],'Level of Office');
// $companylevel = str_replace(": ", "", strbefore($coml ,'Location') );
// $companylocation = str_replace(": ", "", strafter($h[0] ,'Location') );
// print_r($industry.$subindustry.$companytype.$companylevel.$companylocation);
$stack = array();
$sda = array(array());
$l = count($m);
 for($i = 0;  $i < 1; ++$i) {
 // do something with $array[$i]

$company = strbefore($h[i],'Industry');
$ind1 = strafter($h[i],'Industry');
$industry = strbefore($ind1 ,'Sub Industry');
$sub1 = strafter($h[i],'Sub Industry');
$subindustry = strbefore($sub1 ,'Company Type');
$com1 = strafter($h[i],'Company Type');
$companytype = strbefore($com1 ,'Level of Office');
$coml = strafter($h[i],'Level of Office');
$companylevel = strbefore($coml ,'Location');
$companylocation = strafter($h[i] ,'Location');

$response = array("industry" => $industry, "subindustry" => $subindustry, "companytype" => $companytype, "companylevel" => $companylevel, "companylocation" => $companylocation);
array_push($stack, $response) ;
$sda = $stack;

}
echo json_encode($sda);
?>
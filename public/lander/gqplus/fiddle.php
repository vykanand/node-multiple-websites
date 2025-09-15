<?php
function getUrl($url)
{
    $ch = curl_init(); 
    $timeout = 5; // set to zero for no timeout 
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout); 
    curl_setopt ($ch, CURLOPT_URL, $url); 
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_PROXY, "http://70.87.222.74"); //your proxy url
    curl_setopt($ch, CURLOPT_PROXYPORT, "80"); // your proxy port number 
    // curl_setopt($ch, CURLOPT_PROXYUSERPWD, "username:pass"); //username:pass 
    $file_contents = curl_exec($ch); 
    curl_close($ch); 
    return $file_contents;
}

echo  getUrl("http://www.google.com");
?>
<html>
<head>
<title>CCAvenue Payment</title>
</head>
<body>
<center>
 
<?php include('crypto.php');?>
<?php 
header('Access-Control-Allow-Origin: *');
	error_reporting(0);
	
	$merchant_data='';
	$working_key='F156FD5D023DCF99B33FD6DC7E33337F';//Shared by CCAVENUES
	$access_code='AVWY78FE34CM67YWMC';//Shared by CCAVENUES
	
	foreach ($_POST as $key => $value){
		$merchant_data.=$key.'='.$value.'&';
	}
 	// echo $merchant_data;
	$encrypted_data=encrypt($merchant_data,$working_key); // Method for encrypting the data.
 
?>
<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
<?php
echo "<input type=hidden name=encRequest value=$encrypted_data>";
echo "<input type=hidden name=access_code value=$access_code>";
?>
</form>
</center>
<script language='javascript'>document.redirect.submit();</script>
</body>
</html>
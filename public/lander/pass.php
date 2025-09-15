<?php
$res = htmlspecialchars($_GET["email"]);
// $resar = array('response' => $res." - Email Submitted Successfully!" );
// echo json_encode($resar);
echo $res." - Email added to subscriber list"
?>
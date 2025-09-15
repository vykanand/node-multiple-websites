<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

$dbServerName = "localhost";
$dbUsername = "root";
$dbPassword = "vikas3891";
$dbName = "mtush";
$port = "3306";

// create connection
$conn = new mysqli($dbServerName, $dbUsername, $dbPassword, $dbName, $port);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
	// echo "Connected successfully";
}



$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$spreadsheet = $reader->load("categ.xlsx");

$sheetData = $spreadsheet->getActiveSheet()->toArray();
$trt = array_shift($sheetData);
print_r($sheetData);
foreach($sheetData as $key=>$value){
     // print_r($value[0]);
//      $sql = "INSERT INTO categories (name, subcategory, minicategory) VALUES ('$value[0]', '$value[1]', '$value[2]')";
//      if(mysqli_query($conn, $sql)){
//     echo "Records inserted successfully.";
// } else{
//     echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
// }
 }

?>

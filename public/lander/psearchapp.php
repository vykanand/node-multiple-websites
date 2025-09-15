<?php 
header('Access-Control-Allow-Origin: *');
$dbServerName = "localhost";
$dbUsername = "root";
$dbPassword = "vikas3891";
$dbName = "saral";
$port = "3306";
$kw = $_GET['k'];
// echo $kw;
// create connection
$conn = new mysqli($dbServerName, $dbUsername, $dbPassword, $dbName, $port);
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }else{
// 	echo "Connected successfully";
// }
$sql= "SELECT * FROM products WHERE name LIKE '%$kw%' GROUP BY name LIMIT 7";
$q = mysqli_query($conn, $sql);
$rows = array();
while ($row = mysqli_fetch_assoc($q)) {
    $rows[] = $row;
}
if ($kw == "") {
	$rows =[];
	echo json_encode($rows);
}else{
echo json_encode($rows);
}
 ?>
<?php 
header('Access-Control-Allow-Origin: *');
$dbServerName = "localhost";
$dbUsername = "root";
$dbPassword = "vikas3891";
$dbName = "products";
$port = "3306";

$productname = $_POST['productname'];
// $image = $_POST['image'];
// $weight = $_POST['weight'];
// $unit = $_POST['unit'];
// $hsncode = $_POST['hsncode'];
// $brand = $_POST['brand'];
// $sgst = $_POST['sgst'];
// $cgst = $_POST['cgst'];
// $rate = $_POST['rate'];
// $mrp = $_POST['mrp'];
// $barcode = $_POST['barcode'];
// $category = $_POST['category'];

$col = '';
$va = '';
$_POST['image'] = str_replace(' ', '+', $_POST['image']);
foreach( $_POST as $p => $v ) {
	// echo $p.'--'.$v;
	$col .= $p.',';
	$va  .= '\''.$v.'\',';
}
$values = rtrim($va,",");
$column = rtrim($col,",");
$sql = "INSERT INTO productdata (".$column.") VALUES (".$values.")";
// echo $sql;

$conn = new mysqli($dbServerName, $dbUsername, $dbPassword, $dbName, $port);

$sqlj= "SELECT productname FROM productdata WHERE productname = '$productname'";
$q = mysqli_query($conn, $sqlj);
// $rowsz = array();
if (mysqli_num_rows($q) > 0) {
$message = array("status" => 'found',"sql" => $sql);
}
else{
	// $message = array("status" => 'not found');
	if(mysqli_query($conn,$sql)){
$message = array("status" => 'success',"sql" => $sql);
  }else{
$message = array("status" => 'failed',"sql" => $sql);
  }
}
// while ($row = mysqli_fetch_assoc($q)) {
//     $rowsz[] = $row;
// }


// if (!empty($rowsz)) {
//      $message = array("status" => 'found');
// }
// else{
// 	$message = array("status" => 'not found');
// 	if(mysqli_query($conn,$sql)){
// $message = array("status" => 'succees');
//   }else{
// $message = array("status" => 'failed');
//   }

// }
echo json_encode($message);
// if(mysqli_query($conn,$sql)){
// $message = array("status" => 'succees');
//   }else{
// $message = array("status" => 'failed');
//   }
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }else{
// 	echo "Connected successfully";
// }

?>
<?php
// $r = file_get_contents( 'php://input' );
// echo $r;
require 'emailapi/phpmailer/PHPMailerAutoload.php';
$servername = "localhost";
$db = "webcon";
$username = "root";
$password = "vikas3891";

// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
    die("failed: " . $conn->connect_error);
} 
// echo "Connected successfully";

if (isset($_GET["action"]) && isset($_GET["secureKey"])) {
	// $res = htmlspecialchars($_GET["action"]);
	
$acti = $_GET["action"];
$fNam = $_GET["fName"];
$phon = $_GET["phoneNo"];
$emai = $_GET["emailId"];
$text = $_GET["textArea"];
$slctE = $_GET["slctEnqry"];
$slctC = $_GET["slctCater"];
$slctV = $_GET["slctCaterValue"];
$secu = $_GET["secureKey"];
$time = $_GET["timeZone"];

// echo $fNam
// ."<br>".$phon
// ."<br>".$emai
// ."<br>".$text
// ."<br>".$slct
// ."<br>".$time;

$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < 5; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

$sql = "INSERT INTO con (name, comment, email, phone, slctCater, slctEnqry, secureKey, timeZone, slctV, refid)
 VALUES ('$fNam', '$text', '$emai', '$phon', '$slctC', '$slctE', '$secu', '$time', '$slctV','$randomString')";

if ($conn->query($sql) === TRUE) {
    $m = array("result" => "Submitted successfully");
    // echo json_encode($m);

    $to=$emai;
  $body="Your Query Has been submitted successfully with Reference ID ".$randomString.".We Will Contact You soon.Please Prepare your Project Requirements Accordingly.Documented or Presentation Format of Project would be highly Helpful.Thank You for Your Patience.";
 
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->CharSet="UTF-8";
$mail->SMTPSecure = 'tls';
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->Username = 'vykanand';
$mail->Password = 'vikas3891';
$mail->SMTPAuth = true;
// $mail->SMTPDebug = 1;
$mail->IsHTML(true);
$mail->From = 'support@appsthink.com';
$mail->FromName = 'Appsthink Team';
$mail->AddAddress($to);
$mail->AddReplyTo('support@appsthink.com', 'Customer Care');

$mail->IsHTML(true);
$mail->Subject    = "appsthink.com";
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!";
$file = fopen("emailapi/t1.html","r");
$str=fread($file,filesize("emailapi/t1.html"));
$str = trim($str);
fclose($file);
$file2 = fopen("emailapi/t2.html","r");
$str2=fread($file2,filesize("emailapi/t2.html"));
$str2 = trim($str2);
fclose($file2);
$mail->Body    = $str.$body.$str2;

if(!$mail->send()){
  $message = array("response" => $mail->ErrorInfo);
   // echo "result";
}
else{
  $message = array("response" => "success");
}
  echo "result";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    // echo "Sorry Please fill all the fields correctly";
}

$conn->close();

// $m = array("response" => $fNam
// .$phon
// .$emai
// .$text
// .$slct
// .$time);
// echo json_encode($m);
// }else{  
//    echo "Error";
}

?>
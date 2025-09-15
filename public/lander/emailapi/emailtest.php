<?php
require 'PHPMailerAutoload.php';

$username='vykanand';
$password='nanvneeta';
$email= "vanika.awasthi@gmail.com";
$apikey= 'qrw321asdas';

// Fetching data that is entered by the user
$email = 'vanika.awasthi@gmail.com';
$password = 'vikas3891';
$to_id = 'vykanand@gmail.com';
$message = 'hi';
$subject = 'work';

// Configuring SMTP server settings
$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = $email;
$mail->Password = $password;

// Email Sending Details
$mail->addAddress($to_id);
$mail->Subject = $subject;
$mail->msgHTML($message);

// Success or Failure
if (!$mail->send()) {
	
$error = "Mailer Error: " . $mail->ErrorInfo;
echo '<p id="para">'.$error.'</p>';
}
else {
echo '<p id="para">Message sent!</p>';
}

?>
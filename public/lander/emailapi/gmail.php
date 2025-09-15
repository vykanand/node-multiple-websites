<?php
require 'PHPMailerAutoload.php';

$user = 'care.offerkhoj';
$pass= 'navneeta';
$from= 'offerkhoj';
$recipientname='Member';
$rec = $_REQUEST['email'];
$recipients= ($rec);
$mrecipients = array(
   'vykanand@gmail.com' => '1',
   'vanika.awasthi@gmail.com' => '2',
   'nisha.single89@gmail.com' => '3',
   // ..
);
$mail = new PHPMailer;
foreach($mrecipients as $email => $name)
{
   $mail->AddBCC($email, $name);
}


$mail->isSMTP();/*Set mailer to use SMTP*/
$mail->Host = 'smtp.gmail.com';/*Specify main and backup SMTP servers*/
$mail->Port = 587;
$mail->SMTPAuth = true;/*Enable SMTP authentication*/
$mail->Username = $user;/*SMTP username*/
$mail->Password = $pass;/*SMTP password*/
$mail->SMTPSecure = 'tls';//*Enable encryption, 'ssl' also accepted
$mail->From = 'care.offerkhoj@gmail.com';
$mail->FromName = $from;
$mail->addAddress($recipients, $recipientname);/*Add a recipient*/
$mail->addReplyTo('care.offerkhoj@gmail.com', 'offerkhojcareteam');
/*$mail->addCC('cc@example.com');*/
/*$mail->addBCC('bcc@example.com');*/
$mail->WordWrap = 70;/*DEFAULT = Set word wrap to 50 characters*/
// $mail->addAttachment('../tmp/' . $varfile, $varfile);/*Add attachments*/
/*$mail->addAttachment('/tmp/image.jpg', 'new.jpg');*/
/*$mail->addAttachment('/tmp/image.jpg', 'new.jpg');*/
$mail->isHTML(false);/*Set email format to HTML (default = true)*/
$mail->Subject = 'OfferKhoj Care';
$mail->Body    = 'You have been successfully Register as '.$rec;
// $mail->AltBody = $message;
if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo "sent successfully!";
}
?>
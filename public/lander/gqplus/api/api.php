<?php
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
date_default_timezone_set('Asia/Kolkata');
require_once("Rest.inc.php");
include'apiconfig.php';
include('way2sms-api.php');
require 'phpmailer/PHPMailerAutoload.php';
class API extends REST {
     
    public $data = "";
     
    private $db = NULL;
 
    public function __construct(){
        parent::__construct();              // Init parent contructor
        $this->dbConnect();                 // Initiate Database connection
}
     
private function dbConnect(){
 include'apiconfig.php';
  $this->db = mysqli_connect($dbhost,$dbuser,$dbpass);
  $this->elv = $elv;
  $this->users = $users;
        if($this->db)
            mysqli_select_db($this->db,$dbase);
}
     
    /*
     * Public method for access api.
     * This method dynmically call the method based on the query string
     *
     */
public function processApi(){
        $func = strtolower(trim(str_replace("/","",$_REQUEST['rquest'])));
        if((int)method_exists($this,$func) > 0)
            $this->$func();
        else
            $this->response('Error code 404, Page not found',404);   // If the method not exist with in this class, response would be "Page not found".
}


private function livesearch(){
   if(!empty($_POST["keyword"])) {
    $srch = $_POST["keyword"];
$sql ="SELECT * FROM ".$this->elv." WHERE company like '" .$srch. "%' || description like '" .$srch. "%' || contact like '" .$srch. "%'";
    // $sql = "SELECT * FROM `business` WHERE `name` REGEXP '[[:<:]]".$srch."[[:>:]]'";
$result = mysqli_query($this->db,$sql);
while($row=mysqli_fetch_assoc($result)) {
      $resultset[] = $row;
    }
if(!empty($resultset)) {
  $stack = array();
$sda = array(array());
foreach($resultset as $searched) {
$c = $searched["company"];
$id = $searched["id"];
$des = $searched["description"];
$co = $searched["contact"];
 $response = array("id" => $id,"company" => $c,"description" => $des,"contact" => $co);
   array_push($stack, $response) ;
$sda = $stack;
}
echo $this->jsn($sda);
}

  }
}

private function hourlyleads(){
  $refid = $this->_request['refid'];
 $sql = "SELECT DATE_FORMAT(created_at, '%h:%i %p'),COUNT(*) FROM ".$this->elv." WHERE refid='$refid' && created_at >= CURRENT_DATE() GROUP BY HOUR(created_at) LIMIT 7";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();

while($r = mysqli_fetch_row($result)) {
  $fulldata[] = $r;
}
echo $this->jsn($fulldata);

  }

private function dailyleads(){
  $refid = $this->_request['refid'];
 $sql = "SELECT DATE_FORMAT(created_at, '%d %b'),COUNT(*) FROM ".$this->elv." WHERE refid='$refid' GROUP BY DAY(created_at) ORDER BY created_at ASC LIMIT 7";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();

while($r = mysqli_fetch_row($result)) {
  $fulldata[] = $r;
}
echo $this->jsn($fulldata);

  }

  private function monthlyleads(){
  $refid = $this->_request['refid'];
 $sql = "SELECT DATE_FORMAT(created_at, '%b'),COUNT(*) FROM ".$this->elv." WHERE refid='$refid' GROUP BY MONTH(created_at) LIMIT 7";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();

while($r = mysqli_fetch_row($result)) {
  $fulldata[] = $r;
}
echo $this->jsn($fulldata);

  }

private function showdata(){
  $apikey = $this->_request['apikey'];
 $sql = "SELECT id, company, contact, address, description, directorname, directorlinkedin FROM ".$this->elv." WHERE apikey = '$apikey' ORDER BY created_at DESC";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();
while($r = mysqli_fetch_assoc($result)) {
  $fulldata[] = $r;
}
// shuffle($fulldata);
echo $this->jsn($fulldata);
  }

  private function showcompany(){
  $apikey = $this->_request['apikey'];
  $id = $this->_request['id'];
 $sql = "SELECT id, company, contact, address, description, directorname, directorlinkedin FROM ".$this->elv." WHERE apikey = '$apikey' AND id = '$id'";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();
while($r = mysqli_fetch_assoc($result)) {
  $fulldata[] = $r;
}
shuffle($fulldata);
echo $this->jsn($fulldata);
  }

private function showusers(){
  $refid = $this->_request['refid'];
 $sql = "SELECT id, username, firstname, lastname, loginstatus FROM ".$this->users." WHERE refid = '$refid' AND role = 'user'";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();
while($r = mysqli_fetch_assoc($result)) {
  $fulldata[] = $r;
}
shuffle($fulldata);
echo $this->jsn($fulldata);
  }

private function showuseranalysis(){
  $refid = $this->_request['refid'];
 $sql = "SELECT id, username, firstname, lastname, loginstatus, apikey FROM ".$this->users." WHERE refid = '$refid' AND role = 'user'";
$result = mysqli_query($this->db,$sql);
$stack = array();
$sda = array(array());
while($r = mysqli_fetch_assoc($result)) {
  $a = $r['apikey'];
$sqlm = "SELECT created_at,COUNT(*) FROM ".$this->elv." WHERE apikey='$a' GROUP BY DAY(created_at) ORDER BY created_at DESC LIMIT 1";
$resultm = mysqli_query($this->db,$sqlm);
$sk = mysqli_fetch_assoc($resultm);
$sqlb = "SELECT created_at,COUNT(*) FROM ".$this->elv." WHERE apikey='$a' GROUP BY MONTH(created_at) ORDER BY created_at DESC LIMIT 1";
$resultb = mysqli_query($this->db,$sqlb);
$suk = mysqli_fetch_assoc($resultb);
$response = array("id" => $r['id'],"firstname" => $r['firstname'],"lastname" => $r['lastname'],"username" => $r['username'],"loginstatus" => $r['loginstatus'],"created" => date('h:m A,d M Y', strtotime($sk['created_at'])),"dayleads" => $sk['COUNT(*)'],"monthleads" => $suk['COUNT(*)']);
array_push($stack, $response) ;
$sda = $stack;
}
echo $this->jsn($sda);
  }


 private function companyadmin(){
  $refid = $this->_request['refid'];
 $sql = "SELECT id, company, contact, address, description, directorname, directorlinkedin, created_at, addedby FROM ".$this->elv." WHERE refid = '$refid' ORDER BY created_at DESC";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();
while($r = mysqli_fetch_assoc($result)) {
  $fulldata[] = $r;
}
// shuffle($fulldata);
echo $this->jsn($fulldata);
  }


private function login(){
 $username=$this->_request['username'];
  $password=$this->_request['password'];
  $role=$this->_request['role'];
  $encrypt = md5($password);
  $loginstatus='true';
  $sql = "SELECT * FROM ".$this->users." WHERE username = '$username' and password = '$encrypt'";
  $result = mysqli_query($this->db,$sql)or die(mysqli_error($this->db));
  $rt = mysqli_fetch_assoc($result);
  $idi = $rt['id'];
  $ii = $rt['loginstatus'];
  $usr = $rt['username'];
  $frs = $rt['firstname'];
  $lrs = $rt['lastname'];
  $pass = $rt['password'];
  $phn = $rt['phone'];
  $rol = $rt['role'];
  if ($usr == $username && $pass == $encrypt && $role == $rol) {
     if($ii == "false"){
       $message = array("response" => "true", "username" => $rt['username'],"email" => $rt['email'],"apikey" => $rt['apikey'],"role" => $rt['role'],"firstname" => $rt['firstname'],"lastname" => $rt['lastname'],"refid" => $rt['refid'],"phone" => $rt['phone'],"id" => $rt['id']);
        $updt = "UPDATE ".$this->users." SET loginstatus = '$loginstatus' WHERE id = '$idi'";
    $updrst = mysqli_query($this->db,$updt)or die(mysqli_error($this->db));
     }
  else{
    $message = array("response" => "already logged in", "username" => $rt['username'],"email" => $rt['email'],"apikey" => $rt['apikey'],"role" => $rt['role'],"firstname" => $rt['firstname'],"lastname" => $rt['lastname'],"refid" => $rt['refid'],"phone" => $rt['phone'],"id" => $rt['id']);
  }
  }else{
    $message = array("response" => "login failed");
  } 
  echo $this->jsn($message);

  } 


private function logout(){
 $apikey=$this->_request['apikey'];
  $sql = "SELECT * FROM ".$this->users." WHERE apikey = '$apikey'";
  $result = mysqli_query($this->db,$sql)or die(mysqli_error($this->db));
  $rt = mysqli_fetch_assoc($result);
  $idi = $rt['id'];
  $ii = $rt['loginstatus'];
   if ($ii == "true") {
    $updt = "UPDATE ".$this->users." SET loginstatus = 'false' WHERE id = '$idi'";
    $updrst = mysqli_query($this->db,$updt)or die(mysqli_error($this->db));
     if($rt){
    $message = array("response" => "logged out");
  }
  else{
    $message = array("response" => "failed to logout");
  }
}
  else{
    $message = array("response" => "already logged out");
  } 
  echo $this->jsn($message);
}

private function adminsignup(){
  $firstname=$this->_request['firstname'];
  $lastname=$this->_request['lastname'];
  $username=$this->_request['username'];
  $email=$this->_request['email'];
  $phone=$this->_request['phone'];
  $password=$this->_request['password'];
  $role= 'admin';
  $loginstate='false';
  $encrypt = md5($password);
  $apikey = $this->gen(20);
  $refid = $this->gen(7);
  $sqlcheck = "SELECT * FROM ".$this->users." WHERE username = '$username' OR email = '$email' OR phone = '$phone'";
  $resultcheck = mysqli_query($this->db, $sqlcheck)or die(mysqli_error($this->db));
  $rwcheck = mysqli_num_rows($resultcheck);
  if($rwcheck > 0){
  $message = array("response" => "user already exists");
  }
  else{
    $sql = "INSERT INTO ".$this->users."(username,email,phone,password,apikey,loginstatus,role,firstname,lastname,refid,subscription_remaining,plan,subscription_till,updated_at) VALUES('$username','$email','$phone','$encrypt','$apikey','$loginstate','$role','$firstname','$lastname','$refid','7','trial',NOW() + INTERVAL 7 DAY,NOW())";
  $result = mysqli_query($this->db,$sql)or die(mysqli_error($this->db));
  if($result){
    $message = array("response" => "success");
  }else{
    $message = array("response" => "failed");
  }
}
echo $this->jsn($message);
}

private function usersignup(){
  $firstname=$this->_request['firstname'];
  $lastname=$this->_request['lastname'];
  $username=$this->_request['username'];
  $email=$this->_request['email'];
  $phone=$this->_request['phone'];
  $password=$this->_request['password'];
  $role= 'user';
  $loginstate='false';
  $encrypt = md5($password);
  $apikey = $this->gen(20);
  $refid = $this->_request['refid'];
  $sqlcheck = "SELECT * FROM ".$this->users." WHERE username = '$username' OR email = '$email' OR phone = '$phone'";
  $resultcheck = mysqli_query($this->db, $sqlcheck)or die(mysqli_error($this->db));
  $rwcheck = mysqli_num_rows($resultcheck);
  if($rwcheck > 0){
  $message = array("response" => "user already exists");
  }
  else{
    $sql = "INSERT INTO ".$this->users."(username,email,phone,password,apikey,loginstatus,role,firstname,lastname,refid) VALUES('$username','$email','$phone','$encrypt','$apikey','$loginstate','$role','$firstname','$lastname','$refid')";
  $result = mysqli_query($this->db,$sql)or die(mysqli_error($this->db));
  if($result){
    $message = array("response" => "success");
  }else{
    $message = array("response" => "failed");
  }
}
echo $this->jsn($message);
}

private function createcompany(){
  $company=$this->_request['company'];
  $description=$this->_request['description'];
  $contact=$this->_request['contact'];
  $apikey=$this->_request['apikey'];

  $sqlcheck = "SELECT * FROM ".$this->elv." WHERE company = '$company' and description = '$description' and contact = '$contact'";
  $resultcheck = mysqli_query($this->db,$sqlcheck)or die(mysqli_error($this->db));
  $rwcheck = mysqli_num_rows($resultcheck);
  // var_dump($rwcheck);
if($rwcheck > 0){
  $message = array("response" => "item already exists");
  echo $this->jsn($message);
  }
  else{
     $sql = "INSERT INTO ".$this->elv."(company, description, contact, apikey) VALUES('$company','$description','$contact','$apikey')";
  $result = mysqli_query($this->db,$sql)or die(mysqli_error($this->db));
  if($result){
    echo "Created Successfully";
  }
  
  else{
    echo "failed";
  }

  }
}

private function updatecompany(){
    
    $midp=$this->_request['id'];
  $company=$this->_request['company'];
  $description=$this->_request['description'];
  $contact=$this->_request['contact'];
   
 $sql = "UPDATE ".$this->elv." SET company = '$company', description = '$description', contact = '$contact' WHERE id = '$midp'";
 
 $result = mysqli_query($this->db,$sql);
  if($result){
echo "updated";
  }
  else{
    echo "failed";
  }
  }

 private function deletecompany(){
    
    $dep=$this->_request['id'];
 $sql = "DELETE FROM ".$this->elv." WHERE id = '$dep'";
 $result = mysqli_query($this->db,$sql);
  if($dep){
echo "Company Deleted Successfully!";
  }
  else{
    echo "failed";
  }
  }


private function subscriberquery(){
    $month=$this->_request['month'];
 $sql = "SELECT * FROM ".$this->users." WHERE updated_at >= NOW() - INTERVAL $month MONTH";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();
while($r = mysqli_fetch_assoc($result)) {
  $fulldata[] = $r;
}
shuffle($fulldata);
echo $this->jsn($fulldata);
  }

  private function subscribe(){
    $id=$this->_request['id'];
    $time=$this->_request['time'];
 $sql = "UPDATE ".$this->users." SET updated_at = NOW() WHERE id = $id";
$result = mysqli_query($this->db,$sql);
 if($result){
  $sqil = "UPDATE ".$this->users." SET subscription_status = 'active' WHERE id = $id";
  $resultu = mysqli_query($this->db ,$sqil);
  
  $sqlco = "SELECT * FROM ".$this->users." WHERE id = '$id'";
      $resro = mysqli_query($this->db ,$sqlco);
      $reri = mysqli_fetch_array($resro);
      $visy = $reri['updated_at'];

      $sqgl = "UPDATE ".$this->users." SET subscription_till = TIMESTAMPADD(MONTH,$time,'$visy') WHERE id = $id";
  $resulgu = mysqli_query($this->db ,$sqgl);
    $message = array("subscription time" => $visy);
 }
 else{
    $message = array("subscription time" => "not updated");
  }
  echo $this->jsn($message);
  }

  

  private function subscriptionremaining(){
    $id=$this->_request['id'];
    $sqlt = "SELECT * FROM ".$this->users." WHERE id = '$id'";
      $resre = mysqli_query($this->db ,$sqlt);
      $rerte = mysqli_fetch_array($resre);
      $visw = $rerte['subscription_till'];
$date=strtotime($visw);//Converted to a PHP date (a second count)
//Calculate difference
$diff=$date-time();//time returns current time in seconds
$days=floor($diff/(60*60*24));//seconds/minute*minutes/hour*hours/day)
$hours=round(($diff-$days*60*60*24)/(60*60));

//Report
$subscription_rem = $days;
 $sql = "UPDATE ".$this->users." SET subscription_remaining = '$subscription_rem' WHERE id = $id";
$result = mysqli_query($this->db ,$sql);
 if($result){
  $sqlco = "SELECT * FROM ".$this->users." WHERE id = '$id'";
      $resro = mysqli_query($this->db ,$sqlco);
      $reri = mysqli_fetch_array($resro);
      $visr = $reri['subscription_remaining'];
      $visd = $reri['plan'];
      if($visr<="0"){
$sqlf ="UPDATE ".$this->users." SET subscription_status = 'expired' WHERE id = '$id'";
$redo = mysqli_query($this->db ,$sqlf);
$message = array("remaining" => "0","status" => $visd);
      }
      else{
        $message = array("remaining" => $visr,"plan" => $visd);
      }
    
 }
 else{
    $message = array("subscription days remaining" => "not updated");
  }
  echo $this->jsn($message);
  }


private function gen($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
    /*
     *  Encode array into JSON
    */
private function jsn($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }
}
 
    // Initiiate Library
     
    $api = new API;
    $api->processApi();
?>
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



private function showdata(){
 $sql = "SELECT id, company, contact, address, description, directorname, directorlinkedin FROM ".$this->elv."";
$result = mysqli_query($this->db,$sql);
  $fulldata = array();
while($r = mysqli_fetch_assoc($result)) {
  $fulldata[] = $r;
}
shuffle($fulldata);
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
  $rol = $rt['role'];
  if ($usr == $username && $pass == $encrypt && $role == $rol) {
     if($ii == "false"){
       $message = array("response" => "true", "username" => $rt['username'],"email" => $rt['email'],"apikey" => $rt['apikey'],"role" => $rt['role'],"firstname" => $rt['firstname'],"lastname" => $rt['lastname']);
        $updt = "UPDATE ".$this->users." SET loginstatus = '$loginstatus' WHERE id = '$idi'";
    $updrst = mysqli_query($this->db,$updt)or die(mysqli_error($this->db));
     }
  else{
    $message = array("response" => "already logged in", "username" => $rt['username'],"email" => $rt['email'],"apikey" => $rt['apikey'],"role" => $rt['role'],"firstname" => $rt['firstname'],"lastname" => $rt['lastname']);
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

private function signup(){
  $firstname=$this->_request['firstname'];
  $lastname=$this->_request['lastname'];
  $username=$this->_request['username'];
  $email=$this->_request['email'];
  $phone=$this->_request['phone'];
  $password=$this->_request['password'];
  $role=$this->_request['role'];
  $loginstate='false';
  $encrypt = md5($password);
  $apikey = $this->gen(20);
  $refid = $this->gen(5);
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

private function signup(){
  $firstname=$this->_request['firstname'];
  $lastname=$this->_request['lastname'];
  $username=$this->_request['username'];
  $email=$this->_request['email'];
  $phone=$this->_request['phone'];
  $password=$this->_request['password'];
  $role=$this->_request['role'];
  $loginstate='false';
  $encrypt = md5($password);
  $apikey = $this->gen(20);
  $refid = $this->_request['companyid'];
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
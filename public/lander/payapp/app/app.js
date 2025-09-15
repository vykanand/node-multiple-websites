var app = angular.module('ATpay', []);

app.config(['$locationProvider', function($locationProvider){
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
  })
}])

app.controller('mtctrl', function ($scope, $http, $location,$sce) {
$scope.url = 'http://appsthink.com/pay/api/';
$.get('http://ip-api.com/json', function(r){
           console.log(r); 
           $scope.ip=JSON.stringify(r);
         });
window.onload = function() {
    $scope.tid = new Date().getTime();
  };

$scope.spn = function() {
  $scope.chck = 1;
  $scope.mde = "online";
  $scope.igst = true;
  $scope.product = $location.search().pr;
  $scope.ct = $location.search().ct;
  $scope.addr = $location.search().addr;
  $scope.paym = $location.search().pay;
  $scope.state = $location.search().st;
  $scope.cname = $location.search().cname;
  $scope.cphone = $location.search().cphone;
  $scope.cemail = $location.search().cemail;
  $scope.cat = $location.search().cat;
  $scope.subcat = $location.search().subcat;
  $scope.minicat = $location.search().minicat;
  $scope.taxd = parseInt(($location.search().pay / 100) * 18);
  $scope.taxm = parseInt($location.search().pay)+parseInt(($location.search().pay / 100) * 18);
  // console.log($location.search().pay,$location.search().pr);
//   $http({
//   method: 'GET',
//   url: 'http://174.138.82.53:4000/api/user?filter[referralID]='+$location.search().sponsorid
// }).then(function successCallback(response) {
//     // console.log(response.data[0]);
//     $scope.spdata = response.data[0];
//   }, function errorCallback(response) {
//     console.log(response);
//   });

  }

  $scope.sendpaylink = function() {
    // var urx = $location.absUrl().split('?')[1];
    var urx = $location.absUrl();
    console.log(JSON.stringify(urx));
    
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
var dta = 'shorturl='+escape(urx)+'&random='+text;
console.log(dta);
    var urxx = $scope.url+'shorturl';
    $http({
    method: 'POST',
    url: urxx,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: dta
}).then(function (response){
console.log(response);
var gt = 'http://appsthink.com/pay/short?session='+response.data.random
console.log(gt);
var gtu = 'http://nimbusit.co.in/api/swsendSingle.asp?username=t1vykanand&password=28256132&sender=APPTHK&sendto='+$scope.moxbx+'&message=Your Payment Link Has Been Generated.Please Visit '+gt+' to complete your payment.';
$.get(gtu, function(r){
           console.log(r); 
           $scope.ip=JSON.stringify(r);
         });

},function (error){
console.log(error);
   });
alert('payment link sent successfully!');
window.location.reload();
  }

    $scope.paysummary = function() {
      
      console.log($scope.chck);
     
      if ($scope.chck == 0) {alert('Please accept our terms and conditions before payment.')}else {
         console.log($scope.taxm);
         console.log($scope.mde);
         if (isNaN($scope.taxm)) {
          alert('Incomplete Details.Payment Cannot be allowed');
          window.location.reload();
         }
         if ($scope.state.toLowerCase() == 'uttar pradesh') {

          $scope.igst = false;
        }

         var url = $scope.url+'pym'
         var dta = {
          payment:$scope.taxm,
          paymentmode:$scope.mde,
          tax:$scope.taxd,
          price:$scope.paym,
          igst:$scope.igst,
          ipaddress:$scope.ip,
          product:$scope.product,
          city:$scope.ct,
          address:$scope.addr,
          state:$scope.state,
          cname:$scope.cname,
          cphone:$scope.cphone,
          cemail:$scope.cemail,
          cat:$scope.cat,
          subcat:$scope.subcat,
          minicat:$scope.minicat
        };
//post req start      
      $http({
    method: 'POST',
    url: url,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: dta
}).then(function (response){
console.log(response);
if (Object.keys(response.data).length > 0) {
console.log(Object.keys(response.data).length);
$scope.zp = 202302;
var url = 'http://appsthink.com/ccavRequestHandler.php';
         var dta = {tid:$scope.tid,merchant_id:178485,currency:'INR',redirect_url:'http://appsthink.com/ccavResponseHandler.php',cancel_url:'http://appsthink.com/ccavResponseHandler.php',language:'EN',order_id:response.data._id,name:$scope.cname,mobile:$scope.cphone,address:$scope.addr,amount:$scope.taxm,billing_name:$scope.cname,billing_address:$scope.addr,billing_city:$scope.ct,billing_state:$scope.state,billing_zip:$scope.zp,billing_country:'India',billing_tel:$scope.cphone,billing_email:$scope.cemail};
         console.log(dta);
//post req start      
      $http({
    method: 'POST',
    url: url,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: dta
}).then(function (response){

// $scope.trustedHtml = $sce.trustAsHtml(response.data);
console.log(escape(response.data));
var url = 'http://appsthink.com/pay/api/payprocess';
var dtatt = {html:escape(response.data)};
$http({
    method: 'POST',
    url: url,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: dtatt
}).then(function (response){
  console.log('pdd',response.data._id);
  window.location = 'http://appsthink.com/pay/htm?sess='+response.data._id
  },function (error){
console.log(error);
   });
// if (Object.keys(response.data).length > 0) {
// console.log(Object.keys(response.data).length);

// }else{
//   console.log('no response');
// }

   },function (error){
console.log(error);
   });


}else{
  console.log('no response');
}

   },function (error){
console.log(error);
   });
//post req ends

      }

   }

	});
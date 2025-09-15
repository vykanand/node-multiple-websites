var app = angular.module('admin', ['ui.bootstrap']);

app.controller('adminctrl', function ($scope, $http, $window, $filter, $timeout) {
	$scope.url = 'http://localhost/gq';
	$scope.date = new Date();

$scope.Math = window.Math;
$scope.refid = localStorage.getItem("GQrefid");
$scope.username = localStorage.getItem("username");
$scope.apikey = localStorage.getItem("apikeygqplus");
$scope.gqid = localStorage.getItem("idi");
console.log($scope.refid);
console.log("idi",$scope.gqid);
 $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    $scope.efilter = function() {
        $timeout(function() { 
            $scope.efilteredItems = $scope.efiltered.length;
        }, 10);
    };

$("#sideb").attr("data-color", "red");
$scope.path = 'dboard.html';
$scope.changepathtbl = function() {
	$("#tableli").addClass("active");
	$("#dashli").removeClass("active");
    $("#chua").removeClass("active");
	$("#sideb").attr("data-color", "purple");
    $scope.path = 'table.html';
};
$scope.changepathdash = function() {
	
    $window.location.href = 'dashboard.html';
};

$scope.chua = function() {
    $("#chua").addClass("active");
    $("#dashli").removeClass("active");
    $("#tableli").removeClass("active");
    $("#sideb").attr("data-color", "green");
    $scope.path = 'empanalyse.html';
};

$scope.getsub = function(){
var userData = 'id='+$scope.gqid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/subscriptionremaining',
        data: userData,
        success:function(response ){
            var vsb = JSON.parse(response);
            console.log("vsb",vsb);
            $scope.gqsubrem = vsb.remaining;
            $scope.planpk = vsb.plan;
            console.log("ppk",$scope.planpk);
            $scope.gqsubremcal = parseInt(vsb.remaining);
            console.log("gqsubremcal",$scope.gqsubremcal);
            console.log("gqsubrem",$scope.gqsubrem);
           // demo.showNotification('notifications','updated data successfully!');
        }
    });
};
$scope.getsub();

$scope.getcomp = function(){
var userData = 'refid='+$scope.refid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/companyadmin',
        data: userData,
        success:function(response ){
            var vl = JSON.parse(response);

           $scope.cdata = vl;
           $scope.cdatalength = vl.length;
            // $scope.loggedusers = $filter('filter')(vl, {loginstatus: 'true'}).length;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.cdata.length; //Initially for no filter  
        $scope.totalItems = $scope.cdata.length;
            
            $scope.$apply();
           console.log("companyadmin",$scope.cdata);
        }
    });
};
$scope.getcomp();

$scope.getlivelogin = function(){
var userData = 'refid='+$scope.refid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/showusers',
        data: userData,
        success:function(response ){
        	var vl = JSON.parse(response);
            $scope.startTimer();
           $scope.roledta = vl;
            $scope.loggedusers = $filter('filter')(vl, {loginstatus: 'true'}).length;
            $scope.$apply();
           console.log("roledta",$scope.roledta);
           // demo.showNotification('notifications','updated data successfully!');
        }
    });
};
$scope.getlivelogin();

$scope.newsapi = function(){
$.ajax({
        type: 'GET',
        url: $scope.url+'/newsapi.php',
        success:function(response ){
            var vl = JSON.parse(response);
            $scope.napi = vl.slice(0, 5);
             $scope.chr();
        }
    });
};
$scope.newsapi();



$scope.getepf = function(){
var userData = 'refid='+$scope.refid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/showuseranalysis',
        data: userData,
        success:function(response ){
            var vd = JSON.parse(response);
           $scope.edata = vd;
           $scope.edatalength = vd.length;
            // $scope.loggedusers = $filter('filter')(vl, {loginstatus: 'true'}).length;
        $scope.efilteredItems = $scope.edata.length; //Initially for no filter  
        $scope.etotalItems = $scope.edata.length;
            
            $scope.$apply();
           console.log("edata",$scope.edata);
        }
    });
};
$scope.getepf();

$scope.dailyleads = function(){
var userData = 'refid='+$scope.refid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/dailyleads',
        data: userData,
        success:function(response ){
           
            var vle = JSON.parse(response);
            $scope.ddata = vle;
$scope.monthz = [];
$scope.countz = [];
    for(var i = 0; i<vle.length; i++)
{  
 console.log(vle[i][1]);
$scope.monthz.push(vle[i][0]);
$scope.countz.push(parseInt(vle[i][1]));
}
$scope.maxcountz = max($scope.countz);
$scope.dailysecondlastcount = $scope.countz[$scope.countz.length - 2];
$scope.dailylastcount = $scope.countz[$scope.countz.length - 1];
console.log( );
        }
    });
};
$scope.dailyleads();


$scope.hourlyleads = function(){
var userData = 'refid='+$scope.refid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/hourlyleads',
        data: userData,
        success:function(response ){
            
            var vlx = JSON.parse(response);
$scope.hourmonthz = [];
$scope.hourcountz = [];
    for(var i = 0; i<vlx.length; i++)
{  
 console.log(vlx[i][1]);
$scope.hourmonthz.push(vlx[i][0]);
$scope.hourcountz.push(parseInt(vlx[i][1]));
}
$scope.hourmaxcountz = max($scope.hourcountz);
$scope.hoursecondlastcount = $scope.hourcountz[$scope.hourcountz.length - 2];
$scope.hourlastcount = $scope.hourcountz[$scope.hourcountz.length - 1];

           console.log("vlx",vlx);
        }
    });
};
$scope.hourlyleads();

$scope.monthlyleads = function(){
var userData = 'refid='+$scope.refid;
$.ajax({
        type: 'POST',
        url: $scope.url+'/api/monthlyleads',
        data: userData,
        success:function(response ){
            
            var vly = JSON.parse(response);
 
$scope.monthmonthz = [];
$scope.monthcountz = [];
    for(var i = 0; i<vly.length; i++)
{  
 console.log(vly[i][1]);
$scope.monthmonthz.push(vly[i][0]);
$scope.monthcountz.push(parseInt(vly[i][1]));
}
$scope.monthmaxcountz = max($scope.monthcountz);
$scope.monthsecondlastcount = $scope.monthcountz[$scope.monthcountz.length - 2];
$scope.monthlastcount = $scope.monthcountz[$scope.monthcountz.length - 1];

        }
    });
};
$scope.monthlyleads();

setInterval(function(){
  $scope.stopTimer();

  // $scope.newsapi();
  $scope.getlivelogin();
  $scope.getcomp();
  console.log("live");
}, 60000)

setInterval(function(){
  $scope.newsapi();
}, 600000)

$scope.counter = 60;
    var mytimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter === 0){
        	$scope.counter=60;

        	$scope.counter--;
        	 // $scope.$broadcast('timer-stopped', 0);
          //   $timeout.cancel(mytimeout);
          //   return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        $scope.onTimeout();
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 60;
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    // $scope.$on('timer-stopped', function(event, remaining) {
    //     if(remaining === 0) {
    //         console.log('your time ran out!');
    //     }
    // });

$scope.logout = function(){

        userData = 'apikey='+$scope.apikey;
        console.log(userData);
    $.ajax({
        type: 'POST',
        url: $scope.url+'/api/logout',
        data: userData,
        success:function(response ){
            var vh = JSON.parse(response);
            if(vh.response  == 'logged out' || vh.response  == 'already logged out'){
                alert('logged out.');
                localStorage.removeItem("firstname");
                localStorage.removeItem("lastname");
                localStorage.removeItem("apikeygqplus");
                localStorage.removeItem("username");
                localStorage.removeItem("phone");
                localStorage.removeItem("email");
                localStorage.removeItem("GQrefid");
                window.location.href = "../index.html";
            }
            else{
                alert('Some problem occurred, please try again.');
            }
        }
    });
}

function max(input) {
     if (toString.call(input) !== "[object Array]")  
       return false;
  return Math.max.apply(null, input);
    }

//init dashboard charts
$scope.chr = function(){
$(document).ready(function(){
            var onechleft = $scope.hourcountz;
            var onechbot = $scope.hourmonthz;
            var twochleft = $scope.countz;
            var twochbot = $scope.monthz;
            var threechleft = $scope.monthcountz;
            var threechbot = $scope.monthmonthz;
            var onehigh = $scope.hourmaxcountz+($scope.hourmaxcountz/2);
            var twohigh = $scope.maxcountz+($scope.maxcountz/2);
            var threehigh = $scope.maxcountz+($scope.monthmaxcountz/2);
            // Javascript method's body can be found in assets/js/demos.js
            var l = [onechbot,onechleft,twochbot,twochleft,threechbot,threechleft,onehigh,twohigh,threehigh];
            demo.initDashboardPageCharts(l);

        });
}


});

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
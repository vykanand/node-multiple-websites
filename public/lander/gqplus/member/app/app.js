var app = angular.module('GQapp', ['ui.bootstrap']);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

app.controller('gqctrl', function ($scope, $http, $location) {
    $scope.url = 'http://localhost/gq/api';
$scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.list.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    $scope.login = function(u,p){
        var e = document.getElementById("role");
        var role = e.options[e.selectedIndex].value;
        userData = 'username='+u+'&password='+p+'&role='+role;
        console.log(userData);
        if(role == 'user'){
    $.ajax({
        type: 'POST',
        url: $scope.url+'/login',
        data: userData,
        success:function(response ){
        	var vl = JSON.parse(response);
            if(vl.response  == 'true' || vl.response  == 'already logged in'){
            	alert("You are logged in")
                localStorage.setItem("firstname", vl.firstname);
                localStorage.setItem("lastname", vl.lastname);
                localStorage.setItem("apikeygqplus", vl.apikey);
                localStorage.setItem("username", vl.username);
                localStorage.setItem("phone", vl.phone);
                localStorage.setItem("email", vl.email);
                localStorage.setItem("GQrefid", vl.refid);
                localStorage.setItem("idi", vl.id);
                window.location.href = "user/index.html";
            }
            else{
                alert('Some problem occurred, please try again.');
                window.location.href = "index.html";
            }
        }
    });
}else{


    $.ajax({
        type: 'POST',
        url: $scope.url+'/login',
        data: userData,
        success:function(response ){
            var vl = JSON.parse(response);
            if(vl.response  == 'true' || vl.response  == 'already logged in'){
                alert("You are logged in")
                localStorage.setItem("firstname", vl.firstname);
                localStorage.setItem("lastname", vl.lastname);
                localStorage.setItem("apikeygqplus", vl.apikey);
                localStorage.setItem("username", vl.username);
                localStorage.setItem("phone", vl.phone);
                localStorage.setItem("email", vl.email);
                localStorage.setItem("GQrefid", vl.refid);
                localStorage.setItem("idi", vl.id);
                window.location.href = "admin/dashboard.html";
            }
            else{
                alert('Some problem occurred, please try again.');
                window.location.href = "index.html";
            }
        }
    });
}

}

$scope.logged = function(){
$scope.fn = localStorage.getItem("firstname");
$scope.apl = localStorage.getItem("apikeygqplus");
var useap = localStorage.getItem("apikeygqplus");

$http.get($scope.url+'/showdata?apikey='+useap).success(function(data){
    // $http.get($scope.url+'/api/unsecurebuss').success(function(data){
    $scope.list = data;
    $scope.idun = data[0].id;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 5; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter S
});
}

$scope.logout = function(aok){

        userData = 'apikey='+aok;
        console.log(userData);
    $.ajax({
        type: 'POST',
        url: $scope.url+'/logout',
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
                window.location.href = "index.html";
            }
            else{
                alert('Some problem occurred, please try again.');
            }
        }
    });
}

$scope.adminsignup = function(user,pass,passwordconf,firstname,lastname,email,phone){
console.log(user,pass,passwordconf,firstname,lastname,email,phone);

if(pass == passwordconf && user !== undefined && pass !== undefined && firstname !== undefined && lastname !== undefined && email !== undefined && phone !== undefined){
    var userData = 'username='+user+'&password='+pass+'&firstname='+firstname+'&lastname='+lastname+'&email='+email+'&phone='+phone;
    console.log(userData);
$.ajax({
        type: 'POST',
        url: $scope.url+'/adminsignup',
        data: userData,
        success:function(response ){
            var vsb = JSON.parse(response);
            console.log("adminsignup",vsb);
            notification.notify( 'success', 'Registered Successfully.', {
    notification: {
        position: [ 'right', 'bottom' ],
        distances: [ 20, 20, 10 ],
        height: 60,
        maxWidth: false,
        roundCorners: [ 8, 8, 8, 8],
        color: 'green'
} });
            alert("Admin Registered Successfully");
            window.location.href = "index.html";

        },error: function(jqxhr) {
           
            notification.notify( 'success', jqxhr.responseText, {
    notification: {
        position: [ 'right', 'bottom' ],
        distances: [ 20, 20, 10 ],
        height: 60,
        maxWidth: false,
        roundCorners: [ 8, 8, 8, 8],
        color: 'green'
} });

          }
    });


}else{
   notification.notify( 'error', 'Failed to Sign up.Please Try Again!', {
    notification: {
        position: [ 'right', 'bottom' ],
        distances: [ 20, 20, 10 ],
        height: 60,
        maxWidth: false,
        roundCorners: [ 8, 8, 8, 8],
        color: 'red'
} }); 
}

}

$scope.usersignup = function(user,pass,passwordconf,firstname,lastname,email,phone,companyid){
console.log(user,pass,passwordconf,firstname,lastname,email,phone,companyid);

if(pass == passwordconf && user !== undefined && pass !== undefined && firstname !== undefined && lastname !== undefined && email !== undefined && phone !== undefined){
    var userData = 'username='+user+'&password='+pass+'&firstname='+firstname+'&lastname='+lastname+'&email='+email+'&phone='+phone+'&refid='+companyid;
    console.log(userData);
$.ajax({
        type: 'POST',
        url: $scope.url+'/usersignup',
        data: userData,
        success:function(response ){
            var vsb = JSON.parse(response);
            console.log("usersignup",vsb);
            notification.notify( 'success', 'Registered Successfully.', {
    notification: {
        position: [ 'right', 'bottom' ],
        distances: [ 20, 20, 10 ],
        height: 60,
        maxWidth: false,
        roundCorners: [ 8, 8, 8, 8],
        color: 'green'
} });
            alert("User Registered Successfully");
            window.location.href = "index.html";

        },error: function(jqxhr) {
           
            notification.notify( 'success', jqxhr.responseText, {
    notification: {
        position: [ 'right', 'bottom' ],
        distances: [ 20, 20, 10 ],
        height: 60,
        maxWidth: false,
        roundCorners: [ 8, 8, 8, 8],
        color: 'green'
} });

          }
    });


}else{
   notification.notify( 'error', 'Failed to Sign up.Please Try Again!', {
    notification: {
        position: [ 'right', 'bottom' ],
        distances: [ 20, 20, 10 ],
        height: 60,
        maxWidth: false,
        roundCorners: [ 8, 8, 8, 8],
        color: 'red'
} }); 
}

}

$scope.viewdata = function(id){
console.log(id);
var modalInstance = $modal.open({
templateUrl: '<html>hi</html>',
windowClass: 'my-dialog'
});

}

  });
var app = angular.module('GQapp', []);


app.controller('gqctrl', function ($scope, $http, $location) {
    $scope.url = 'http://localhost/gq/api';

function refresh_close(){
$('.close').click(function(){$(this).parent().fadeOut(200);});
}
refresh_close();
    $scope.login = function(u,p){

        userData = 'username='+u+'&password='+p+'&role=user';
        console.log(userData);
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
                window.location.href = "member.html";
            }
            else{
                alert('Some problem occurred, please try again.');
                window.location.href = "index.html";
            }
        }
    });
}

$scope.logged = function(){
$scope.fn = localStorage.getItem("firstname");
$scope.apl = localStorage.getItem("apikeygqplus");
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
                window.location.href = "index.html";
            }
            else{
                alert('Some problem occurred, please try again.');
                window.location.href = "member.html";
            }
        }
    });
}

  });
$(document).ready(function() {
var chckb = localStorage.getItem("apikeygqplus");
var fnm = localStorage.getItem("fname");
if(chckb.length == 20){
$("#lgout").click(function(){
        logout();
    }); 
$('#nme').val(fnm);
}else {
window.location.href = "index.html";
}
    

});

function logout(){

    localStorage.removeItem("apikeygqplus");
    localStorage.removeItem("fname");
    window.location.href = "popup.html";
}
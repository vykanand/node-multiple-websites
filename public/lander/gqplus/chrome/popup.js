// window.onload=function()
//   {
//    document.getElementById("login").onclick=function()
//     {
//   var usr = document.getElementById('usr').value;
//   var psr = document.getElementById('pss').value;
//   chrome.runtime.sendMessage({ website: usr, message:"user"});
 
//  }
//   }


function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    
    var username;
    var password;
username = $('#usr').val();
password = $('#pass').val();
var apikey = "gqplus";

    chrome.tabs.sendMessage(activeTab.id, {"message": apikey,"usri": username,"paas": password});
    // window.close();
   });
}

$(document).ready(function() {
    var chcka = localStorage.getItem("apikeygqplus");
if(chcka !== null){
window.location.href = "member.html";

var chcka = localStorage.getItem("apikeygqplus");
// if(chcka.length !== null){
// window.location.href = "member.html";
}else {
    
$("#gqbtn").click(function(){
        popup();
    });	
}
    

});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.bgapi.length == 20){
    	sendResponse({popupmsg: "popup"});
    	localStorage.setItem("apikeygqplus",request.bgapi);
    	localStorage.setItem("fname",request.bgfname);
       window.location.href = "member.html";
    }
  });

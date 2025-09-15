var seltext = null;
var user = null;
var pass = null;
var apikey = null;
//  chrome.browserAction.onClicked.addListener(function() {
//    chrome.windows.create({'url': 'http://localhost/com/login.html', 'type': 'popup'}, function(window) {
//    });
// });

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            window.seltext = request.data
        break;

        case 'setApi':
            window.user = request.user
            window.pass = request.pass
            localStorage.setItem("user",user);
            localStorage.setItem("pass",pass);
            getapikey();
        break;
         
        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});
 



function getapikey()
{
var u= localStorage.getItem("user");
var p= localStorage.getItem("pass");
var gjax = new XMLHttpRequest();
var jsonResponse;
gjax.open("POST","http://gqplus.ultimatefreehost.in/api/login");
gjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gjax.send("username="+u+"&password="+p+"&role=user"); 
gjax.onreadystatechange = function() { if(gjax.readyState==4) { 
    jsonResponse = JSON.parse(gjax.responseText);
    // alert(gjax.responseText);
    if(jsonResponse.response == "true" || jsonResponse.response == "already logged in"){

localStorage.setItem("apikeygqplus",jsonResponse.apikey);
console.log("gjax apikey",jsonResponse.apikey);
chrome.runtime.sendMessage({bgapi: jsonResponse.apikey,bgfname: jsonResponse.firstname}, function(response) {
  // console.log(response.popupmsg);
  // alert("hi from bg");
});
alert("You are logged in");

}else{
    alert("Wrong Username or Password.Please try again");
}


      }}
}



function savetext(info,tab)
{
apikey = localStorage.getItem("apikeygqplus");
console.log("setApi",apikey);
var prtx = seltext;
if(apikey == null){
     alert("Please Login To Use the extension! Click on the top right Extention icon to login");
}
else{
    console.log("sltxt",prtx.length);
    var jax = new XMLHttpRequest();
    jax.open("POST","http://gqplus.ultimatefreehost.in/elvento.php");
    jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    if(prtx !== null && prtx.length<45){
      jax.send("company="+prtx+"&apikey="+apikey); 
    }
    else{
      alert("Your selection is Invalid! Please Select Properly");  
    }
    
    jax.onreadystatechange = function() { if(jax.readyState==4) { alert(jax.responseText);  }}

    } //close apikey else check

} //close savetext
 
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.contextMenus.create({"title": "Send Company to Server", "contexts":[context], "onclick": savetext}); 
}

  
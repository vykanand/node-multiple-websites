window.onload=function()
  {
   document.getElementById("login").onclick=function()
    {
  var usr = document.getElementById('usr').value;
  var psr = document.getElementById('pss').value;
  console.log("usr psr",usr+psr);
  chrome.runtime.sendMessage({ username: usr, message:"user"});
 chrome.runtime.sendMessage({ password: psr, message:"pass"});
 }
  }
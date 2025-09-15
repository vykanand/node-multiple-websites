document.addEventListener('mouseup',function(event)
{
    var sel = window.getSelection().toString();
    // console.log("sel",sel);
     
    if(sel.length)
        chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})

chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message.length ) {
         chrome.extension.sendRequest({'message':'setApi','user': request.usri,'pass': request.paas},function(response){})
         console.log(request.message);

             }
      }
    );


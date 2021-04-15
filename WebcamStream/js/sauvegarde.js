var isInitiateur;

var mystream;

navigator.mediaDevices.getUserMedia({ audio: true, video: true })
.then(function(stream) {
  let video = document.getElementById("localvideo");
  // Older browsers may not have srcObject
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    // Avoid using this in new browsers, as it is going away.
    video.src = window.URL.createObjectURL(stream);
  }
  mystream = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});



function createXHR() {
    var request = false;
    try    {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (err2)    {
    try {
       request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch (err3) {
       try {  request = new XMLHttpRequest();}
       catch (err1) { request = false;}
     }
    }
   return request;
 }

function getOffer()
{
    var xhr = createXHR();
    xhr.onreadystatechange  = function() 
    { 
       if(xhr.readyState  == 4)
       {
        if(xhr.status  == 200) 
        document.getElementById("txtasdp").value = xhr.responseText;  
        else
        document.getElementById("txtadialog").value = "Error code " + xhr.status;
        }
    }; 
 
   xhr.open("GET", "BDD/conn.php?get_offer",  true); 
   xhr.send(null); 

}
function ReplaceJSONChars(ident)
{
  let ans = document.getElementById(ident).value
  ans = ans.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
ans = ans.replace(/[\u0000-\u0019]+/g,""); 
document.getElementById(ident).innerHTML =  ans;
document.getElementById(ident).value =  ans;

}

function setconection()
{
  let ans = document.getElementById("txtaanswer").value;

  ans = ans.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
ans = ans.replace(/[\u0000-\u0019]+/g,"");
  //ans = ReplaceJSONChars(ans);

var sdp = JSON.parse(ans);
/*
let videoElem = document.getElementById("remotevideo");

var mediaConstraints = {
  audio: true,            // We want an audio track
  video: true             // ...and we want a video track
};

var desc = new RTCSessionDescription(sdp);

lc.setRemoteDescription(desc).then(function () {
  return navigator.mediaDevices.getUserMedia(mediaConstraints);
})
.then(function(stream) {
  videoElem.srcObject = stream;

  stream.getTracks().forEach(track => lc.addTrack(track, stream));
})

*/








  lc.setRemoteDescription(sdp)
}
var lc;
var dc;
var rc;
function getAnswer()
{
    var xhr = createXHR();
    xhr.onreadystatechange  = function() 
    { 
       if(xhr.readyState  == 4)
       {
        if(xhr.status  == 200) 
        document.getElementById("txtaanswer").value = xhr.responseText;  
        else
        document.getElementById("txtadialog").value = "Error code " + xhr.status;
        }
    }; 
 
   xhr.open("GET", "BDD/conn.php?get_answer",  true); 
   xhr.send(null); 

}

function SaveAnswer()
{
    var xhr = createXHR();
    xhr.onreadystatechange  = function() 
    { 
       if(xhr.readyState  == 4)
       {
        if(xhr.status  == 200) 
        document.getElementById("txtadialog").value = xhr.responseText;  
        else
            document.ajax.dyn="Error code " + xhr.status;
        }
    }; 
 
  // xhr.open("GET", "BDD/conn.php?save_answer="+document.getElementById("txtaanswer").value,  true); 
   //xhr.send(); 

   xhr.open("POST", "BDD/conn.php",  true); 
   var params = "save_answer="+document.getElementById("txtaanswer").value;
  //xhr.open("GET", "BDD/conn.php?save_offer="+document.getElementById("txtasdp").value,  true); 
  //xhr.send(null);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
   xhr.send(params);


}

function SaveOffer()
{
    var xhr = createXHR();
    xhr.onreadystatechange  = function() 
    { 
       if(xhr.readyState  == 4)
       {
        if(xhr.status  == 200) 
        document.getElementById("txtadialog").value = xhr.responseText;  
        else
        document.getElementById("txtadialog").value = "Error code " + xhr.status;
        }
    }; 
 
    xhr.open("POST", "BDD/conn.php",  true); 
    var params = "save_offer="+document.getElementById("txtasdp").value;
   //xhr.open("GET", "BDD/conn.php?save_offer="+document.getElementById("txtasdp").value,  true); 
   //xhr.send(null);
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhr.send(params);
}


function createOffer()
{
  isInitiateur = true;
  lc = new RTCPeerConnection()

  let videoElem = document.getElementById("remotevideo");

  //lc.addTrack(mystream);
  lc.ontrack = ev => {
    if (ev.streams && ev.streams[0]) {
      videoElem.srcObject = ev.streams[0];
    } else {
      let inboundStream = new MediaStream(ev.track);
      videoElem.srcObject = inboundStream;
    }
  }



  var mediaConstraints = {
    audio: true,            // We want an audio track
    video: true             // ...and we want a video track
  };
  
  var desc = new RTCSessionDescription(sdp);
  
  lc.setRemoteDescription(desc).then(function () {
    return navigator.mediaDevices.getUserMedia(mediaConstraints);
  })
  .then(function(stream) {
    videoElem.srcObject = stream;
  
    stream.getTracks().forEach(track => lc.addTrack(track, stream));
  })

  dc = lc.createDataChannel("channel")

  //dc.onmessage = e => console.log(" just got a message " + e.data);
  dc.onmessage = e => document.getElementById("txtadialog").value +=  e.data +'\r\n' ;
  dc.onopen = e=> document.getElementById("txtadialog").value = "Connection opened!" +'\r\n' ;
  
  /*lc.onicecandidate = e => console.log("New ice Candidate ! reprinting SDP" + JSON.stringify(lc.localDescription))*/
//lc.addStream(mystream);
  lc.onicecandidate = e => document.getElementById("txtasdp").value = JSON.stringify(lc.localDescription)
  lc.createOffer().then(o => lc.setLocalDescription(o) ).then(a=>console.log("set successfully!"))
}
function createAnswer()
{
  isInitiateur = false;
      
  var offer = document.getElementById("txtasdp").value;

  offer = offer.replace(/\\n/g, "\\n")  
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
  // remove non-printable and other non-valid JSON chars
  offer = offer.replace(/[\u0000-\u0019]+/g,""); 
  var o = JSON.parse(offer);


  //const offer2= JSON.parse(offer)
  rc = new RTCPeerConnection();

  //const track = generateMediaStreamTrack('video');
  //const sender = pc.addTrack(track);
  //c.onicecandidate = e => console.log("New ice Candidate ! reprinting SDP" + JSON.stringify(rc.localDescription))
  rc.onicecandidate = e => document.getElementById("txtaanswer").value = JSON.stringify(rc.localDescription)

  rc.ondatachannel = e => { 
  rc.dc = e.channel;
  //rc.dc.onmessage = e => console.log("new message from client! " + e.data)
  rc.dc.onmessage = e => document.getElementById("txtadialog").value +=  e.data +'\r\n' ;
  rc.dc.onopen = e => document.getElementById("txtadialog").value = "Connection OPENED!!!!" +'\r\n' ;


  let videoElem = document.getElementById("remotevideo");


  rc.dc.ontrack = ev => {
    if (ev.streams && ev.streams[0]) {
      videoElem.srcObject = ev.streams[0];
    } else {
      let inboundStream = new MediaStream(ev.track);
      videoElem.srcObject = inboundStream;
    }
  }
}



rc.setRemoteDescription(o);

//rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a=> console.log("answer created"))
rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a=> console.log("answer created"))

}
function sendMessage()
{
  if (isInitiateur == true)
  {
    dc.send(document.getElementById("txtasendsend").value);
    document.getElementById("txtadialog").value +=  document.getElementById("txtasendsend").value +'\r\n' ;
  }
  else
  {
    rc.dc.send(document.getElementById("txtasendsend").value);
    document.getElementById("txtadialog").value +=  document.getElementById("txtasendsend").value +'\r\n' ;
  }
}
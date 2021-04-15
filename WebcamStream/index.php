<!DOCTYPE html>
<html>
<head>
   
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
	<title></title>
</head>

<body>
<div class="container-fluid">
    <div class="container">
        <div class="row">
            <video controls muted id="localvideo"> </video>
            <video controls autoplay id="remotevideo"> </video>
        </div>
        <div class="row">
            <div class="col-md-4">
            <button onclick=createOffer()>Creer une offre</button>

                <textarea name="offer" id="txtasdp" ></textarea> <br>
                

                <input type="button" value="save" onclick="SaveOffer()">


            <input type="button" value="get offer" onclick="getOffer()">
            <input type="button" value="replaceJson" onclick="ReplaceJSONChars('txtasdp')">
            <input type="button" value="set connexion " onclick="setconection()">

            </div>

            <div class="col-md-4">
                <button onclick=createAnswer()>Creer une réponse</button>

                    <textarea name="answer" id="txtaanswer" ></textarea>
                    <input type="button" value="save" onclick="SaveAnswer()">

                <input type="button" value="get answer" onclick="getAnswer()">
            </div>

            <div class="col-md-4">
                <textarea class="txtasend" id="txtasendsend" ></textarea>
                <button class="" onclick="sendMessage()">envoyer</button>
                <textarea name="dialog" id="txtadialog" ></textarea>
            </div>

        </div>
    </div>
</div>


<script type="text/javascript" src="js/myjs.js"></script>
<script>
     navigator.mediaDevices.enumerateDevices().then(function (devices) {
            for(var i = 0; i < devices.length; i ++){
                var device = devices[i];
                //if (device.kind === 'videoinput') {
                     {
                    var option = document.createElement('option');
                    option.value = device.deviceId;
                    option.text = device.kind+" " +device.label || 'camera ' + (i + 1);
                    document.querySelector('select#videoSource').appendChild(option);
                }
            };
        });
</script>
 <select id="videoSource"></select>
</body>

</html>
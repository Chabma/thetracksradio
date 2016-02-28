current_song_num = 0;
current_show_num = 0;
current_episode_num = 0;
$(document).ready(function() 
 {
     
     $( "#shows li" ).click(function(e) {
         str = ""+$("li").index("id")+"";
         get_content(str);
         
        //document.body.style.backgroundImage = "url('good-photos/27.jpg')";
        //replaceState(null, null, window.location.pathname + "#" + e.target.getAttribute("id"));
        //history.pushState(null, null,window.location.pathname + "#"+ e.target.getAttribute("id"));
                            
     });
 
    $("#player").bind("ended", function(){
        play_song(current_show_num, current_episode_num, current_song_num+1);  
    });


     $( "#play_pause" ).click(function(){
        var music = document.getElementById('player');
        if (music.paused) {
		music.play();
		$("#play_pause").attr('src', 'images/button-images/pause.png');
	} else { 
		music.pause();
		$("#play_pause").attr('src', 'images/button-images/play.png');
	}
    });

     $( "#previous" ).click(function(e){
        var audio = document.getElementById("player");
        if(audio.currentTime > (audio.duration / 30)){
            audio.currentTime = 0;
        }
        else{
            if(current_song_num == 0){
                audio.pause();
                audio.currentTime = 0;
            }else{
                play_song(current_show_num, current_episode_num, current_song_num - 1);
            }
        }
    });
     
     $( "#next" ).click(function(){
         try{
            play_song(current_show_num, current_episode_num, current_song_num + 1);
        }
        catch(err){
            var audio = document.getElementById("player");
            audio.pause();
            audio.currentTime = audio.duration;
        }
    });
     
     var audio = document.getElementById("player");
     audio.onloadedmetadata = function(){ audio.currentTime = 0; }
     var audio_prog = document.getElementById("audio_progress");
     audio_prog.onchange = function() {seek(audio_prog.value)};
    
    function seek(loc){
        audio.pause();
        audio.currentTime = loc;
        console.log("seeked to "+ loc +" now at "+ audio.currentTime);
        audio.play();
     }
     
    
    audio.ontimeupdate = function() {update_duration()};
    document.getElementById("volume_progress").value = audio.volume * 100;

     function update_duration() {
        // Display the current position of the video in a p element with id="demo"
        document.getElementById("audio_progress").max = audio.duration;
        document.getElementById("audio_progress").value = audio.currentTime;
        document.getElementById("current_minutes").innerHTML = Math.floor(audio.currentTime / 60);
        document.getElementById("current_seconds").innerHTML = Math.floor(audio.currentTime % 60);
        document.getElementById("max_minutes").innerHTML = Math.floor(audio.duration / 60);
        document.getElementById("max_seconds").innerHTML = Math.floor(audio.duration % 60);
     }
     function update_duration(x) {
        // Display the current position of the video in a p element with id="demo"
        document.getElementById("audio_progress").max = audio.duration;
        document.getElementById("audio_progress").value = audio.currentTime;
        document.getElementById("current_minutes").innerHTML = Math.floor(audio.currentTime / 60);
        document.getElementById("current_seconds").innerHTML = Math.floor(audio.currentTime % 60);
        document.getElementById("max_minutes").innerHTML = Math.floor(audio.duration / 60);
        document.getElementById("max_seconds").innerHTML = Math.floor(audio.duration % 60);
     }
     
    //Following function adapted from stack overflow: "http://stackoverflow.com/questions/16116832/generating-a-random-number-for-html"
    var minNumber = 1; // The minimum number you want
    var maxNumber = 26; // The maximum number you want
    var randomnumber = Math.floor(Math.random() * (maxNumber) + minNumber); // Generates random number
    console.log("random number: "+ randomnumber);
    //randomnumber = 27;
    if (randomnumber == 2){
        $( "#logo h1" ).css("color","lightcoral");
    }
    if (randomnumber == 3 ||randomnumber == 22){
        $( "#logo h1" ).css("color","white");
    }
    if (randomnumber == 5 || randomnumber == 7 || randomnumber == 8 || randomnumber == 9 || randomnumber == 12 || randomnumber == 13 || randomnumber == 14 || randomnumber == 16){
        $( "#logo h1" ).css("color","black");
    }
    if (randomnumber == 17){
        $( "#logo h1" ).css("color","bisque");
    }
    document.body.style.backgroundImage = "url('images/good-photos/"+randomnumber+".JPG')";
});

function change_volume(vol){
    var audio = document.getElementById('player');
    audio.volume = vol/100;
}

function get_content(show_num) {
    if (show_num == "") {
        document.getElementById("#episodes ul").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("#episodes ul").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET","getcontent.php?q="+str,true);
        xmlhttp.send();
    }
}

function play_song(show_num, episode_num, song_num) {
    var audio = document.getElementById('player');
    var source = document.getElementById('mp3Source');
    current_show_num = show_num;
    current_episode_num = episode_num;
    current_show_num = song_num;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            source.src = xmlhttp.responseText;
            audio.currentTime = 0; 
            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song right away
            $("#play_pause").attr('src', 'images/button-images/pause.png');
        }
    };
    xmlhttp.open("GET","getsong.php?a="+show_num+"&b="+episode_num"+&c="+song_num,true);
    xmlhttp.send();
}
                        
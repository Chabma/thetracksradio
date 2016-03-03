current_song_num = 0;
current_show_num = 0;
current_episode_num = 0;
audio = document.getElementById('player');
$(document).ready(function() 
 {
    //checks for cookies and reacts accordingly
    checkCookies();
    
    $( "#logo" ).click(function(e) {
        $("#episode_content").html("");          
     });
    
     $( "#shows li" ).click(function(e) {
         str = ""+($(this).index() + 1)+"";
         get_content(str);
         
        //document.body.style.backgroundImage = "url('good-photos/27.jpg')";
        //replaceState(null, null, window.location.pathname + "#" + e.target.getAttribute("id"));
        //history.pushState(null, null,window.location.pathname + "#"+ e.target.getAttribute("id"));
                            
     });
    
    $( "#show1" ).click(function(e) {
         get_home_content();           
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
            audio.pause();
            audio.currentTime = audio.duration;
        }
    });
     
     audio.onloadedmetadata = function(){ audio.currentTime = 0; }
     var audio_prog = document.getElementById("audio_progress");
     audio_prog.onchange = function() {seek(audio_prog.value)};
    
    function seek(loc){
        audio.pause();
        audio.currentTime = loc;
        //console.log("seeked to "+ loc +" now at "+ audio.currentTime);
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

//on webpage leave, sets cookies
$( window ).unload(function() {
    if(current_song_num != 0 && current_show_num != 0 && current_episode_num != 0){
        setCookies();
    }
});

function change_volume(vol){
    audio.volume = vol/100;
}

function get_home_content() {
    //console.log("show num: " + show_num);
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $("#episode_content").html(xmlhttp.responseText);
            //console.log(xmlhttp.response);
        }
    };
    xmlhttp.open("GET","./gethomecontent.php?",true);
    xmlhttp.send();
}

function get_content(show_num) {
    if (show_num == "") {
        $("#episode_content").html("");     
        return;
    } else { 
        //console.log("show num: " + show_num);
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $("#episode_content").html(xmlhttp.responseText);
                //console.log(xmlhttp.response);
            }
        };
        xmlhttp.open("GET","./getcontent.php?q="+str,true);
        xmlhttp.send();
    }
}

function open_doc(show_num, episode_num, arbitrary_num){
    var response = null;
    var regex = /<div class="results">([\s\S]*?)<\/div>/g;
    var matches, output = [];
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            response = xmlhttp.responseText;
            while (matches = regex.exec(response)) {
                //console.log(matches[1]);
                output.push(matches[1]);
            }
            //console.log("response: " + response);
            //console.log(output)
            $("#episode_content").html("");
            $("#episode_content").load(output[0].trim());
        }
    };
    xmlhttp.open("GET","./getdoc.php?a="+show_num+"&b="+episode_num+"&c="+arbitrary_num+"",true);
    xmlhttp.send();
}

function play_song(show_num, episode_num, song_num) {
    var source = document.getElementById('mp3Source');
    var response = null;
    var regex = /<div class="results">([\s\S]*?)<\/div>/g;
    var matches, output = [];
    current_show_num = show_num;
    current_episode_num = episode_num;
    current_song_num = song_num;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            response = xmlhttp.responseText;
            while (matches = regex.exec(response)) {
                //console.log(matches[1]);
                output.push(matches[1]);
            }
            //console.log("response: " + response);
            //console.log(output)
            $("#mp3Source").attr('src', output[0].trim());
            $("#songTitle").text(output[1].trim());
            audio.currentTime = 0; 
            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song
            $("#play_pause").attr('src', 'images/button-images/pause.png');
        }
    };
    xmlhttp.open("GET","./getsong.php?a="+show_num+"&b="+episode_num+"&c="+song_num+"",true);
    xmlhttp.send();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function setCookies(){
    setCookie("song_num", current_song_nume, 1);
    setCookie("show_num", current_show_num, 1);
    setCookie("episode_num", current_episode_num, 1);
    setCookie("elasped_song_duration", audio.currentTime, 1);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookies() {
    var song_num=getCookie("song_num");
    var show_num=getCookie("show_num");
    var episode_num=getCookie("episode_num");
    var elapsed_song_duration=getCookie("elasped_song_duration");
    if (song_num!="" && show_num!="" && episode_num!="" && elapsed_song_duration!="") {
        current_song_num = parseInt(song_num);
        current_show_num = parseInt(show_num);
        current_episode_num = parseInt(episode_num);
        play_song(current_show_num, current_episode_num, current_song_num);
        audio.pause();
        audio.currentTime = parseInt(duration);
    }
}
                        
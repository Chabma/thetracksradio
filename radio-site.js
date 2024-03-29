current_song_num = 0;
current_show_num = 0;
current_episode_num = 0;
starting_elasped_song_duration = 0;
playlist_count = 1;
first_song = 1;
shuffle_bool = false;
backwards_bool = false;
audio = document.getElementById('player');
$(document).ready(function() 
 {
    audio = document.getElementById('player');
    //checks for cookies and reacts accordingly
    checkCookies();
    
    $( "#logo" ).click(function(e) {
        $("#episode_content").html("");
        $("#show_description").html("");
     });
    
     $( "#shows li" ).click(function(e) {
         
         if($(this).index() == 0){
             get_home_content(); 
         }
         else if($(this).index() == 3){
             get_about_content();
         }
         else{
            str = ""+($(this).index() + 1)+"";
            get_content(str);
         }
         if($(this).index() == 1){
             $("#show_description").html("");
         }
         if($(this).index() == 2){
             $("#show_description").html("<p></p>");
         }
         
        //document.body.style.backgroundImage = "url('good-photos/27.jpg')";
        //replaceState(null, null, window.location.pathname + "#" + e.target.getAttribute("id"));
        //history.pushState(null, null,window.location.pathname + "#"+ e.target.getAttribute("id"));
                            
    });
    
    $("#djlogin").click(function(e){
        $("#show_description").html("");
        $("#episodes").html("<form action='djlogin.php'>Username:<br><input type='text' name='username' value=''><br>Password:<br><input type='text' name='password' value=''><br>Who\'s Angus\' favorite person?:<br><input type='text' name='secretquestion' value=''><br><br><input type='submit' value='Submit'></form>");
    })
    
 
    $("#player").bind("ended", function(){
        if(shuffle_bool){
            play_song(current_show_num, current_episode_num, Math.floor(Math.random() * (playlist_count - 0) + 1)); 
        }
        else{
            if(backwards_bool){
                play_song(current_show_num, current_episode_num, current_song_num - 1); 
            }
            else{
                play_song(current_show_num, current_episode_num, current_song_num+1); 
            }
        }
    });


     $( "#play_pause" ).click(function(){
        if (audio.paused) {
		audio.play();
		$("#play_pause").attr('src', 'images/button-images/pause.png');
	} else { 
		audio.pause();
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
                if (shuffle_bool){
                 play_song(current_show_num, current_episode_num, Math.floor(Math.random() * (playlist_count - 0) + 1));
                }
                else if (backwards_bool){
                    play_song(current_show_num, current_episode_num, current_song_num + 1);
                }
                else{
                    play_song(current_show_num, current_episode_num, current_song_num - 1);
                }
            }
        }
    });
     
     $( "#next" ).click(function(){
         try{
             if (shuffle_bool){
                 play_song(current_show_num, current_episode_num, Math.floor(Math.random() * (playlist_count - 0) + 1));
             }
             else if (backwards_bool){
                 play_song(current_show_num, current_episode_num, current_song_num - 1);
             }
             else{
                play_song(current_show_num, current_episode_num, current_song_num + 1);
             }
        }
        catch(err){
            audio.pause();
            audio.currentTime = audio.duration;
        }
    });
    
    $( "#shuffle" ).click(function(){
        if (shuffle_bool) {
		      shuffle_bool = false;
            if(backwards_bool){
            first_song = playlist_count;
            }
            else{
                first_song = 1;
            }
		$("#shuffle").attr('src', 'images/button-images/shuffle.png');
	} else { 
		shuffle_bool = true;
        first_song = Math.floor(Math.random() * (playlist_count - 0) + 1);
		$("#shuffle").attr('src', 'images/button-images/shuffle_on.png');
	}
    });
    
    $( "#backwards" ).click(function(){
        if (backwards_bool) {
		backwards_bool = false;
        if(shuffle_bool){
            first_song = Math.floor(Math.random() * (playlist_count - 0) + 1);
        }
        else{
            first_song = 1; 
        }
		$("#backwards").attr('src', 'images/button-images/play_backwards.png');
	} else { 
		backwards_bool = true;
        first_song = playlist_count;
		$("#backwards").attr('src', 'images/button-images/play_backwards_on.png');
	}
    });
     
     audio.onloadedmetadata = function(){ audio.currentTime = starting_elasped_song_duration;
                                          starting_elasped_song_duration = 0;
                                        }
     var audio_prog = document.getElementById("audio_progress");
     audio_prog.onchange = function() {seek(audio_prog.value)};
     
    
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
        $( "#shows li" ).css("color","lightcoral");
    }
    if (randomnumber == 1 ||randomnumber == 3 ||randomnumber == 22){
        $( "#logo h1" ).css("color","white");
        $( "#shows li" ).css("color","white");
    }
    if (randomnumber == 5 || randomnumber == 7 || randomnumber == 8 || randomnumber == 9 || randomnumber == 12 || randomnumber == 13 || randomnumber == 14 || randomnumber == 16 || randomnumber == 24 || randomnumber == 10 || randomnumber == 15 || randomnumber == 25){
        $( "#logo h1" ).css("color","black");
        $( "#shows li" ).css("color","black");
    }
    if (randomnumber == 17){
        $( "#logo h1" ).css("color","bisque");
        $( "#shows li" ).css("color","bisque");
    }
    get_background(randomnumber);
    
    //on webpage leave, sets cookies
    $(window).on('unload', function() {
        if(current_song_num != 0 && current_show_num != 0 && current_episode_num != 0){
            setCookies();
        }
    });

});

function change_volume(vol){
    audio.volume = vol/100;
}

function seek(loc){
    if(audio.paused){
        audio.currentTime = loc;
        //console.log("seeked to "+ loc +" now at "+ audio.currentTime);
    }
    else{
        audio.pause();
        audio.currentTime = loc;
        //console.log("seeked to "+ loc +" now at "+ audio.currentTime);
        audio.play();
    }
}

function get_about_content() {
    //console.log('about_content');
    $("#episode").html("");
    $("#episode_content").html("");
    $("#show_description").html("</br><h3>About</h3><p>email: thetracksradio@gmail.com</p></br><h3>Hi everybody, sorry for the lack of content recently, expect more changes (playlists might be getting shorter on average, around 30 minutes instead of 60) and a lot more content to come out over the next month.(Written Oct 27th 2016)</h3></br>");
}

function get_home_content() {
    var xmlhttp = null;
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
            $("#show_description").html("");
            //console.log(xmlhttp.response);
        }
    };
    xmlhttp.open("GET","./gethomecontent.php?",true);
    xmlhttp.send();
}

function get_content(show_num) {
    var xmlhttp = null;
    //console.log("get_content called");
    if (show_num == "") {
        $("#episode_content").html("");
        $("#show_description").html("");
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
        xmlhttp.open("GET","./getcontent.php?q="+show_num,true);
        xmlhttp.send();
    }
}

function get_background(number) {
    var xmlhttp = null;
    //console.log("get_background called");
    var response = null;
    var regex = /<div class="results">([\s\S]*?)<\/div>/g;
    var bg_matches, bg_output = [];
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
            while (bg_matches = regex.exec(response)) {
                //console.log(bg_matches[1]);
                bg_output.push(bg_matches[1]);
            }
            //console.log("response: " + response);
            //console.log(bg_output);
            document.body.style.backgroundImage = "url('"+bg_output[0].trim()+"')";
        }
    };
    xmlhttp.open("GET","./getbackground.php?a="+number+",true");
    xmlhttp.send();
}

function open_doc(show_num, episode_num, arbitrary_num){
    var xmlhttp = null;
    //console.log("open_doc called");
    var response = null;
    var regex = /<div class="results">([\s\S]*?)<\/div>/g;
    var doc_matches, doc_output = [];
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
            while (doc_matches = regex.exec(response)) {
                //console.log(doc_matches[1]);
                doc_output.push(doc_matches[1]);
            }
            //console.log("response: " + response);
            //console.log(doc_output);
            $("#episode_content").html("");
            $("#episode_content").load(doc_output[0].trim());
        }
    };
    xmlhttp.open("GET","./getdoc.php?a="+show_num+"&b="+episode_num+"&c="+arbitrary_num+"",true);
    xmlhttp.send();
}

function play_song(show_num, episode_num, song_num, _callback) {
    var xmlhttp = null;
    //console.log("play_song called");
    var source = document.getElementById('mp3Source');
    var song_response = null;
    var regex = /<div class="results">([\s\S]*?)<\/div>/g;
    var matches, song_output = [];
    current_show_num = show_num;
    current_episode_num = episode_num;
    current_song_num = song_num;
    if (song_num == -1){
        current_song_num = first_song;
    }
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            song_response = xmlhttp.responseText;
            while (matches = regex.exec(song_response)) {
                //console.log(matches[1]);
                song_output.push(matches[1]);
                
            }
            //console.log("response: " + song_response);
            //console.log(song_output)
            $("#mp3Source").attr('src', song_output[0].trim());
            if(song_output[1]){
                $("#songTitle").text(song_output[1].trim());
            }
            if(song_output[2]){
                $("#album-image").attr('src', song_output[2].trim());
            }
            if(song_output[3]){
                $("#songTitle").append(song_output[3]);
            }
            audio.load(); //call this to just preload the audio without playing
            audio.play(); //call this to play the song
            $("#play_pause").attr('src', 'images/button-images/pause.png');
            if(_callback){
                _callback();
            }
        }
    };
    xmlhttp.open("GET","./getsong.php?a="+show_num+"&b="+episode_num+"&c="+current_song_num+"",true);
    xmlhttp.send();
}

function get_count(show_num, episode_num) {
    var xmlhttp = null;
    //console.log("play_song called")
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
                //console.log("matches[0]: "+matches[0]);
                //console.log("matches[1]: "+matches[1]);
                output.push(matches[1]);
            }
            if(output[0]){
                //console.log("response: "+output[0].trim());
                playlist_count = parseInt(output[0].trim());
            }
            
            //console.log("playlist_count: "+playlist_count);
            if( shuffle_bool){
               first_song = Math.floor(Math.random() * (playlist_count - 0) + 1); 
            }
            else if(backwards_bool){
                first_song = playlist_count;
            }
            else{
                first_song = 1;
            }
            //console.log("first_song: "+first_song);
            play_song(show_num, episode_num, first_song);
        }  
    };
    xmlhttp.open("GET","./getcount.php?a="+show_num+"&b="+episode_num+"",true);
    xmlhttp.send();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    //console.log("set "+cname+" cookie");
}

function setCookies(){
    //console.log("song_num:"+ current_song_num);
    //console.log("show_num:"+ current_show_num);
    //console.log("episode_num;"+ current_episode_num);
    //console.log("elasped_song_duration:"+ audio.currentTime);
    setCookie("song_num", current_song_num, 1);
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

    //console.log("got song_num:"+ song_num);
    //console.log("got show_num:"+ show_num);
    //console.log("got episode_num;"+ episode_num);
    //console.log("got elasped_song_duration:"+ elapsed_song_duration);
    
    if (song_num!="" && show_num!="" && episode_num!="" && elapsed_song_duration!="") {
        //console.log("Found all cookies!");
        current_song_num = parseInt(song_num);
        current_show_num = parseInt(show_num);
        current_episode_num = parseInt(episode_num);
        starting_elasped_song_duration = elapsed_song_duration;
        play_song(current_show_num, current_episode_num, current_song_num, function(){
            audio.pause();
            $("#play_pause").attr('src', 'images/button-images/play.png');
        });
    }
    else{
        //console.log("Did not find all cookies ");
    }
}
                        
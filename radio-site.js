queue = [];
current_song = "";
$(document).ready(function() 
 {
     
     $( "#shows li" ).click(function(e) {
         str = "radio-two/shows/"+$(this).attr("id")+".json";
         console.log(str);
         $.ajax({
            type: 'GET',
            dataType: "json",
            url: "radio-two/shows/"+$(this).attr("id")+".json",
            success: function(result){
                $("#episodes ul").html(null);
                //console.log(result);
                queue = result.queue;
                $.each(result.episodes, function(idx, episode) {
	                $("#episodes ul").append('<li><button onclick= "play_episode(\''+episode.src+'\')">'+episode.name+'</button></li>\n');
                });
            },
            error: function(xhr, status){
                console.log(status);
            }
        });
         
        //document.body.style.backgroundImage = "url('good-photos/27.jpg')";
        //replaceState(null, null, window.location.pathname + "#" + e.target.getAttribute("id"));
        //history.pushState(null, null,window.location.pathname + "#"+ e.target.getAttribute("id"));
                            
     });
 
    $( "#episodes li" ).click(function(){

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
        var index = queue.indexOf(current_song);
        console.log(index);
        var audio = document.getElementById("player");
        if(audio.currentTime > (audio.duration / 30)){
            console.log("current time : "+audio.currentTime);
            console.log(audio.duration / 30);
            play_episode(queue[index]);
        }
        else{
            if(index == 0){
                audio.pause();
                audio.currentTime = 0;
            }else{
                play_episode(queue[index - 1]);
            }
        }
    });
     
     $( "#next" ).click(function(){
        var index = queue.indexOf(current_song);
        console.log(index);
        if(index == queue.length - 1){
            var audio = document.getElementById("player");
            audio.pause();
            audio.currentTime = audio.duration;
        }else{
            play_episode(queue[index + 1]);
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

function play_episode(episode) {
    var audio = document.getElementById('player');
    var source = document.getElementById('mp3Source');
    current_song = episode;
    source.src= episode;
    console.log("current queue: "+queue);
    audio.currentTime = 0; 
    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
    $("#play_pause").attr('src', 'images/button-images/pause.png');
}

function change_volume(vol){
    var audio = document.getElementById('player');
    audio.volume = vol/100;
}
                        
                        
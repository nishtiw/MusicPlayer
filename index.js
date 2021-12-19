 // querySelector is used to select an entire tag/element 
 const music = document.querySelector("audio"); 
 const img = document.querySelector("img");
 const play = document.getElementById("play");
 const title = document.getElementById("title");
 const artist = document.getElementById("artist");
 const prev = document.getElementById("prev");
 const next = document.getElementById("next");

 let progress = document.getElementById('progress');
 let total_duration = document.getElementById('duration');
 let current_time = document.getElementById('current_time'); //current_time is declared as let because it keeps changing and is not a constant
 const progress_div = document.getElementById('progress_div');

 //array of an object {property:value}
 const songs = [
     {name:"song-1", title:"Higher", artist: "Joe Layne"}, 
     {name:"song-2", title:"Heaven", artist:"Joe Layne"},
     {name:"song-3", title:"Heatwaves", artist:"Glass Animals"},
     {name:"song-4", title:"Glorious", artist:"Macklemore"},
 ]
 
 let isPlaying = false;
 // for play functionality
 const playMusic = () => {
     isPlaying = true;
     music.play();
     play.classList.replace("fa-play", "fa-pause");
     img.classList.add("anime");
 };

 // for pause functionality 
 const pauseMusic = () => {
     isPlaying = false;
     music.pause();
     play.classList.replace("fa-pause", "fa-play");
     img.classList.remove("anime");
 };

 // hard coded play and pause function calling 
 //  play.addEventListener('click', () => {
 //     if(isPlaying) {
 //         pauseMusic();
 //     }
 //     else{
 //         playMusic();
 //     }
 // }); 

 // play and pause function calling using ternary operator 
 play.addEventListener('click', () => {
     isPlaying ? pauseMusic() : playMusic(); 
 });

 //change music

 const loadSong = (songs) => {
     title.textContent = songs.title;
     artist.textContent = songs.artist; 
     music.src = "music/" + songs.name + ".mp3";
     img.src = "images/" + songs.name + ".jpg";
 }; 

 songIndex = 0;
 //loadSong(songs[0]);

 const nextSong = () => {
     songIndex = (songIndex + 1) % songs.length;
     loadSong(songs[songIndex]);
     playMusic();
 };

 const prevSong = () => {
     songIndex = (songIndex - 1 + songs.length) % songs.length;
     loadSong(songs[songIndex]);
     playMusic();
 };

 // progress js 

 music.addEventListener("timeupdate", (event) => {
     const { currentTime, duration } = event.srcElement; //currentTime and duration obtained from timeupdate event
     let progress_time = (currentTime / duration) * 100;
     progress.style.width = `${progress_time}%`;

     // music duration update 
     let min_duration = Math.floor(duration / 60); //calculate minute
     let sec_duration = Math.floor(duration % 60); //calculate seconds
     let tot_duration = `${min_duration}:${sec_duration}`;
     if(duration)
     {
         total_duration.textContent = `${tot_duration}`;
     }

     //current duration update
     let min_currentTime = Math.floor(currentTime / 60); //calculate minute
     let sec_currentTime = Math.floor(currentTime % 60); //calculate seconds
     
     if(sec_currentTime < 10)
     {
         sec_currentTime = `0${sec_currentTime}`;
     }

     let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
     current_time.textContent = `${tot_currentTime}`;             
 });

 //progress onclick function

 progress_div.addEventListener('click', (event) => {
     // console.log(event);
     //const { currentTime, duration } = music; //this is equivalent to the statement given below
     const { duration } = music; //total duration
     let move_progress  = (event.offsetX / event.srcElement.clientWidth) * duration; // current duration when progress bar is clicked
     // console.log(move_progress);
     music.currentTime = move_progress;
 });

 // play next song when current song ends
 music.addEventListener('ended', nextSong);

 next.addEventListener('click', nextSong);
 prev.addEventListener('click', prevSong);

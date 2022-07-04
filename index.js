var playlistbox = document.getElementById("playlist-box");
var toshift = document.getElementsByClassName("layer");
var songinfo = document.getElementById("currentsong")
var recommLayer1 = document.getElementById("category-list1");
var artistLayer2 = document.getElementById("category-list2");
var playlistButton = document.getElementById("open-playlist");
var bgForPlayer = document.getElementById("playerBackground");
let playlistMessage = document.getElementById("message");
var curr_index_of_background = 2;
let curr_playlist;
var audio = document.getElementById("audio-bar");
let curr_time = document.getElementById("current");
let total_duration  = document.getElementById("total");
let seek_slider = document.getElementById("seeker");
let song_name = document.getElementById("track-name");
let singer = document.getElementById("track-artist");
let song_img = document.getElementById("song-image");
let playing = document.querySelector("#now-playing");
let song_index = 0 ;
let typeOfSong = ["Sad Song", "Party Time","90's Song","90's Song","90's Song","90's Song"]
let sad_song_list = [
    {
      name: "Hamari Adhuri Kahani",
      artist: "Arijit Singh , Jeet Ganguly",
      image: "images/hak.jpg",
      path: "Songs/0/0.mp3"
    },
    {
      name: "Tera Yaar Hoon Main",
      artist: "Arijit Singh, Rochak Kohli",
      image: "images/tyhm.jpg",
      path: "Songs/0/1.mp3"
    },
    
  ];

  let trackList = [sad_song_list];


function createSpaceForSongInfo(){
    playlistbox.style.width="300px";playlistbox.style.height = "500px";
    playlistbox.style.zIndex = 9999;toshift[0].style.width = "300px";
    toshift[1].style.width = "300px";songinfo.style.height = "100vh";
    recommLayer1.style.flexDirection = "column";recommLayer1.style.overflowX = "hidden";
    recommLayer1.style.overflowY = "scroll";recommLayer1.style.height ="400px";
    recommLayer1.style.width ="320px";recommLayer1.style.border = "1px solid gray";
    recommLayer1.style.marginLeft = "10px";artistLayer2.style.flexDirection = "column";
    artistLayer2.style.overflowX = "hidden";artistLayer2.style.overflowY = "scroll";
    artistLayer2.style.height ="400px";artistLayer2.style.width ="320px";
    artistLayer2.style.border = "1px solid gray";bgForPlayer.style.height="100vh";
    playlistButton.innerHTML = "X";playlistButton.setAttribute('onclick','hideplaylist()');
}
let choosen_category;
function loadplaylist(category_index){
    createSpaceForSongInfo()
    if(curr_playlist == category_index){
        return;
    }
    song_index =0 ;
    clearscreen();
    curr_playlist = category_index;
    createSpaceForSongInfo();
    choosen_category = trackList[category_index];
    playlistMessage.innerHTML = ""; 
    playlistbox.querySelector("h1").innerText = typeOfSong[category_index];
    for(let i =0;i<choosen_category.length;i++){
        let curr_track = document.createElement('div');
        let songname = document.createElement('p');
        let singersname = document.createElement('span');
        var text = document.createTextNode(choosen_category[i].name);
        var singr = document.createTextNode(choosen_category[i].artist);
        songname.appendChild(text);
        singersname.appendChild(singr);
        curr_track.appendChild(songname);
        curr_track.appendChild(singersname);
        playlistMessage.appendChild(curr_track);
    }
    loadmusic(choosen_category);
}
function clearscreen(){
    while (playlistMessage.lastElementChild) {
        playlistMessage.removeChild(playlistMessage.lastElementChild);
      }
}

function loadmusic(choosen_category){
    resetValues();
    audio.setAttribute('src',choosen_category[song_index].path);
    let s = song_index+1;
    playing.innerText = "Playing "+s + " of "+choosen_category.length;
    song_name.innerText = choosen_category[song_index].name;
    singer.innerText = choosen_category[song_index].artist;
    song_img.setAttribute("src",choosen_category[song_index].image);
    audio.play();
    updateTimer = setInterval(seekUpdate, 1000);
    audio.addEventListener("ended", nextTrack);
    
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
function hideplaylist(){
    playlistbox.style.width="148px";playlistbox.style.height = "26px";
    playlistbox.style.zIndex = 9999;toshift[0].style.width = "auto";
    toshift[1].style.width = "auto";songinfo.style.height = "0px";
    recommLayer1.style.flexDirection = "row";recommLayer1.style.overflowX = "scroll";
    recommLayer1.style.overflowY = "hidden";recommLayer1.style.height ="auto";
    recommLayer1.style.width ="auto";recommLayer1.style.borderTop = "0px  solid gray";
    recommLayer1.style.borderLeft = "0px  solid gray";recommLayer1.style.borderRight = "0px  solid gray";
    artistLayer2.style.flexDirection = "row";artistLayer2.style.overflowX = "scroll";
    artistLayer2.style.overflowY = "hidden";artistLayer2.style.height ="auto";
    artistLayer2.style.width ="auto";artistLayer2.style.borderTop = "0px  solid gray";
    artistLayer2.style.borderLeft = "0px  solid gray";artistLayer2.style.borderRight = "0px  solid gray";
    bgForPlayer.style.height="0px";playlistButton.innerHTML = "Open Playlist";
    playlistButton.setAttribute('onclick','createSpaceForSongInfo()');
    
}



function changeBackground(){
    if(curr_index_of_background==8){
        curr_index_of_background = 1;
    }
    bgForPlayer.style.background = "url("+"images/bg"+curr_index_of_background+".jpg)";
    bgForPlayer.style.backgroundRepeat = "no-repeat";
    bgForPlayer.style.backgroundPosition = "center";
    bgForPlayer.style.backgroundAttachment = "fixed";
    bgForPlayer.style.backgroundSize = "670px 100vh";
    bgForPlayer.style.opacity = "0.5";
    curr_index_of_background++;
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(audio.duration)) {
      seekPosition = audio.currentTime * (100 / audio.duration);
      seek_slider.value = seekPosition;
      let currentMinutes = Math.floor(audio.currentTime / 60);
      let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audio.duration / 60);
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  function nextTrack() {
    if (song_index < choosen_category.length - 1)
    song_index += 1;
    else song_index = 0;
    loadmusic(choosen_category);

  }
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (song_index > 0)
      song_index -= 1;
    else song_index =choosen_category.length - 1;
     
    // Load and play the new track
    loadmusic(choosen_category);
  }
  playpause_btn = document.getElementById("play-pause");
  function playTrack() {
    audio.play();
    playpause_btn.setAttribute('onclick','pauseTrack()')
    playpause_btn.innerHTML = '<path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/>';
  }
   
  function pauseTrack() {
    audio.pause();
    playpause_btn.setAttribute('onclick','playTrack()')
    playpause_btn.innerHTML = '<path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/>';
  }
setInterval(changeBackground , 7000);
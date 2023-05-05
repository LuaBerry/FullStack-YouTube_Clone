const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");



let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = (event) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
}

const handleMute = (event) => {
    video.muted = !video.muted;
    if(video.muted) {
        muteBtn.innerText = "Unmute";
        volumeRange.value = 0;
    } else {
        muteBtn.innerText = "Mute";
        volumeRange.value = volumeValue;
    }
}

const handleVolumeChange = (event) => {
    if(video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    video.volume = event.target.value;
    volumeValue = event.target.value;
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange)
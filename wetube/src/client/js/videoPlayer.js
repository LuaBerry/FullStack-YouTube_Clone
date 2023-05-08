const { format } = require("morgan");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

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

const formatTime = (seconds) => {
    const formattedTime = new Date(seconds * 1000).toISOString();
    if(seconds < 60 * 60) {
        return formattedTime.substring(14, 19);
    } else {
        return formattedTime.substring(11, 19);
    }
}
const handleLoadedMetadata = (event) => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = video.duration;
}

const handleTimeUpdate = (event) => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimeline = (event) => {
    video.currentTime = event.target.value;
}
playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeline);

video.readyState
    ? handleLoadedMetadata()
    : video.addEventListener("loadedmetadata", handleLoadedMetadata);
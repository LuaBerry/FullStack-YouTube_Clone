const { format } = require("morgan");

const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
let controlsMoveTimeout = null;
video.volume = volumeValue;

const handlePlay = (event) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const handleMute = (event) => {
    video.muted = !video.muted;
    if(video.muted) {
        muteBtnIcon.classList = "fas fa-volume-mute";
        volumeRange.value = 0;
    } else {
        muteBtnIcon.classList = "fas fa-volume-up";
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
    timeline.max = Math.floor(video.duration);
}

const handleTimeUpdate = (event) => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimeline = (event) => {
    video.currentTime = event.target.value;
}

const handleFullscreen = (event) => {
    const fullscreen = document.fullscreenElement;
    if(fullscreen) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
}

const handleMouseMove = (event) => {
    videoControls.classList.add("showing");
    
    if(controlsMoveTimeout) {
        clearTimeout(controlsMoveTimeout);
        controlsMoveTimeout = null;
    }
    controlsMoveTimeout = setTimeout(() => {
        videoControls.classList.remove("showing");
    }, 3000);
}

const handleMouseLeave = (event) => {
    videoControls.classList.remove("showing");
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", (event) => { playBtnIcon.classList = "fas fa-play"; })
timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlay);
document.addEventListener("keydown", (event) => {
    if(event.code === "ArrowLeft") {
        video.currentTime -= 5;
    }
    if(event.code === "ArrowRight") {
        video.currentTime += 5;
        if(video.paused) {
            playBtnIcon.classList = "fas fa-play";
            handleTimeUpdate();
        }
    }
    if(event.code === "Space") {
        handlePlay();
    }
})

video.readyState
    ? handleLoadedMetadata()
    : video.addEventListener("loadedmetadata", handleLoadedMetadata);
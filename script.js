const playlist = [
    {
        title: "Resonance",
        author: "HOME",
        url: "https://archive.org/download/home-resonance/HOME%20-%20Resonance.mp3"
    }
];

let currentTrackIdx = 0;
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playStatus = document.getElementById('playing-status');
const recordIcon = document.getElementById('record-icon');
const trackTitle = document.getElementById('track-title');
const trackAuthor = document.getElementById('track-author');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const volumeSlider = document.getElementById('volume-slider');
const currTimeText = document.getElementById('curr-time');
const totalTimeText = document.getElementById('total-time');

function loadTrack(idx) {
    const track = playlist[idx];
    audio.src = track.url;
    trackTitle.textContent = track.title;
    trackAuthor.textContent = track.author;
    progressBar.style.width = '0%';
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        playStatus.textContent = "NOW PLAYING";
        recordIcon.classList.add('animate-spin');
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playStatus.textContent = "PAUSED";
        recordIcon.classList.remove('animate-spin');
    }
}

function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    loadTrack(currentTrackIdx);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playStatus.textContent = "NOW PLAYING";
    recordIcon.classList.add('animate-spin');
}

function prevTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIdx);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playStatus.textContent = "NOW PLAYING";
    recordIcon.classList.add('animate-spin');
}

function formatTime(secs) {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        currTimeText.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    totalTimeText.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
    nextTrack();
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
});

loadTrack(currentTrackIdx);
audio.volume = 0.5;

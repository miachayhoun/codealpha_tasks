const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const previousBtn = document.getElementById('previousBtn');
const title = document.getElementById('songTitle');
const cover = document.getElementById('songCover');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressBarContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const volumeTrack = document.querySelector(".volume-track");
const volumeFill = document.getElementById("volumeFill");
const volumeThumb = document.getElementById("volumeThumb");

const songs = [
    {
        title: "Call out my name",
        src: "music/Call-out-my-name.mp3",
        cover: "images/call.jpeg"
    },
    {
        title: "StarBoy",
        src: "music/Starboy.mp3",
        cover: "images/starboy.jpeg"
    },
    {
        title: "The hills",
        src: "music/TheHills.mp3",
        cover: "images/thehills.jpeg"
    }
];
let currentSongIndex = 0;

function loadSong(index){
    const song = songs[index];
    audio.src = song.src;
    title.textContent = song.title;
    cover.src = song.cover;
}
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
}
playPauseBtn.addEventListener('click', togglePlayPause);

nextBtn.addEventListener('click', () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
});
previousBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
});

audio.addEventListener('ended', () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    loadSong(currentSongIndex);
    audio.play();
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = progressPercent + "%";
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }
});
function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

function setVolume(percent) {
    percent = Math.max(0, Math.min(1, percent)); // clamp 0-1
    audio.volume = percent;
    volumeFill.style.height = (percent * 100) + "%";
    volumeThumb.style.bottom = (percent * 100) + "%";
}
setVolume(0.5);//initialize volume at 50%
volumeTrack.addEventListener("click", function(e) {
    const rect = volumeTrack.getBoundingClientRect();
    const offset = rect.bottom - e.clientY;
    const percent = offset / rect.height;
    setVolume(percent);
});
let isDragging = false;
volumeThumb.addEventListener("mousedown", () => {
    isDragging = true;
});
document.addEventListener("mouseup", () => {
    isDragging = false;
});
document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = volumeTrack.getBoundingClientRect();
    const offset = rect.bottom - e.clientY;
    const percent = offset / rect.height;
    setVolume(percent);
});

loadSong(currentSongIndex);

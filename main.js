import "./sass/main.scss";

const audio = document.querySelector("#audio");
const cover = document.querySelector(".music--cover");
const title = document.querySelector(".music--title");
const artist = document.querySelector(".music--name");
const remainsTime = document.querySelector(".remains-time");
const totalTimes = document.querySelector(".total-time");
const progressBarContainer = document.querySelector(
  ".music--progress-container"
);
const progressBar = document.querySelector(".music--progress");
const previousBtn = document.querySelector("#previous--btn");
const playBtn = document.querySelector("#play--btn");
const nextBtn = document.querySelector("#next--btn");

window.onload = () => {
  let currentSongIndex;
  let isPlaying = false;

  let songsList = [
    {
      songTitle: "Lost in the City Lights",
      songArtist: "Cosmo Sheldrake",
      songImagePath: "./img/song-1.png",
      songMusicPath: "./music/song-1.mp3",
    },
    {
      songTitle: "Forest Lullaby",
      songArtist: "Lesfm",
      songImagePath: "./img/song-2.png",
      songMusicPath: "./music/song-2.mp3",
    },
  ];

  playBtn.addEventListener("click", PlayPauseSong);
  previousBtn.addEventListener("click", toPreviousSong);
  nextBtn.addEventListener("click", toNextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressBarContainer.addEventListener("click", setProgressBar);

  initializeSong();

  // Initialize SongsList
  function initializeSong() {
    currentSongIndex = 0;
    updateSong();
  }

  // Update Song in the SongsList
  function updateSong() {
    let currentSong = songsList[currentSongIndex];

    title.innerText = currentSong.songTitle;
    artist.innerText = currentSong.songArtist;
    cover.src = currentSong.songImagePath;

    audio.src = currentSong.songMusicPath;

    const timerUpdate = setInterval(() => {
      timerProgress();
    }, 1000);

    audio.addEventListener("ended", toNextSong);
  }

  // Play and Pause Songs
  function PlayPauseSong() {
    !isPlaying ? playSong() : pauseSong();
  }

  // Play Song
  function playSong() {
    audio.play();
    isPlaying = true;

    playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
    playBtn.querySelector("i.fa-solid").classList.add("fa-pause");
  }

  // Pause Song
  function pauseSong() {
    audio.pause();
    isPlaying = false;

    playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
    playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  }

  // Previous song in the SongsList
  function toPreviousSong() {
    currentSongIndex--;

    if (currentSongIndex < 0) {
      currentSongIndex = songsList.length - 1;
    }

    updateSong();
    playSong();
  }

  // Next song in the SongsList
  function toNextSong() {
    currentSongIndex++;

    if (currentSongIndex > songsList.length - 1) {
      currentSongIndex = 0;
    }

    updateSong();
    playSong();
  }

  // Update Progress Bar
  function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    const progressStats = currentTime / duration;
    const progressBarPercent = progressStats * 100;
    progressBar.style.width = `${progressBarPercent}%`;
  }

  // Set the Progress on Click
  function setProgressBar(event) {
    const width = this.clientWidth;
    const Xposition = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (Xposition / width) * duration;
  }

  // Timer Progress in Secondes and Minutes
  function timerProgress() {
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSecondes = Math.floor(audio.currentTime - currentMinutes * 60);
    let totalMinutes = Math.floor(audio.duration / 60);
    let totalSecondes = Math.floor(audio.duration - totalMinutes * 60);

    if (currentSecondes < 10) {
      currentSecondes = "0" + currentSecondes;
    }
    if (totalSecondes < 10) {
      totalSecondes = "0" + totalSecondes;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (totalMinutes < 10) {
      totalMinutes = "0" + totalMinutes;
    }

    remainsTime.textContent = `${currentMinutes}:${currentSecondes}`;
    totalTimes.textContent = `${totalMinutes}:${totalSecondes}`;
  }
};

// Get the music player and playback controls elements
const musicPlayer = document.getElementById('music-player');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeLabel = document.getElementById('volume-label');

const currentTimeEl   = document.getElementById('current-time');
const durationEl      = document.getElementById('duration');
const remainingTimeEl = document.getElementById('remaining-time');

const progressBar = document.getElementById('progress-bar');

// Utility: format seconds as M:SS
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// When metadata is loaded, display total duration
musicPlayer.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(musicPlayer.duration);
  remainingTimeEl.textContent = `-${formatTime(musicPlayer.duration)}`;

  progressBar.min   = 0;
  progressBar.max   = 100;
  progressBar.value = 0;
});

// On each time update, refresh current & remaining times
musicPlayer.addEventListener('timeupdate', () => {
  const current  = musicPlayer.currentTime;
  const duration = musicPlayer.duration;

  currentTimeEl.textContent   = formatTime(current);
  remainingTimeEl.textContent = `-${formatTime(duration - current)}`;

  progressBar.value = (current / duration) * 100;
});

progressBar.addEventListener('input', (e) => {
  const pct = e.target.value / 100;
  musicPlayer.currentTime = pct * musicPlayer.duration;
});

// Set the initial volume
musicPlayer.volume = volumeSlider.value;

volumeSlider.addEventListener('input', () => {
  musicPlayer.volume = volumeSlider.value;
  volumeLabel.textContent = `Volumen: ${Math.round(volumeSlider.value * 100)}%`;
});

// Inline SVGs
const playIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polygon points="5,3 19,12 5,21" />
  </svg>`;
const pauseIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>`;

// Initial state
function setToPlay() {
  playPauseButton.innerHTML = playIcon;
  playPauseButton.setAttribute('aria-label', 'Play');
}

function setToPause() {
  playPauseButton.innerHTML = pauseIcon;
  playPauseButton.setAttribute('aria-label', 'Pause');
}

// Add event listeners for playback controls
playPauseButton.addEventListener('click', () => {
  if (musicPlayer.paused) {
    musicPlayer.play();
    setToPause();
  } else {
    musicPlayer.pause();
    setToPlay();
  }
});

// Auto-start on page load
window.addEventListener('load', () => {
  musicPlayer.play();
  setToPause();
});

setToPlay();
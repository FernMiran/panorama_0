// Get the music player and playback controls elements
const musicPlayer = document.getElementById('music-player');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeLabel = document.getElementById('volume-label');

const currentTimeEl   = document.getElementById('current-time');
const durationEl      = document.getElementById('duration');
const remainingTimeEl = document.getElementById('remaining-time');

// Utility: format seconds as M:SS
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// When metadata is loaded, display total duration
musicPlayer.addEventListener('loadedmetadata', () => {
  durationEl.textContent      = formatTime(musicPlayer.duration);
  remainingTimeEl.textContent = `-${formatTime(musicPlayer.duration)}`;
});

// On each time update, refresh current & remaining times
musicPlayer.addEventListener('timeupdate', () => {
  const current  = musicPlayer.currentTime;
  const duration = musicPlayer.duration;

  currentTimeEl.textContent   = formatTime(current);
  remainingTimeEl.textContent = `-${formatTime(duration - current)}`;
});

// Set the initial volume
musicPlayer.volume = volumeSlider.value;

// Add event listeners for playback controls
playPauseButton.addEventListener('click', () => {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playPauseButton.textContent = '||';
  } else {
    musicPlayer.pause();
    playPauseButton.textContent = '>';
  }
});

volumeSlider.addEventListener('input', () => {
  musicPlayer.volume = volumeSlider.value;
  volumeLabel.textContent = `Volumen: ${Math.round(volumeSlider.value * 100)}%`;
});

// Auto-start on page load
window.addEventListener('load', () => {
  musicPlayer.play();
  playPauseButton.textContent = '||';
});
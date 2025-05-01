// Get the music player and playback controls elements
const musicPlayer = document.getElementById('music-player');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById('volume-slider');
const volumeLabel = document.getElementById('volume-label');

// Set the initial volume
musicPlayer.volume = volumeSlider.value;

// Add event listeners for playback controls
playPauseButton.addEventListener('click', () => {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playPauseButton.textContent = 'Pause';
  } else {
    musicPlayer.pause();
    playPauseButton.textContent = 'Play';
  }
});

volumeSlider.addEventListener('input', () => {
  musicPlayer.volume = volumeSlider.value;
  volumeLabel.textContent = `Volume: ${Math.round(volumeSlider.value * 100)}%`;
});

// Start playing music when the page loads
musicPlayer.play();
playPauseButton.textContent = 'Pause'; // Uncomment to start playing music automatically
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullScreenButton = player.querySelector('.full_screen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration ) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}
function fullScreen(e) {
  if (player.style.minHeight === '100%') {
    player.style.minHeight = '';
    player.style.minWidth = '';
    fullScreenButton.innerHTML = '[ ]';
  } else {
    player.style.minHeight = '100%'
    player.style.minWidth = '100%'
    fullScreenButton.innerHTML = "[X]";
  }
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
progress.addEventListener('click', scrub);
fullScreenButton.addEventListener('click', fullScreen);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(button => button.addEventListener('click', handleRangeUpdate));

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

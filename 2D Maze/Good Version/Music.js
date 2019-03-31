

const audio;
function initAudioPlayer() {
  audio = new Audio();
  audio.src = "https://youtu.be/CldejUAUyIs";
  audio.loop = true;
  audio.play();
};

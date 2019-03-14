const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

const blocker = document.getElementById('he');

const switchTo3D = () => {
  blocker.style.display = 'none';
};

const switchTo2D = () => {
  blocker.style.display = '';
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'red';
// ctx.fillRect(0, 0, 100, 100);

const moveRate = 5;
let rightBar = canvas.width;
let leftBar = -canvas.width / 2;
const image = new Image();
image.id = 'pic';

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // console.log(rightBar + " canvas/2" + canvas.width / 2)
  if (rightBar >= canvas.width / 2) {
    ctx.clearRect(0, 0, 10000, 10000);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    rightBar -= moveRate;
    leftBar += moveRate;
    ctx.fillRect(rightBar, 0, canvas.width / 2, canvas.height / 4);
    ctx.fillRect(leftBar, canvas.height / 4, canvas.width / 2, canvas.height / 4);
    ctx.fillRect(rightBar, canvas.height / 2, canvas.width / 2, canvas.height / 4);
    ctx.fillRect(leftBar, canvas.height / 4 * 3, canvas.width / 2, canvas.height / 4);
    image.src = canvas.toDataURL();
    document.getElementById('he').appendChild(image);
  } else {
    switchTo3D();
  }
};

setInterval(gameLoop, 10);

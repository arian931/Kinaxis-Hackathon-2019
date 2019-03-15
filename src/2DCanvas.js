const canvas = document.getElementById('backgroundCanvas'); // gets the canvas I want to use
const ctx = canvas.getContext('2d'); // makes it so anything ctx. will appear on the canvas

const blocker = document.getElementById('he'); // a div that overlaps the 3d canvas(dont worry about this)

const switchTo3D = () => { //switches to 3d don't worry how it works
  blocker.style.display = 'none';
};

const switchTo2D = () => { // switches to 2d don't worry how it works 
  blocker.style.display = '';
};

canvas.width = window.innerWidth; // makes the canvas the width of the screen
canvas.height = window.innerHeight; // makes the canvas the height of the screen
ctx.fillStyle = 'red';
// ctx.fillRect(0, 0, 100, 100);

const moveRate = 5;
let rightBar = canvas.width;
let leftBar = -canvas.width / 2;
const image = new Image();
image.id = 'pic';

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /*
  -In here you put the game loop stuf so rendering moving stuff. 
  -This fucntion will run ever 33 miliseconds becuase of the function below it
  set inverval
  -for an example of how a maze is built check out the folder in this progect
  called map making.
  -to load it go inside the html file in the folder and right click anywhere
  and click open with live server
  */

  // // console.log(rightBar + " canvas/2" + canvas.width / 2)
  // if (rightBar >= canvas.width / 2) {
  //   ctx.clearRect(0, 0, 10000, 10000);
  //   ctx.fillStyle = 'white';
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle = 'black';
  //   rightBar -= moveRate;
  //   leftBar += moveRate;
  //   ctx.fillRect(rightBar, 0, canvas.width / 2, canvas.height / 4);
  //   ctx.fillRect(leftBar, canvas.height / 4, canvas.width / 2, canvas.height / 4);
  //   ctx.fillRect(rightBar, canvas.height / 2, canvas.width / 2, canvas.height / 4);
  //   ctx.fillRect(leftBar, canvas.height / 4 * 3, canvas.width / 2, canvas.height / 4);
  //   image.src = canvas.toDataURL();
  //   document.getElementById('he').appendChild(image);
  // } else {
  //   switchTo3D();
  // }
};

setInterval(gameLoop, 10);

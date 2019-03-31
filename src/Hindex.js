/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const Player = require('./PlayerClass');
const Block = require('./block');
const canvas = document.getElementById('minigameCanvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

const player = new Player(300, canvas.height / 2 + 100, 30, 90, ctx);
const floorHeight = player.y + player.H;
const blockArray = [];
const blockArrayI = 0;
blockArray[0] = new Block(canvas.width, floorHeight - 80, 40, 80, 50, ctx, blockArray, addBlock);
addBlock();
let playerInput = false;
let jumping = false;
const jumpPower = 20;
const jumpDuration = 10;
let jumpCounter = 0;
const gravity = 8;
let jumpingMultiplier = 1;
const falling = false;
const isJumping = false;
console.log(floorHeight);

const randomAmountOfTimeForSpawn = 20;
let randomSpawn = 0;
let counterForSpawn = 0;
module.exports = () => {
  // addBlock();
  setInterval(gameLoop, 33);
  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
      case 'Space':
        if (!jumping) {
          // console.log("can jump");
          jumping = true;
          jumpCounter = 0;
          jumpingMultiplier = 1;
        } else {
          console.log('not alloud to jump');
        }
        break;
      default:
    }
  });
  document.addEventListener('keyup', (event) => {
    console.log(event.code);
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
      case 'Space':
        playerInput = false;
        break;
      default:
    }
  });
};


// const block = new Block(canvas.width, floorHeight - 80, 40, 80, 50, ctx);


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgb(0,0,200)';
  ctx.fillRect(0, floorHeight, canvas.width, 10);
  /*
   */
  if (counterForSpawn >= randomAmountOfTimeForSpawn + randomSpawn) {
    console.log('spawn');
    randomSpawn = Math.floor(Math.random() * 50 + 1);
    counterForSpawn = 0;
    addBlock();
  } else {
    counterForSpawn++;
  }
  /*
   */
  for (let x = 0; x < blockArray.length; x++) {
    if (!blockArray[x].update()) {
      blockArray.shift();
    }
    blockArray[x].draw();
    if (
      player.x + player.W >= blockArray[x].x
      && player.x <= blockArray[x].x + blockArray[x].w
      && player.y + player.H >= blockArray[x].y
    ) {
      console.log('collision');
    }
  }
  /*
   */
  if (jumping) {
    /*
     */
    jumpCounter++;
    // console.log(jumpCounter + " jumpCounter");
    if (jumpCounter >= jumpDuration) {
      // console.log("jumping is false;");
      // console.log(jumping);
      if (player.y + player.H <= floorHeight - gravity) {
        // console.log("gravity");
        player.y += gravity;
      } else {
        jumping = false;
      }
    } else {
      player.y -= jumpPower * jumpingMultiplier;
      jumpingMultiplier *= 0.9;
    }
  }
  /*
   */
  player.draw();
}

function addBlock() {
  console.log(blockArray);
  blockArray.push(new Block(canvas.width, floorHeight - 80, 40, 80, 20, blockArray, ctx));
}


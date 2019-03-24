/* eslint-disable no-undef */
const canvas = document.getElementById('2DMaze');
const ctx = canvas.getContext('2d');

const tilemap = new Image();
tilemap.src = '../../Art/2D/tilemap.png';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mapArray;

const row = 29;
const col = 29;

let worldPosX = 0;
let worldPosY = 0;

// eslint-disable-next-line no-undef

const Recursive = new RecursiveMaze(row);
const Player = new MainCharacter(128 * 4, 128 * 4, ctx);
const Camera = new PlayerCamera(ctx);
Camera.attachTo(Player);
Recursive.drawMap();
// eslint-disable-next-line prefer-const
mapArray = Recursive.array;

const buffer = document.createElement('CANVAS').getContext('2d');
buffer.canvas.width = 128 * row;
buffer.canvas.height = 128 * col;
Camera.attachBuffer(buffer);
console.log(`${buffer.canvas.width} ${buffer.canvas.height}`);
// buffer.drawImage(tilemap, 0, 0);

// Create the image buffer of the map.
tilemap.onload = () => {
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      // buffer.drawImage(tilemap, 0, 0, 128, 128, 0, 0, 128, 128);
      switch (mapArray[x][y]) {
        case 0:
          buffer.drawImage(tilemap, 128 * 2, 0, 128, 128, 128 * x, 128 * y, 128, 128);
          break;
        case 1: // Walls
          // buffer.drawImage(tilemap, 0, 0, 128, 128, 128 * x, 128 * y, 128, 128);
          if (y - 1 < 0) {
            if (mapArray[x][y + 1] === 0) {
              buffer.drawImage(tilemap, 0, 0, 128, 128, 128 * x, 128 * y, 128, 128);
            } else {
              buffer.drawImage(tilemap, 128, 0, 128, 128, 128 * x, 128 * y, 128, 128);
            }
          } else if (
            (mapArray[x][y + 1] === 0 && mapArray[x][y - 1] === 0)
            || (mapArray[x][y + 1] === 0 && mapArray[x][y - 1] === 1)
          ) {
            buffer.drawImage(tilemap, 0, 0, 128, 128, 128 * x, 128 * y, 128, 128);
          } else {
            buffer.drawImage(tilemap, 128, 0, 128, 128, 128 * x, 128 * y, 128, 128);
          }
          break;
        default:
          break;
      }
    }
  }
};
document.addEventListener('keypress', (event) => {
  switch (event.code) {
    case 'KeyF':
      cX += 1000;
      break;
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyD':
      Player.xDir = 1;
      break;
    case 'KeyA':
      Player.xDir = -1;
      break;
    case 'KeyW':
      Player.yDir = -1;
      break;
    case 'KeyS':
      Player.yDir = 1;
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyD':
      Player.xDir = 0;
      break;
    case 'KeyA':
      Player.xDir = 0;
      break;
    case 'KeyW':
      Player.yDir = 0;
      break;
    case 'KeyS':
      Player.yDir = 0;
      break;
    default:
      break;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /*
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      // eslint-disable-next-line default-case
      switch (mapArray[x][y]) {
        case 0:
          // console.log("No Wall");
          ctx.fillStyle = 'rgb(255,255,255)';
          ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
          break;
        case 1:
          // console.log("Wall");
          ctx.fillStyle = 'rgb(0,0,0)';
          ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
          break;
      }
    }
  }
  */
  // Update objects.
  if (Player.x + Player.width / 2 > Camera.vWidth / 2 && Player.x + Player.width / 2 < buffer.canvas.width - Camera.vWidth / 2) {
    worldPosX += Player.speed * Player.xDir;
  }
  if (Player.y + Player.height / 2 > Camera.vHeight / 2 && Player.y + Player.height / 2 < buffer.canvas.height - Camera.vHeight / 2) {
    worldPosY += Player.speed * Player.yDir;
  }
  if (worldPosX <= 0) {
    worldPosX = 0;
  } else if (worldPosX >= buffer.canvas.width - Camera.vWidth) {
    worldPosX = buffer.canvas.width - Camera.vWidth;
  }
  if (worldPosY <= 0) {
    worldPosY = 0;
  } else if (worldPosY >= buffer.canvas.height - canvas.height) {
    worldPosY = buffer.canvas.height - canvas.height;
  }
  Player.update(buffer);
  Camera.update();
  Camera.draw(worldPosX, worldPosY);
  Player.draw(ctx, worldPosX, worldPosY);
  // console.log('Player: (' + Player.x + ', ' + Player.y + ')\nCamera: (' + Camera.x + ', ' + Camera.y + ')');
}
setInterval(gameLoop, 33);

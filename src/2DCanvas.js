/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
global.canvas = document.getElementById('backgroundCanvas');
global.ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log('FUCKKKKKKKkkkkk !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
const Menu = require('./menu.js');
const Enemy = require('./enemies/enemy');
const Key = require('./key');
const SpikeTrap = require('./spikeTrap');
const TrapController = require('./trapController');
const EnemyController = require('./enemyController');
const KeyController = require('./keyController');
const RecursiveMaze = require('./RecursiveMaze');
const PlayerCamera = require('./camera');
const MainCharacter = require('./2DMainChar');

const blurb = document.getElementById('blurb');
// const cxx = blurb.getContext('2d');
const menu = new Menu(switchBackTo2D);
menu.start();
console.log(canvas);

// Load the tilemap.
const tilemap = new Image();
tilemap.src = '../../Art/2D/tilemap.png';

const doorTilemap = new Image();
doorTilemap.src = '../../Art/2D/door_spritesheet.png';

// eslint-disable-next-line no-unused-vars
const gameObjects = [];

let mapArray;
const mapSize = 29;

// FPS
let dt = 0;
let lastTime = Date.now();

// Define world position variables.
let worldPosX = 0;
let worldPosY = 0;

const enemyController = new EnemyController();
const trapController = new TrapController();
const keyController = new KeyController();
const Recursive = new RecursiveMaze(mapSize);
const Camera = new PlayerCamera(ctx);
Recursive.draw();
const divToDrawTo = document.getElementById('backgroundCanvas');
const image = new Image();
image.id = 'pic';

mapArray = Recursive.array;
const Player = new MainCharacter(
  130,
  120,
  canvas.width,
  canvas.height,
  Recursive.MazeSize,
  mapArray,
  ctx,
  gameObjects,
  // eslint-disable-next-line no-use-before-define
  switchToThreeD,
  // enemyController.enemies,
  callBlurb,
);
gameObjects.push(Player);
enemyController.spawnEnemies(mapArray, gameObjects);
trapController.spawnTraps(mapArray, gameObjects);
keyController.spawnKeys(mapArray, gameObjects);
Camera.attachTo(Player);

let InThreeD = false;

// eslint-disable-next-line prefer-const

// create minimap
const minimap = document.createElement('canvas').getContext('2d');
minimap.canvas.width = window.innerWidth / 7.2;
minimap.canvas.height = minimap.canvas.width;
const minimapPosX = canvas.width - minimap.canvas.width - 32;
const minimapPosY = 32;
const minimapAlpha = 0.7;

// Create the buffer image of the map.
const buffer = document.createElement('CANVAS').getContext('2d');
buffer.canvas.width = 128 * mapSize;
buffer.canvas.height = 128 * mapSize;
Camera.attachBuffer(buffer);
// console.log(`${buffer.canvas.width} ${buffer.canvas.height}`);

// Create the image buffer of the map.
tilemap.onload = () => {
  for (let y = 0; y < mapSize; y++) {
    for (let x = 0; x < mapSize; x++) {
      switch (mapArray[x][y]) {
        case 0: // Ground
          // 3 different ground tiles(2, 3, 4).
          // https://stackoverflow.com/a/4960020 for random number between two numbers.
          buffer.drawImage(
            tilemap,
            128 * Math.floor(Math.random() * (4 - 2 + 1) + 2),
            0,
            128,
            128,
            128 * x,
            128 * y,
            128,
            128,
          );
          minimap.fillStyle = `rgba(83, 244, 65, ${minimapAlpha})`;
          minimap.fillRect(
            (x * minimap.canvas.width) / mapSize,
            (y * minimap.canvas.height) / mapSize,
            minimap.canvas.width / mapSize,
            minimap.canvas.height / mapSize,
          );
          break;
        case 1: // Walls
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
          minimap.fillStyle = `rgba(56, 56, 56, ${minimapAlpha})`;
          minimap.fillRect(
            (x * minimap.canvas.width) / mapSize,
            (y * minimap.canvas.height) / mapSize,
            minimap.canvas.width / mapSize,
            minimap.canvas.height / mapSize,
          );
          break;
        case 3: // Exit
          // 3 different ground tiles(2, 3, 4).
          // https://stackoverflow.com/a/4960020 for random number between two numbers.
          buffer.drawImage(
            tilemap,
            128 * Math.floor(Math.random() * (4 - 2 + 1) + 2),
            0,
            128,
            128,
            128 * x,
            128 * y,
            128,
            128,
          );
          minimap.fillStyle = `rgba(83, 244, 65, ${minimapAlpha})`;
          minimap.fillRect(
            (x * minimap.canvas.width) / mapSize,
            (y * minimap.canvas.height) / mapSize,
            minimap.canvas.width / mapSize,
            minimap.canvas.height / mapSize,
          );
          break;
        default:
          break;
      }
    }
  }
};
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyRight':
    case 'KeyD':
      Player.xDir = 1;
      Player.moveRight = true;
      Player.moveLeft = false;
      Player.moveDown = false;
      Player.moveUp = false;
      break;
    case 'KeyLeft':
    case 'KeyA':
      Player.xDir = -1;
      Player.moveLeft = true;
      Player.moveRight = false;
      Player.moveDown = false;
      Player.moveUp = false;
      break;
    case 'KeyUp':
    case 'KeyW':
      Player.yDir = -1;
      Player.moveUp = true;
      Player.moveRight = false;
      Player.moveDown = false;
      Player.moveLeft = false;
      break;
    case 'KeyDown':
    case 'KeyS':
      Player.yDir = 1;
      Player.moveDown = true;
      Player.moveRight = false;
      Player.moveUp = false;
      Player.moveLeft = false;
      break;
    case 'Space':
      switchToThreeD();
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyRight':
    case 'KeyD':
      Player.xDir = 0;
      Player.moveRight = false;
      break;
    case 'KeyLeft':
    case 'KeyA':
      Player.xDir = 0;
      Player.moveLeft = false;
      break;
    case 'KeyUp':
    case 'KeyW':
      Player.yDir = 0;
      Player.moveUp = false;
      break;
    case 'KeyDown':
    case 'KeyS':
      Player.yDir = 0;
      Player.moveDown = false;
      break;
    default:
      break;
  }
});

function update() {
  // Calucute delta time.
  const nowTime = Date.now();
  dt = (nowTime - lastTime) / 1000;
  lastTime = nowTime;
  // console.log(deltaTime);

  // Update global position.
  // If the player moves half the distance of the camera's view dimensions
  // from the edges of the buffer(left = 0, top = 0, right = 128*col bottom = 128*row), it'll
  // move the world position as the player moves. We use the world position as the camera's
  // position and subtract the world position from the player's position(this makes the player move with the camera).
  if (
    Player.x + Player.width / 2 > Camera.vWidth / 2
    && Player.x + Player.width / 2 < buffer.canvas.width - Camera.vWidth / 2
  ) {
    worldPosX = Player.x + Player.width / 2 - Camera.vWidth / 2;
  }
  if (
    Player.y + Player.height / 2 > Camera.vHeight / 2
    && Player.y + Player.height / 2 < buffer.canvas.height - Camera.vHeight / 2
  ) {
    worldPosY = Player.y + Player.height / 2 - Camera.vHeight / 2;
  }
  // Lock the world position
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

  // Update the objects.
  // Player.update(dt);
  Camera.update(dt);

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(dt);
    if (gameObjects[i] instanceof Enemy) {
      const enemy = gameObjects[i];
      // if (
      //   mapArray[
      //   Math.floor((enemy.x + enemy.width / 2 + (enemy.width / 2) * enemy.xDir) / enemy.width)
      //   ][Math.floor((enemy.y + enemy.height / 2) / enemy.height)] !== 0
      // ) {
      //   enemy.xDir *= -1;
      // }
      // if (
      //   mapArray[Math.floor((enemy.x + enemy.width / 2) / enemy.width)][
      //   Math.floor((enemy.y + enemy.height - 16 + (enemy.height / 2) * enemy.yDir) / enemy.height)
      //   ] !== 0
      // ) {
      //   enemy.yDir *= -1;
      // }

      // Sometimes the enemies spawn outside the maze.
      // This prevents them from doing so.
      while (enemy.y <= 0) {
        enemy.y += 2;
      }
      while (enemy.y >= (mapSize - 1) * 128) {
        enemy.y -= 2;
      }
      while (enemy.x <= 0) {
        enemy.x += 2;
      }
      while (enemy.x >= (mapSize - 1) * 128) {
        enemy.x -= 2;
      }

      // x collision
      if (enemy.xDir === 1) {
        // Right collision
        if (
          mapArray[Math.floor((enemy.x + enemy.width / 2 + enemy.width / 4) / enemy.width)][
          Math.floor((enemy.y + enemy.height / 2) / enemy.height)
          ] !== 0
        ) {
          // The 4 is to make sure the enemy collides close enough to the wall.
          enemy.xDir = -1;
        }
      } else if (enemy.xDir === -1) {
        // Left collision
        if (
          mapArray[Math.floor((enemy.x + enemy.width / 2 - enemy.width / 4) / enemy.width)][
          Math.floor((enemy.y + enemy.height / 2) / enemy.height)
          ] !== 0
        ) {
          // The 4 is to make sure the enemy collides close enough to the wall.
          enemy.xDir = 1;
        }
      }

      // y collision
      if (enemy.yDir === 1) {
        // Down collision
        if (
          mapArray[Math.floor((enemy.x + enemy.width / 2) / enemy.width)][
          Math.floor((enemy.y + enemy.height - 24 + enemy.height / 4) / enemy.height)
          ] !== 0
        ) {
          // The 24 is to make sure the enemy collides close enough to the bottom wall.
          // The 4 is to make sure the enemy collides close enough to the wall.
          enemy.yDir *= -1;
        }
      } else if (enemy.yDir === -1) {
        // Up collision
        if (
          mapArray[Math.floor((enemy.x + enemy.width / 2) / enemy.width)][
          Math.floor((enemy.y + enemy.height - enemy.height / 4) / enemy.height)
          ] !== 0
        ) {
          // The 4 is to make sure the enemy collides close enough to the wall.
          enemy.yDir *= -1;
        }
      }

      // if (mapArray[Math.floor((enemy.x + enemy.width / 2 + (enemy.width / 4 * enemy.xDir)) / enemy.width)]
      // [Math.floor((enemy.y + enemy.height / 2) / enemy.height)] !== 0) {
      //   enemy.xDir *= -1;
      // }

      // // y collision.
      // if (mapArray[Math.floor((enemy.x + enemy.width / 2) / enemy.width)]
      // [Math.floor((enemy.y + enemy.height - (enemy.yDir === 1 ? 24 : 0) + (enemy.height / 4 * enemy.yDir)) / enemy.height)] !== 0) {
      //   enemy.yDir *= -1;
      // }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Camera.draw(worldPosX, worldPosY);
  // Player.draw(ctx, worldPosX, worldPosY);

  // draw door.
  if (Player.keysCollected === keyController.maxSpawnKeys) {
    // Opened doors.
    ctx.drawImage(
      doorTilemap,
      128,
      0,
      128,
      128,
      128 * (mapSize - 1) - worldPosX,
      128 * (mapSize - 3) - worldPosY,
      128,
      128,
    );
    ctx.drawImage(
      doorTilemap,
      128,
      128,
      128,
      128,
      128 * (mapSize - 1) - worldPosX,
      128 * (mapSize - 2) - worldPosY,
      128,
      128,
    );
  } else {
    // Closed doors.
    ctx.drawImage(
      doorTilemap,
      0,
      0,
      128,
      128,
      128 * (mapSize - 1) - worldPosX,
      128 * (mapSize - 3) - worldPosY,
      128,
      128,
    );
    ctx.drawImage(
      doorTilemap,
      0,
      128,
      128,
      128,
      128 * (mapSize - 1) - worldPosX,
      128 * (mapSize - 2) - worldPosY,
      128,
      128,
    );
  }

  // Sort the game objects based on its y.
  gameObjects.sort((a, b) => {
    if (a instanceof SpikeTrap) {
      return -1;
    }
    if (b instanceof SpikeTrap) {
      return 1;
    }
    if (a instanceof Key) {
      if (a.y - a.height / 2 > b.y) {
        return 1;
      }
      return -1;
    }
    if (b instanceof Key) {
      if (b.y - b.height / 2 > a.y) {
        return -1;
      }
      return 1;
    }
    if (a.y > b.y) {
      return 1;
    }
    return -1;
  });

  // Draw minimap and player.
  ctx.drawImage(minimap.canvas, minimapPosX, minimapPosY);
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    minimapPosX
    + (Math.floor((Player.x + Player.width / 2) / Player.width) * minimap.canvas.width) / mapSize,
    minimapPosY
    + (Math.floor((Player.y + Player.height - 4) / Player.height) * minimap.canvas.height)
    / mapSize,
    minimap.canvas.width / mapSize,
    minimap.canvas.height / mapSize,
  );

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw(ctx, worldPosX, worldPosY);
    if (gameObjects[i] instanceof Enemy) {
      const enemy = gameObjects[i];
      ctx.fillStyle = 'red';
      ctx.fillRect(
        minimapPosX
        + (Math.floor((enemy.x + enemy.width / 2) / enemy.width) * minimap.canvas.width) / mapSize,
        minimapPosY
        + (Math.floor((enemy.y + enemy.height - 4) / enemy.height) * minimap.canvas.height)
        / mapSize,
        minimap.canvas.width / mapSize,
        minimap.canvas.height / mapSize,
      );
    }
  }

  // Draw the walls over the player.
  if (mapArray[Math.floor((Player.x + Player.width / 2) / Player.width) - 1][Math.floor((Player.y + Player.height) / Player.height)] === 1) {
    ctx.drawImage(
      buffer.canvas,
      (Math.floor((Player.x + Player.width / 2) / Player.width) - 1) * Player.width,
      Math.floor((Player.y + Player.height) / Player.height) * Player.height,
      Player.width,
      Player.height,
      (Math.floor((Player.x + Player.width / 2) / Player.width) - 1) * Player.width - worldPosX,
      Math.floor((Player.y + Player.height) / Player.height) * Player.height - worldPosY,
      Player.width,
      Player.height
    );
  }
  if (mapArray[Math.floor((Player.x + Player.width / 2) / Player.width)][Math.floor((Player.y + Player.height) / Player.height)] === 1) {
    ctx.drawImage(
      buffer.canvas,
      Math.floor((Player.x + Player.width / 2) / Player.width) * Player.width,
      Math.floor((Player.y + Player.height) / Player.height) * Player.height,
      Player.width,
      Player.height,
      Math.floor((Player.x + Player.width / 2) / Player.width) * Player.width - worldPosX,
      Math.floor((Player.y + Player.height) / Player.height) * Player.height - worldPosY,
      Player.width,
      Player.height
    );
  }
  if (mapArray[Math.floor((Player.x + Player.width / 2) / Player.width) + 1][Math.floor((Player.y + Player.height) / Player.height)] === 1) {
    ctx.drawImage(
      buffer.canvas,
      (Math.floor((Player.x + Player.width / 2) / Player.width) + 1) * Player.width,
      Math.floor((Player.y + Player.height) / Player.height) * Player.height,
      Player.width,
      Player.height,
      (Math.floor((Player.x + Player.width / 2) / Player.width) + 1) * Player.width - worldPosX,
      Math.floor((Player.y + Player.height) / Player.height) * Player.height - worldPosY,
      Player.width,
      Player.height
    );
  }

}

function callBlurb() {
  console.log('BLURB');
  // blurb.style.display = 'block';
}

function gameLoop() {
  if (!InThreeD) {
    window.requestAnimationFrame(gameLoop);
    update();
    draw();
  } else {
    // console.log('not running 2d');
  }
}
function switchBackTo2D() {
  // console.log('2d is back');
  if (InThreeD) {
    InThreeD = false;
  }
  gameLoop();
}
function funToCheckForSwitchBack() {
  // console.log('checkingFor3d');
  if (divToDrawTo.style.display == 'block') {
    switchBackTo2D();
    clearInterval(checkForSwitchBackInerval);
    // console.log('back 2d');
  }
}
let checkForSwitchBackInerval;
function switchToThreeD() {
  divToDrawTo.style.display = 'none';
  InThreeD = true;
  checkForSwitchBackInerval = setInterval(funToCheckForSwitchBack, 33);
}
// window.requestAnimationFrame(gameLoop);

/* eslint-disable no-undef */
const canvas = document.getElementById('2DMaze');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the tilemap.
const tilemap = new Image();
tilemap.src = '../../Art/2D/tilemap.png';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawOrder = [];

let mapArray;
const mapSize = 29;

// FPS
let dt = 0;
let lastTime = Date.now();

// Define world position variables.
let worldPosX = 0;
let worldPosY = 0;

// eslint-disable-next-line no-undef

const enemyController = new EnemyController();
enemyController.enemies.push(new EnemyAnxiety(128, 120));
const Recursive = new RecursiveMaze(mapSize);
const Camera = new PlayerCamera(ctx);
Recursive.drawMap();
// eslint-disable-next-line prefer-const
mapArray = Recursive.array;
const Player = new MainCharacter(
  128,
  128,
  canvas.width,
  canvas.height,
  Recursive.MazeSize,
  mapArray,
  ctx,
);
Camera.attachTo(Player);

// eslint-disable-next-line prefer-const

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
      if (Player.checkMovePosX()) {
        console.log('+X');
        Player.xDir = 1;
      }
      break;
    case 'KeyLeft':
    case 'KeyA':
      Player.xDir = -1;
      break;
    case 'KeyUp':
    case 'KeyW':
      Player.yDir = -1;
      break;
    case 'KeyDown':
    case 'KeyS':
      Player.yDir = 1;
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
      break;
    case 'KeyLeft':
    case 'KeyA':
      Player.xDir = 0;
      break;
    case 'KeyUp':
    case 'KeyW':
      Player.yDir = 0;
      break;
    case 'KeyDown':
    case 'KeyS':
      Player.yDir = 0;
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
    worldPosX += Player.hSpeed * dt;
  }
  if (
    Player.y + Player.height / 2 > Camera.vHeight / 2
    && Player.y + Player.height / 2 < buffer.canvas.height - Camera.vHeight / 2
  ) {
    worldPosY += Player.vSpeed * dt;
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
  Player.update(dt);
  Camera.update(dt);

  for (let i = 0; i < enemyController.enemies.length; i++) {
    const enemy = enemyController.enemies[i];
    enemy.update(dt);
    if (mapArray[Math.floor(((enemy.x + enemy.width / 2) + (enemy.width / 2 * enemy.xDir)) / enemy.width)][Math.floor((enemy.y + enemy.height / 2) / enemy.height)] === 1) {
      enemy.xDir *= -1;
    }
    if (mapArray[Math.floor((enemy.x + enemy.width / 2) / enemy.width)][Math.floor(((enemy.y + enemy.height / 2) + (enemy.height / 2 * enemy.yDir)) / enemy.height)]) {
      enemy.yDir *= -1;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Camera.draw(worldPosX, worldPosY);
  Player.draw(ctx, worldPosX, worldPosY);
  let drewPlayer = false;
  for (let i = 0; i < enemyController.enemies.length; i++) {
    const enemy = enemyController.enemies[i];
    if (!drewPlayer) {
      if (Player.y < enemy.y) {
        Player.draw(ctx, worldPosX, worldPosY);
        enemy.draw(ctx, worldPosX, worldPosY);
      } else {
        enemy.draw(ctx, worldPosX, worldPosY);
        Player.draw(ctx, worldPosX, worldPosY);
      }
      drewPlayer = true;
    }

  }
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  update();
  draw();
  // Draws the maze.
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
  // console.log('Player: (' + Player.x + ', ' + Player.y + ')\nCamera: (' + Camera.x + ', ' + Camera.y + ')');
}
// setInterval(gameLoop, 33);
window.requestAnimationFrame(gameLoop);

const canvas = document.getElementById('2DMaze');
const ctx = canvas.getContext('2d');

const tilemap = new Image();
tilemap.src = '../../Art/2D/tilemap.png';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mapArray;

const row = 29;
const col = 29;

// eslint-disable-next-line no-undef
const Recursive = new RecursiveMaze(row);
const Player = new MainCharacter(0, 0);
const Camera = new PlayerCamera(Player, canvas.width, canvas.height);
Recursive.drawMap();
// eslint-disable-next-line prefer-const
mapArray = Recursive.array;

const buffer = document.createElement('CANVAS').getContext('2d');
buffer.canvas.width = 128 * row;
buffer.canvas.height = 128 * col;
console.log(buffer.canvas.width + ' ' + buffer.canvas.height);
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
          } else {
            if (mapArray[x][y + 1] === 0 && mapArray[x][y - 1] === 0 || mapArray[x][y + 1] === 0 && mapArray[x][y - 1] === 1) {
              buffer.drawImage(tilemap, 0, 0, 128, 128, 128 * x, 128 * y, 128, 128);
            } else {
              buffer.drawImage(tilemap, 128, 0, 128, 128, 128 * x, 128 * y, 128, 128);
            }
          }
          break;
        default: break;
      }
    }
  }
};

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
    default: break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyD':
      Player.xDir = 0;
      break;
    case 'KeyA':
      Player.xDir = -0;
      break;
    case 'KeyW':
      Player.yDir = 0;
      break;
    case 'KeyS':
      Player.yDir = 0;
      break;
    default: break;
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
  // Draw the map.
  /*
  ctx.drawImage(
    buffer.canvas,
    Math.max(0, Player.x + Player.width / 2 - canvas.width / 2),
    Math.max(0, Player.y + Player.height / 2 - canvas.height / 2),
    canvas.width, canvas.height,
    0,
    0,
    canvas.width, canvas.height
  );
  */
  // Update objects.
  Player.update();
  Camera.update();
  Camera.draw(ctx, buffer);
  Player.draw(ctx);
  // console.log('Player: (' + Player.x + ', ' + Player.y + ')\nCamera: (' + Camera.x + ', ' + Camera.y + ')');
}
setInterval(gameLoop, 33);
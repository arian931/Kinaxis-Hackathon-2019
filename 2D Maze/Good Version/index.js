const canvas = document.getElementById('2DMaze');
const ctx = canvas.getContext('2d');

canvas.width = window.innerHeight * 0.99;
canvas.height = window.innerHeight * 0.97;

let mapArray;

// eslint-disable-next-line no-undef
const Recursive = new RecursiveMaze();
Recursive.drawMap();
// eslint-disable-next-line prefer-const
mapArray = Recursive.array;

const row = 30;
const col = 30;

function gameLoop() {
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
      if (x === 0 || x === row - 1 || y === 0 || y === row - 1) {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
      }
    }
  }
}
setInterval(gameLoop, 1000);

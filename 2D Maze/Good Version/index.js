const canvas = document.getElementById("2DMaze");
const ctx = canvas.getContext("2d");

canvas.width = window.innerHeight * 0.99;
canvas.height = window.innerHeight * 0.97;

let mapArray;

// let mapAlgo = new map();
// mapAlgo.drawMap();
// mapArray = mapAlgo.array;

let Recursive = new RecursiveMaze();
Recursive.drawMap();
mapArray = Recursive.array

//console.log(mapArray[0][0]);

setInterval(gameLoop, 1000);
var row = 50;
var col = 50;
var colorToDraw;
function gameLoop() {
    for (var x = 0; x < row; x++) {
        for (var y = 0; y < col; y++) {
            switch (mapArray[x][y]) {
                case 0:
                    //console.log("No Wall");
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
                    break;
                case 1:
                    //console.log("Wall");
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
                    break;
            }
            if (x === 0 || x === row - 1 || y === 0 || y === row - 1) {
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
            }
        }
    }
    }



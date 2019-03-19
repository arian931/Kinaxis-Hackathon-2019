var canvas = document.getElementById("MyCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerHeight * 0.99;
canvas.height = window.innerHeight * 0.97;

var walls = [];
var wallCounter = 0;
var notTaken = true;

canvas.addEventListener("click", getClickPosition => {
    // console.log(getClickPosition.clientX + " " + getClickPosition.clientY + "=" + ctx.getImageData(getClickPosition.clientX, getClickPosition.clientY, 1, 1).data[0] + " " + ctx.getImageData(getClickPosition.clientX, getClickPosition.clientY, 1, 1).data[1] + " " + ctx.getImageData(getClickPosition.clientX, getClickPosition.clientY, 1, 1).data[2]);
    // console.log(ctx.getImageData(getClickPosition.clientX, getClickPosition.clientY, 1, 1).data);
    mapAlgo.test();
}, false);

ctx.beginPath();
ctx.strokeStyle = "rgb(255,0,0)";
ctx.lineWidth = 2;
ctx.moveTo(0, 0);
ctx.lineTo(canvas.width, 0);
ctx.lineTo(canvas.width, canvas.height);
ctx.lineTo(0, canvas.height);
ctx.lineTo(0, 0);
ctx.stroke();

let mapArray;

let mapAlgo = new map();
// mapAlgo.drawMap();
// mapArray = mapAlgo.array;
mapAlgo.drawMap();
mapArray = mapAlgo.array;
console.log(mapArray[0][0]);

// let img = new Image();
// img.src = "src/map2.jpg";
// img.onload = function () {
//     console.log("DRAWING IMAGE");
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//     mapImage();
// }
// function mapImage() {
//     console.log("before");
//     for (var i = 0; i <= canvas.width; i++) {
//         for (var e = 0; e <= canvas.height; e++) {
//             if (walls.length != 0) {
//                 for (var k = 0; k < walls.length; k++) {
//                     if ((i < walls[k].x + walls[k].width && i > walls[k]) && (e < walls[k].y + walls[k].height && e > walls[k].y)) {
//                         notTaken = false;
//                     }
//                 }
//                 if (notTaken) {
//                     if (ctx.getImageData(i, e, 1, 1).data[0] == 255 && ctx.getImageData(i, e, 1, 1).data[1] == 255 && ctx.getImageData(i, e, 1, 1).data[2] == 255) {
//                         foundRectangle(i, e);
//                         // ctx.fillStyle = "blue";
//                         // ctx.fillRect(i, e, 1, 1);
//                         // console.log("found white");
//                     }
//                 }
//                 notTaken = true;
//             } else {
//                 if (ctx.getImageData(i, e, 1, 1).data[0] == 255 && ctx.getImageData(i, e, 1, 1).data[1] == 255 && ctx.getImageData(i, e, 1, 1).data[2] == 255) {
//                     foundRectangle(i, e);
//                     // ctx.fillStyle = "blue";
//                     // ctx.fillRect(i, e, 1, 1);
//                     // console.log("found white");
//                 }
//             }

//         }
//     }
// }

setInterval(gameLoop, 1000);
let row = 50;
let col = 50;
let colorToDraw;
function gameLoop() {
    for (var x = 0; x < row; x++) {
        for (var y = 0; y < col; y++) {
            switch (mapArray[x][y]) {
                case 0: // draws
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
                    break;
                case 1:
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.fillRect(x * (canvas.width / row), y * (canvas.height / col), canvas.width / row, canvas.height / col);
                    break;
            }
        }
    }
    // ctx.fillStyle = "rgb(0,0,255)";
    // ctx.fillRect(mapAlgo.startingLocationX * (canvas.width / row), mapAlgo.startingLocationY * (canvas.height / col), canvas.width / row, canvas.height / col);
}

// function foundRectangle(Sx, Sy) {
//     var counter = 1;
//     while (true) {
//         if (ctx.getImageData(Sx + counter, Sy, 1, 1).data[0] == 255 && ctx.getImageData(Sx + counter, Sy, 1, 1).data[1] == 255 && ctx.getImageData(Sx + counter, Sy, 1, 1).data[2] == 255) {
//             counter++;
//         } else {
//             break;
//         }
//     }
//     var RectWidth = counter - 1;
//     counter = 1;
//     while (true) {
//         if (ctx.getImageData(Sx, Sy + counter, 1, 1).data[0] == 255 && ctx.getImageData(Sx, Sy + counter, 1, 1).data[1] == 255 && ctx.getImageData(Sx, Sy + counter, 1, 1).data[2] == 255) {
//             counter++;
//         } else {
//             break;
//         }
//     }
//     var RectHeight = counter - 1;
//     walls[wallCounter] = new Wall(Sx, Sy, RectWidth, RectHeight);
//     console.log(walls[wallCounter]);
//     drawWalls();
//     //ctx.fillRect(Sx, Sy, RectWidth, RectHeight);

//     // while (true) {
//     //     if (ctx.getImageData(Sx - counter, Sy, 1, 1).data[0] == 255 && ctx.getImageData(Sx - counter, Sy, 1, 1).data[1] == 255 && ctx.getImageData(Sx - counter, Sy, 1, 1).data[2] == 255) {
//     //         counter++;
//     //     } else {
//     //         break;
//     //     }
//     // }
//     // counter = 1;
//     // while (true) {
//     //     if (ctx.getImageData(Sx, Sy - counter, 1, 1).data[0] == 255 && ctx.getImageData(Sx, Sy - counter, 1, 1).data[1] == 255 && ctx.getImageData(Sx, Sy - counter, 1, 1).data[2] == 255) {
//     //         counter++;
//     //     } else {
//     //         break;
//     //     }
//     // }
// }

function drawWalls() {
    for (var n = 0; n < walls.length; n++) {
        walls[n].draw(ctx);
    }
}

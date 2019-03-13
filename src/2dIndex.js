let canvas = document.getElementById("backgroundCanvas");
let ctx = canvas.getContext("2d");

let blocker = document.getElementById('he');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let number = 0;
ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 100, 100);

var image = new Image();
image.id = "pic"

setInterval(gameLoop, 10);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (number <= 200) {
        ctx.clearRect(0, 0, 10000, 10000);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(number, 0, 10, 10);
        number += 1;
        console.log("hi");
        image.src = canvas.toDataURL();
        document.getElementById('he').appendChild(image);
    } else {
        console.log("hello");
        blocker.style.display = 'none';
    }
}
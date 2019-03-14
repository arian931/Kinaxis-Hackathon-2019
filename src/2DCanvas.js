const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let blocker = document.getElementById('he');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log("2D CANVAS");
console.log("IS IT WORKING");
ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 100, 100);

let number = 0;
let moveRate = 5;
let rightBar = canvas.width;
let leftBar = -canvas.width / 2;
var image = new Image();
image.id = "pic"

setInterval(gameLoop, 10);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log(rightBar + " canvas/2" + canvas.width / 2)
    if (rightBar >= canvas.width / 2) {
        console.log("running");
        ctx.clearRect(0, 0, 10000, 10000);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        rightBar -= moveRate;
        leftBar += moveRate;
        ctx.fillRect(rightBar, 0, canvas.width / 2, canvas.height / 4);
        ctx.fillRect(leftBar, canvas.height / 4, canvas.width / 2, canvas.height / 4);
        ctx.fillRect(rightBar, canvas.height / 2, canvas.width / 2, canvas.height / 4);
        ctx.fillRect(leftBar, canvas.height / 4 * 3, canvas.width / 2, canvas.height / 4);
        image.src = canvas.toDataURL();
        document.getElementById('he').appendChild(image);
    } else {
        switchToThreeD();
    }
}

function switchToThreeD() {
    console.log("Switch To 3d");
    blocker.style.display = 'none';
};

function switchBack() {
    console.log("Switch To 2d");
    blocker.style.display = '';
};
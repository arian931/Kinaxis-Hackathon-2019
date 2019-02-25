import Block from "/src/block.js";
import Paddle from "/src/paddle.js";
import InputR from "/src/input.js";
import InputL from "/src/inputLeft.js";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

var p1 = new Paddle(canvas.width, canvas.height, canvas.width / 200, canvas.width * 0.07);
var p2 = new Paddle(canvas.width, canvas.height, canvas.width - canvas.width / 55, canvas.width * 0.9);
var b = new Block(canvas.width, canvas.height, p1, p2);

new InputR(p1);
new InputL(p2);

setInterval(gameLoop, 33); // 33 milliseconds = ~ 30 frames per sec

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  b.draw(ctx);
  p1.draw(ctx);
  p2.draw(ctx);
  b.update();
  p1.update();
  p2.update();
}
//ctx.fillRect(0, 0, canvas.width, canvas.height);

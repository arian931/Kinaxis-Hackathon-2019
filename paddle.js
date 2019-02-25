export default class Paddle {
  constructor(canvasW, canvasH, xValue, xText) {
    this.width = canvasW / 80;
    this.height = canvasW / 10;
    this.x = xValue;
    this.y = canvasH / 2;
    this.direction = true;
    this.canvasH = canvasH;
    this.canvasW = canvasW;
    this.xText = xText;
    this.speed = 10;
    this.score = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "30px Arial";
    ctx.fillText(this.score, this.xText, this.canvasH * 0.25);
  }
  update() {
    //console.log("u");
    if (this.speed < 0) {
      if (this.y > 0) {
        //console.log("Update");
        this.y += this.speed;
      }
    } else {
      if (this.y + this.height < this.canvasH) {
        //console.log("Update");
        this.y += this.speed;
      }
    }
  }
  moveUp() {
    //console.log("going up");
    if (this.speed > 0) {
      this.speed = this.speed * -1;
    }
  }
  moveDown() {
    //wwconsole.log("going Donw");
    if (this.speed < 0) {
      this.speed = this.speed * -1;
    }
  }
}

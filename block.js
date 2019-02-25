export default class Block {
  constructor(canvasW, canvasH, paddleR, paddleL) {
    this.width = canvasW / 60;
    this.height = canvasW / 60;
    this.x = canvasW / 2;
    this.y = canvasH / 2;
    this.canvasH = canvasH;
    this.canvasW = canvasW;
    this.directionX = true;
    this.directionY = true;
    this.canvasH = canvasH;
    this.canvasW = canvasW;
    this.paddleR = paddleR;
    this.paddleL = paddleL;
    this.speed = -10;
    this.score = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }
  update() {
    this.yMovement();
    this.xMovement();
    this.checkForPoint();

  }
  yMovement() {
    if (this.y + this.height > this.canvasH) {
      this.directionY = false;
    }
    if (this.y < 0) {
      this.directionY = true;
    }
    if (this.directionY) {
      this.y += 5;
    } else {
      this.y -= 5;
    }
  }
  xMovement() {
    if (
      (this.x + this.width > this.paddleL.x && this.x + this.width < this.paddleL.x + this.paddleL.width) && (
        (this.y < this.paddleL.y + this.paddleL.height && this.y > this.paddleL.y) ||
        (this.y + this.height > this.paddleL.y && this.y + this.height < this.paddleL.y + this.paddleL.height))
    ) {
      this.speed *= -1;
    }
    if (
      (this.x < this.paddleR.x + this.paddleR.width && this.x > this.paddleR.x) &&
      ((this.y < this.paddleR.y + this.paddleR.height && this.y > this.paddleR.y) ||
        (this.y + this.height > this.paddleR.y && this.y + this.height < this.paddleR.y + this.paddleR.height))
    ) {
      console.log("hit");
      this.speed = this.speed * -1;
    }
    //left paddle above right below 
    this.x += this.speed;
  }
  checkForPoint() {
    if (this.x < 0) {
      this.paddleL.score++;
      this.x = this.canvasW / 2;
      this.y = this.canvasH / 2;
    }
    if (this.x > this.canvasW) {
      this.paddleR.score++;
      this.x = this.canvasW / 2;
      this.y = this.canvasH / 2;
    }
  }
}

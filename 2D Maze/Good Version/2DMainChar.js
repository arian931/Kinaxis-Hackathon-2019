/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
// eslint-disable-next-line no-unused-vars
class MainCharacter {
  constructor(x, y, width, height, mazeSize, mazeArray, context) {
    this.image = new Image();
    this.image.src = '../../Art/2D/male2_spritesheet.png';
    this.camera = undefined;
    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 128;
    this.xDir = 0;
    this.yDir = 0;
    this.speed = 240;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.animationSpeed = 0.21;
    this.spriteDir = 0; // 0 = right, 1 = down, 2 = left, 3 = up.
    this.spriteIndexX = 0;
    this.spriteIndexY = 0;
    this.context = context;
    this.CWidth = width;
    this.CHeight = height;
    this.mazeSize = mazeSize;
    this.mazeArray = mazeArray;
  }

  update(dt) {
    // 0.7071 is a magic constant for diagonal movement.
    this.hSpeed = (this.xDir !== 0 && this.yDir !== 0 ? this.speed * 0.7071 : this.speed) * this.xDir;
    this.vSpeed = (this.xDir !== 0 && this.yDir !== 0 ? this.speed * 0.7071 : this.speed) * this.yDir;
    this.x += this.hSpeed * dt;
    this.y += this.vSpeed * dt;

    // Animate the sprite.
    this.spriteIndexX = (this.spriteIndexX + this.animationSpeed) % 8;

    if (this.xDir === 0 && this.yDir === 0) {
      this.spriteIndexX = this.spriteDir;
      this.spriteIndexY = 0;
    }

    if (this.yDir !== 0) {
      this.spriteDir = this.yDir === 1 ? 1 : 3;
      this.spriteIndexY = this.spriteDir + 1;
    }

    if (this.xDir !== 0) {
      this.spriteDir = this.xDir === 1 ? 0 : 2;
      this.spriteIndexY = this.spriteDir + 1;
    }
  }

  draw(context, worldPosX, worldPosY) {
    context.drawImage(
      this.image,
      this.width * Math.floor(this.spriteIndexX),
      this.height * this.spriteIndexY,
      this.width,
      this.height,
      this.x - worldPosX,
      this.y - worldPosY,
      128,
      128,
    );
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(this.x + 50 - worldPosX, this.y - worldPosY + this.height, 28, -20);
  }

  checkMovePosX() {
    console.log('check move pos x');
    let posTopX = parseInt((this.x + 78) / ((this.CWidth * 128) / this.CWidth));
    let posTopY = parseInt((this.y + this.height - 20) / ((this.CHeight * 128) / this.CHeight));
    let posBotX = parseInt((this.x + 78) / ((this.CWidth * 128) / this.CWidth));
    let posBotY = parseInt((this.y + this.height) / ((this.CHeight * 128) / this.CHeight));
    console.log(
      `TopX: ${posTopX} TopY: ${posTopY} Array Value: ${this.mazeArray[posTopX][posTopY]}`,
    );
    if (this.mazeArray[posTopX][posTopY] == 0) {
      return true;
    }
    console.log('cant walk');
    this.xDir = 0;
    return false;
  }

  checkMoveNegX() {
    // console.log('check X Neg');
    // let posTopX = parseInt(this.x / ((this.CWidth * 128) / this.CWidth));
    // let posTopY = parseInt(this.y / ((this.CHeight * 128) / this.CHeight));
    // let posBotX = parseInt(this.x / ((this.CWidth * 128) / this.CWidth));
    // let posBotY = parseInt((this.y + this.height) / ((this.CHeight * 128) / this.CHeight));
    // console.log(
    //   `TopX: ${posTopX} TopY: ${posTopY} Array Value: ${this.mazeArray[posTopX][posTopY]}`,
    // );
    // if (this.mazeArray[posTopX][posTopY] == 0 && this.mazeArray[posBotX][posBotY] == 0) {
    //   return true;
    // }
    // this.xDir = 0;
    // return false;
    return true;
  }

  checkMovePosY() {
    console.log(`check Y POs${this.y}`);
    return true;
  }

  checkMoveNegY() {
    console.log(`check Y Neg${this.y}`);
    return true;
  }
}

/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
// eslint-disable-next-line no-unused-vars
module.exports = class MainCharacter {
  constructor(x, y, width, height, mazeSize, mazeArray, context, EnemyArray, functToSwitch) {
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
    this.posTopX = parseInt(this.x / ((this.CWidth * 128) / this.CWidth));
    this.posTopY = parseInt(this.y / ((this.CHeight * 128) / this.CHeight));
    this.calcForSquareX = (this.CWidth * 128) / this.CWidth;
    this.moveRight = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
    this.counter = 10;
    this.playerSpeed = 4;
    this.EnemyArray = EnemyArray;
    this.functToSwitch = functToSwitch;
  }

  update() {
    // 0.7071 is a magic constant for diagonal movement.
    this.counter++;
    this.hSpeed = 0;
    this.vSpeed = 0;
    if (this.moveRight) {
      this.checkMovePosX();
    }
    if (this.moveLeft) {
      this.checkMoveNegX();
    }
    if (this.moveDown) {
      this.checkMovePosY();
    }
    if (this.moveUp) {
      this.checkMoveNegY();
    }
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
    for (let j = 0; j < this.EnemyArray.length; j++) {
      if (this.EnemyArray[j].posX == this.posTopX && this.EnemyArray[j].posY == this.posTopY) {
        console.log('collied with E');
        this.functToSwitch();
      }
    }
  }

  draw(context, worldPosX, worldPosY) {
    // console.log('draw');
    context.drawImage(
      this.image,
      this.width * Math.floor(this.spriteIndexX),
      this.height * this.spriteIndexY + 1,
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
    this.posTopY = parseInt((this.y + this.height) / ((this.CHeight * 128) / this.CHeight));
    this.posTopX = parseInt((this.x + 76 + this.playerSpeed) / ((this.CWidth * 128) / this.CWidth));
    // console.log(`${this.posTopX} posTopY ${this.posTopY}`);
    if (this.mazeArray[this.posTopX][this.posTopY] == 0) {
      this.hSpeed = this.playerSpeed;
      this.x += this.hSpeed;
    }
  }

  checkMoveNegX() {
    this.posTopY = parseInt((this.y + this.height) / ((this.CHeight * 128) / this.CHeight));
    this.posTopX = parseInt((this.x + 52 - this.playerSpeed) / ((this.CWidth * 128) / this.CWidth));
    // console.log(`${this.posTopX} posTopY ${this.posTopY}`);
    if (this.mazeArray[this.posTopX][this.posTopY] == 0) {
      this.hSpeed = -this.playerSpeed;
      this.x += this.hSpeed;
    }
  }

  checkMovePosY() {
    // console.log('hello');
    this.posTopY = parseInt(
      (this.y + this.height + this.playerSpeed) / ((this.CHeight * 128) / this.CHeight),
    );
    this.posTopX = parseInt((this.x + 50) / ((this.CWidth * 128) / this.CWidth));
    if (this.mazeArray[this.posTopX][this.posTopY] == 0) {
      this.vSpeed = this.playerSpeed;
      this.y += this.vSpeed;
    }
  }

  checkMoveNegY() {
    // console.log('hello');
    this.posTopY = parseInt(
      (this.y + this.height - 20 - this.playerSpeed) / ((this.CHeight * 128) / this.CHeight),
    );
    this.posTopX = parseInt((this.x + 50) / ((this.CWidth * 128) / this.CWidth));
    if (this.mazeArray[this.posTopX][this.posTopY] == 0) {
      this.vSpeed = -this.playerSpeed;
      this.y += this.vSpeed;
    }
  }
};

/* eslint-disable radix */
// eslint-disable-next-line no-unused-vars
class MainCharacter {
  constructor(x, y, width, height, mazeSize, mazeArray) {
    this.image = new Image();
    this.image.src = '../../Art/2D/female2_spritesheet.png';
    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 128;
    this.xDir = 0;
    this.yDir = 0;
    this.speed = 10;
    this.animationSpeed = 0.2;
    this.mazeSize = mazeSize;
    this.CWidth = width;
    this.CHeight = height;
    this.mazeArray = mazeArray;
    this.posX = 1;
    this.posY = 1;
  }

  update() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    this.posX = parseInt((this.x + 64) / ((this.CWidth * 128) / this.CWidth));
    this.posY = parseInt((this.y + 64) / ((this.CHeight * 128) / this.CHeight));
    // console.log(
    //   parseInt((this.x + 64) / ((this.CWidth * 128) / this.CWidth)),
    //   parseInt((this.y + 64) / ((this.CHeight * 128) / this.CHeight)),
    // );
  }

  draw(context) {
    context.drawImage(this.image, 0, 0, 128, 128, this.x, this.y, this.width, this.height);
  }

  checkMovePosX() {
    if (this.posX <= 1) {
      this.posX = 2;
    }
    if (this.posX >= this.mazeSize - 1) {
      this.posX = this.mazeSize - 2;
    }
    if (this.posY <= 1) {
      this.posY = 2;
    }
    if (this.posY >= this.mazeSize - 1) {
      this.posY = this.mazeSize - 2;
    }
    for (let x = this.posX - 2; x < this.posX + 2; x++) {
      for (let y = this.posY - 2; y < this.mazeSize + 2; y++) {
        // console.log(`${x} x`);
        // console.log(`${y}d y`);
        // console.log(this.mazeArray[x][y]);
        // console.log('array');
      }
    }
    return true;
  }

  checkMoveNegX() {
    console.log(`check X Neg${this.x}`);
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

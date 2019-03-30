module.exports = class Enemy {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = 0; // 0 = horizontal, 1 = vertical.
    this.width = 128;
    this.height = 128;
    this.xDir = 0;
    this.yDir = 0;
    this.speed = 0;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.spriteIndexX = 0;
    this.spriteIndexY = 1;
    this.animationSpeed = 0;
    this.sprite = new Image();
    this.CWidth = 29;
    this.CHeight = 29;
    this.posX = parseInt(this.x / ((this.CWidth * 128) / this.CWidth), 10);
    this.posY = parseInt(this.y / ((this.CHeight * 128) / this.CHeight), 10);
    this.xDir = (dir === 0 ? 1 : 0);
    this.yDir = (dir === 1 ? 1 : 0);
  }

  update(dt) {
    this.hSpeed = this.speed * this.xDir * dt;
    this.vSpeed = this.speed * this.yDir * dt;
    this.x += this.hSpeed;
    this.y += this.vSpeed;

    this.spriteIndexX = (this.spriteIndexX + this.animationSpeed) % this.animationSize;

    if (this.xDir !== 0) {
      this.spriteIndexY = this.xDir === 1 ? 1 : 3;
    } else {
      this.spriteIndexY = this.yDir === 1 ? 2 : 4;
    }
    this.posX = parseInt((this.x + 50) / ((this.CWidth * 128) / this.CWidth), 10);
    this.posY = parseInt((this.y + 20) / ((this.CHeight * 128) / this.CHeight), 10);
  }

  draw(ctx, worldPosX, worldPosY) {
    ctx.drawImage(
      this.sprite,
      this.width * Math.floor(this.spriteIndexX),
      this.height * this.spriteIndexY,
      this.width,
      this.height,
      this.x - worldPosX,
      this.y - worldPosY,
      this.width,
      this.height,
    );
  }
};

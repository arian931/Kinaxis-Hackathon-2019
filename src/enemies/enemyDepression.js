const Enemy = require('./enemy');

module.exports = class EnemyDepression extends Enemy {
  constructor(x, y, dir) {
    super(x, y, dir);
    this.xDir = (dir === 0 ? 1 : 0);
    this.yDir = (dir === 1 ? 1 : 0);
    this.speed = 80;
    this.animationSpeed = 0.07;
    this.sprite = new Image();
    this.sprite.src = '../../Art/2D/enemy_depression_spritesheet.png';
    this.animationSize = 4;
    this.CWidth = 29;
    this.CHeight = 29;
    this.posX = parseInt(this.x / ((this.CWidth * 128) / this.CWidth));
    this.posY = parseInt(this.y / ((this.CHeight * 128) / this.CHeight));
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
    this.posX = parseInt((this.x + 50) / ((this.CWidth * 128) / this.CWidth));
    this.posY = parseInt((this.y + 20) / ((this.CHeight * 128) / this.CHeight));
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
}
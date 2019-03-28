const Enemy = require('./enemy');

module.exports = class EnemyAnxiety extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.speed = 220;
    this.xDir = 1;
    this.animationSpeed = 0.18;
    this.sprite = new Image();
    this.sprite.src = '../../Art/2D/enemy_anxiety_spritesheet.png';
    this.animationSize = 3;
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
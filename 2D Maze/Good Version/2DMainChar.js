// eslint-disable-next-line no-unused-vars
class MainCharacter {
  constructor(x, y, context) {
    this.image = new Image();
    this.image.src = '../../Art/2D/female2_spritesheet.png';
    this.camera = undefined;
    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 128;
    this.xDir = 0;
    this.yDir = 0;
    this.speed = 220;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.animationSpeed = 0.2;
    this.spriteDir = 0; // 0 = right, 1 = down, 2 = left, 3 = up.
    this.spriteIndexX = 0;
    this.spriteIndexY = 0;
    this.context = context;
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
      this.spriteDir = (this.yDir === 1 ? 1 : 3);
      this.spriteIndexY = this.spriteDir + 1;
    }

    if (this.xDir !== 0) {
      this.spriteDir = (this.xDir === 1 ? 0 : 2);
      this.spriteIndexY = this.spriteDir + 1;
    }
  }


  draw(context, worldPosX, worldPosY) {
    context.drawImage(this.image, this.width * Math.floor(this.spriteIndexX), this.height * this.spriteIndexY, this.width, this.height, this.x - worldPosX, this.y - worldPosY, 128, 128);
  }
}

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
    this.animationSpeed = 0.2;
    this.context = context;
  }

  update(dt) {
    // 0.7071 is a magic constant for diagonal movement.
    this.x += (this.xDir !== 0 && this.yDir !== 0 ? this.speed * 0.7071 : this.speed) * this.xDir * dt;
    this.y += (this.xDir !== 0 && this.yDir !== 0 ? this.speed * 0.7071 : this.speed) * this.yDir * dt;
  }


  draw(context, worldPosX, worldPosY) {
    context.drawImage(this.image, 0, 0, 128, 128, this.x - worldPosX, this.y - worldPosY, 128, 128);
  }
}

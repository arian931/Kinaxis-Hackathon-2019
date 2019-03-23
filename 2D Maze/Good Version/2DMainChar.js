// eslint-disable-next-line no-unused-vars
class MainCharacter {
  constructor(x, y) {
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
  }

  update() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
  }

  draw(context) {
    context.drawImage(this.image, 0, 0, 128, 128, 0, 0, this.width, this.height);
  }
}

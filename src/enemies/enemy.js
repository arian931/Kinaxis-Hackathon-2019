module.exports = class Enemy {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = 0; // 0 = right, 1 = down, 2 = left, 3 = up.
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
  }

  update() { }

  draw(ctx) { }
}

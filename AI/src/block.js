module.exports = class Block {
  constructor(x, y, w, h, speed, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.speed = speed;
  }

  draw() {
    this.ctx.fillStyle = 'rgb(255,0,0)';
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
    if (this.x <= 0) {
      return false;
    }
    return true;
  }
};

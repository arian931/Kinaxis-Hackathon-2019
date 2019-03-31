module.exports = class Block {
  constructor(x, y, w, h, speed, array, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.speed = speed;
    this.array = array;
  }

  draw() {
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
    if (this.x <= 0) {
      return false;
    }
    return true;
  }
};

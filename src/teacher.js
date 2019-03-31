module.exports = class Teacher {
  constructor(x, y, w, h, speed, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.speed = speed;
    this.goForward = false;
  }

  draw() {
    this.ctx.fillStyle = 'rgb(0,255,0)';
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
  }
};

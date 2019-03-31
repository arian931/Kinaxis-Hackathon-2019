class Player {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.H = h;
    this.W = w;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.fillRect(this.x, this.y, this.W, this.H);
  }
}

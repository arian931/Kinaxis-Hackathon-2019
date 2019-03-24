// eslint-disable-next-line no-unused-vars
class PlayerCamera {
  constructor(player, width, height) {
    this.player = player;
    this.width = width;
    this.height = height;
    this.x = this.player.x;
    this.y = this.player.y;
  }

  update() {
    this.x = this.player.x - this.width;
    this.y = this.player.y - this.height;
  }

  draw(context, buffer) {
    context.drawImage(
      buffer.canvas,
      Math.max(0, this.x),
      Math.max(0, this.y),
      this.width,
      this.height,
      0,
      0,
      context.canvas.width,
      context.canvas.height,
    );
  }
}

module.exports = class Enemy {
  constructor(x, y, dir, mapArray) {
    this.x = x;
    this.y = y;
    this.dir = 0; // 0 = horizontal, 1 = vertical.
    this.width = 128;
    this.height = 128;
    this.speed = 20;
    this.hSpeed = 0;
    this.vSpeed = 0;
    this.spriteIndexX = 0;
    this.spriteIndexY = 1;
    this.animationSpeed = 0;
    this.sprite = new Image();
    this.CWidth = 29;
    this.CHeight = 29;
    this.posX = parseInt(this.x / ((this.CWidth * 128) / this.CWidth), 10);
    this.posY = parseInt(this.y / ((this.CHeight * 128) / this.CHeight), 10);
    this.xDir = 0;
    this.yDir = 0;
    this.mapArray = mapArray;
    this.vis = [[]];
    for (let i = 0; i < this.mapArray.length; i++) {
      this.vis[i] = [];
      for (let j = 0; j < this.mapArray[i].length; j++) {
        this.vis[i][j] = false;
      }
    }
    this.move(Math.floor((this.x + this.width / 2) / 128), Math.floor((this.y + this.height / 2) / 128));
  }

  update(dt) {
    // set the horizontal and vertical speed.
    this.hSpeed = this.speed * this.xDir * dt;
    this.vSpeed = this.speed * this.yDir * dt;

    // Add the horizontal and vertical speed to enemy's position.
    // this.x += this.hSpeed;
    // this.y += this.vSpeed;

    // Increase the sprite's frame position.
    this.spriteIndexX = (this.spriteIndexX + this.animationSpeed) % this.animationSize;

    if (this.xDir !== 0) {
      // If the enemy is moving horizontally(not idle), change its sprite y
      // index to either row 1 or row 3 of the sprite sheet.
      this.spriteIndexY = this.xDir === 1 ? 1 : 3;
    } else {
      // If the enemy is moving vertically(not idle), change its sprite y
      // index to either row 2 or row 4 of the sprite sheet.
      this.spriteIndexY = this.yDir === 1 ? 2 : 4;
    }
    this.posX = parseInt((this.x + 50) / ((this.CWidth * 128) / this.CWidth), 10);
    this.posY = parseInt((this.y + 20) / ((this.CHeight * 128) / this.CHeight), 10);
  }

  // x and y are tile positions.
  move(x, y) {
    console.log(x);
    const currentPosX = Math.floor((this.x + this.width / 2) / 128);
    const currentPosY = Math.floor((this.y + this.height / 2) / 128);
    this.x += this.speed * (x - currentPosX > 0 ? 1 : -1);
    this.y += this.speed * (y - currentPosY > 0 ? 1 : -1);
    if (currentPosX === x && currentPosY === y) {
      console.log('test');
      const dirs = []; // 0 = right, 1 = down, 2 = left, 3 = up.
      if (
        !this.vis[Math.floor((this.x + this.width / 2) / 128) + 1][Math.floor((this.y + this.height / 2) / 128)]
        && this.mapArray[Math.floor((this.x + this.width / 2) / 128) + 1][Math.floor((this.y + this.height / 2) / 128)] === 0
      ) {
        // Right collision
        dirs.push(0);
        this.vis.push(Math.floor((this.x + this.width / 2) / 128));
        this.vis[Math.floor((this.x + this.width / 2) / 128) + 1][Math.floor((this.y + this.height / 2) / 128)] = true;
      }
      if (
        !this.vis[Math.floor((this.x + this.width / 2) / 128) - 1][Math.floor((this.y + this.height / 2) / 128)]
        && this.mapArray[Math.floor((this.x + this.width / 2) / 128) - 1][Math.floor((this.y + this.height / 2) / 128)] === 0) {
        // Leftcollision
        dirs.push(2);
        this.vis.push(Math.floor((this.x + this.width / 2) / 128 - 1));
        this.vis[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128)] = true;
      }
      if (
        !this.vis[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128) + 1]
        && this.mapArray[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128) + 1] === 0) {
        // Down collision
        dirs.push(1);
        this.vis.push(Math.floor((this.x + this.width / 2) / 128));
        this.vis[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128) + 1] = true;
      }
      if (
        !this.vis[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128) - 1]
        && this.mapArray[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128) - 1] === 0) {
        // Up collision
        dirs.push(3);
        this.vis.push(Math.floor((this.x + this.width / 2) / 128));
        this.vis[Math.floor((this.x + this.width / 2) / 128)][Math.floor((this.y + this.height / 2) / 128) - 1] = true;
      }
      console.log(dirs);
      if (!dirs) {
        for (let k = 0; k < this.mapArray.length; k++) {
          for (let j = 0; j < this.mapArray[k].length; j++) {
            this.vis[k][j] = false;
          }
        }
      }
      // this.move(10, 10);
      // this.move(2, 2);
      const randDir = Math.floor(Math.random() * dirs.length);
      switch (dirs[randDir]) {
        case 0:
          console.log('move right');
          this.move(Math.floor((this.x + this.width / 2) / 128) + 1, Math.floor((this.y + this.height / 2) / 128));
          break;
        case 1:
          console.log('move down');
          this.move(Math.floor((this.x + this.width / 2) / 128), Math.floor((this.y + this.height / 2) / 128) + 1);
          break;
        case 2:
          console.log('move left');
          this.move(Math.floor((this.x + this.width / 2) / 128) - 1, Math.floor((this.y + this.height / 2) / 128));
          break;
        case 3:
          console.log('move up');
          this.move(Math.floor((this.x + this.width / 2) / 128), Math.floor((this.y + this.height / 2) / 128) - 1);
          break;
        default:
          break;
      }
    }
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
};

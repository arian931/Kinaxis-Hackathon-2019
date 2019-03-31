/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const Player = require('./PlayerClass');
const Block = require('./block');

module.exports = class miniGame {
  constructor() {
    this.canvas = document.getElementById('minigameCanvas');
    this.mainCanvas = document.getElementById('backgroundCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(300, this.canvas.height / 2 + 100, 30, 90, this.ctx);
    this.floorHeight = this.player.y + this.player.H;
    // this.block = new Block(canvas.width, floorHeight - 80, 40, 80, 50, ctx);

    this.blockArray = [];
    this.blockArrayI = 0;
    this.blockSpeed = 20;
    this.addBlock();
    console.log(this.blockArray);
    this.playerInput = false;
    this.jumping = false;
    this.jumpPower = 35;
    this.jumpDuration = 8;
    this.jumpCounter = 0;
    this.gravity = 20;
    this.gravityIsStrong = false;
    this.jumpingMultiplier = 1;
    this.falling = false;
    this.isJumping = false;

    this.numberOfBlocksPassed = 0;
    this.increasedDif = false;
    console.log(this.floorHeight);

    this.randomAmountOfTimeForSpawn = 20;
    this.maxAmountForRandomSpawn = 30;
    this.randomSpawn = 0;
    this.counterForSpawn = 0;

    this.handleEvent = (e) => {
      switch (e.type) {
        case 'keydown':
          switch (e.code) {
            case 'KeyW':
            case 'ArrowUp':
              if (!this.jumping) {
                // console.log("can jump");
                this.jumping = true;
                this.jumpCounter = 0;
                this.jumpingMultiplier = 1;
              } else {
                console.log('not alloud to jump');
              }
              break;
            case 'KeyS':
            case 'ArrowDown':
              if (!this.gravityIsStrong) {
                console.log('strong gravity');
                this.gravityIsStrong = true;
                this.gravity = this.gravity * 2;
              }
              break;
            default:
          }
          break;
        case 'keyup':
          switch (e.code) {
            case 'KeyW':
            case 'ArrowUp':
              this.playerInput = false;
              break;
            case 'KeyS':
            case 'ArrowDown':
              if (this.gravityIsStrong) {
                this.gravityIsStrong = false;
                this.gravity = this.gravity / 2;
              }
              break;
            default:
          }
          break;
        default:
          break;
      }
    };
  }
  // addBlock();

  start() {
    // console.log(this.blockArray);
    this.mainInterval = setInterval(this.gameLoop.bind(this), 33);

    document.addEventListener('keydown', this);
    document.addEventListener('keyup', this);
  }

  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgb(0,0,0)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgb(0,0,200)';
    this.ctx.fillRect(0, this.floorHeight, this.canvas.width, 20);
    /*
     */
    if (this.counterForSpawn >= this.randomSpawn) {
      console.log('spawn');
      this.randomSpawn = Math.floor(Math.random() * this.maxAmountForRandomSpawn + 20);
      this.counterForSpawn = 0;
      this.addBlock();
    } else {
      this.counterForSpawn++;
    }
    /*
     */
    // console.log(this.blockArray);
    for (let x = 0; x < this.blockArray.length; x++) {
      if (!this.blockArray[x].update()) {
        this.increasedDif = false;
        this.numberOfBlocksPassed++;
        this.blockArray.shift();
      }
      this.blockArray[x].draw();
      if (
        this.player.x + this.player.W - 5 >= this.blockArray[x].x
        && this.player.x + 5 <= this.blockArray[x].x + this.blockArray[x].w
        && this.player.y + this.player.H >= this.blockArray[x].y
      ) {
        document.removeEventListener('keydown', this);
        document.removeEventListener('keyup', this);
        this.canvas.style.display = 'none';
        this.mainCanvas.style.display = 'block';
        clearInterval(this.mainInterval);
        console.log('collision');
      }
    }
    if (this.numberOfBlocksPassed % 5 == 0 && !this.increasedDif) {
      console.log('increased speed');
      this.maxAmountForRandomSpawn -= 2;
      this.blockSpeed += 3;
      this.increasedDif = true;
    }
    /*
     */
    if (this.jumping) {
      /*
       */
      this.jumpCounter++;
      // console.log(jumpCounter + " jumpCounter");
      if (this.jumpCounter >= this.jumpDuration) {
        // console.log("jumping is false;");
        // console.log(jumping);
        if (this.player.y + this.player.H <= this.floorHeight - this.gravity) {
          // console.log("gravity");
          this.player.y += this.gravity;
        } else {
          this.player.y = this.floorHeight - this.player.H;
          this.jumping = false;
        }
      } else {
        this.player.y -= this.jumpPower * this.jumpingMultiplier;
        this.jumpingMultiplier *= 0.9;
      }
    }
    /*
     */
    this.player.draw();
  }

  addBlock() {
    // console.log(this.blockArray);
    const randomHeight = Math.floor(Math.random() * 40 + 40);
    this.blockArray.push(
      new Block(
        this.canvas.width,
        this.floorHeight - randomHeight,
        40,
        randomHeight,
        this.blockSpeed,
        this.ctx,
      ),
    );
  }
};

// const block = new Block(canvas.width, floorHeight - 80, 40, 80, 50, ctx);

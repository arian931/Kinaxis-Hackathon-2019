/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */

module.exports = class Map {
  constructor() {
    this.array = [];
    this.front = true;
    this.back = false;
    this.right = false;
    this.left = false;
    this.startingLocationX = 1;
    this.startingLocationY = 1;
    this.PossibleDirections = [];
    this.first = false;
    this.howManyInDirectionF = 0;
    this.howManyInDirectionD = 0;
    this.howManyInDirectionR = 0;
    this.howManyInDirectionL = 0;
    this.testBool = false;
    this.MazeSize = 50;
  }

  drawMap() {
    // eslint-disable-next-line no-plusplus
    for (let x = 0; x < this.MazeSize; x++) {
      this.array[x] = [];
    }
    // eslint-disable-next-line no-plusplus
    for (let x = 0; x < this.MazeSize; x++) {
      // eslint-disable-next-line no-plusplus
      for (let y = 0; y < this.MazeSize; y++) {
        this.array[x][y] = 1;
      }
    }
    while (true) {
      if (this.checkDirection()) {
        this.kill();
      } else if (!this.hunt()) {
        //  console.log("check Direction = false;");
        // console.log("HUNT FAILED FOR SHO");
        this.array[this.MazeSize - 1][this.MazeSize - 3] = 3;
        this.array[this.MazeSize - 2][this.MazeSize - 3] = 3;
        this.array[this.MazeSize - 3][this.MazeSize - 3] = 0;
        this.array[this.MazeSize - 1][this.MazeSize - 4] = 3;
        this.array[this.MazeSize - 2][this.MazeSize - 4] = 3;
        this.array[this.MazeSize - 3][this.MazeSize - 4] = 0;
        break;
      }
    }
  }

  test() {
    if (!this.testBool) {
      while (true) {
        if (this.checkDirection()) {
          this.kill();
        } else {
          break;
        }
      }
      this.testBool = true;
    } else {
      this.hunt();
      this.testBool = false;
    }
  }

  checkDirection() {
    //  console.log("Check Direction");
    const x = this.startingLocationX;
    const y = this.startingLocationY;
    this.array[x][y] = 0;
    let canGo = false;
    this.PossibleDirections = [];
    if (x + 2 < this.MazeSize - 2 && this.array[x + 2][y] === 1 && this.array[x + 1][y] === 1) {
      this.PossibleDirections.push('R');
      canGo = true;
    }
    if (x - 2 > 1 && this.array[x - 2][y] === 1 && this.array[x - 1][y] === 1) {
      this.PossibleDirections.push('L');
      canGo = true;
    }
    if (y + 2 < this.MazeSize - 2 && this.array[x][y + 2] === 1 && this.array[x][y + 1] === 1) {
      this.PossibleDirections.push('D');
      canGo = true;
    }
    if (y - 2 > 1 && this.array[x][y - 2] === 1 && this.array[x][y - 1] === 1) {
      this.PossibleDirections.push('U');
      canGo = true;
    }
    if (canGo) {
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      return false;
    }
  }

  kill() {
    //  console.log("kill");
    const choice = Math.floor(Math.random() * this.PossibleDirections.length);
    //  console.log(choice);
    // let indexForAsigning;
    //  console.log(this.PossibleDirections);
    switch (this.PossibleDirections[choice]) {
      case 'D':
        // console.log("Traveling D");
        this.array[this.startingLocationX][this.startingLocationY + 1] = 0;
        this.array[this.startingLocationX][this.startingLocationY + 2] = 0;
        this.startingLocationY += 2;
        break;
      case 'U':
        // console.log("Traveling U");
        this.array[this.startingLocationX][this.startingLocationY - 1] = 0;
        this.array[this.startingLocationX][this.startingLocationY - 2] = 0;
        this.startingLocationY -= 2;
        break;
      case 'R':
        //  console.log("Traveling R");
        this.array[this.startingLocationX + 1][this.startingLocationY] = 0;
        this.array[this.startingLocationX + 2][this.startingLocationY] = 0;
        this.startingLocationX += 2;
        break;
      case 'L':
        //  console.log("Traveling L");
        this.array[this.startingLocationX - 1][this.startingLocationY] = 0;
        this.array[this.startingLocationX - 2][this.startingLocationY] = 0;
        this.startingLocationX -= 2;
        break;
      default:
    }
  }

  hunt() {
    //  console.log("hunt");
    let canKill = false;
    let foundIT = true;
    for (let x = this.MazeSize - 2; x >= 1; x--) {
      if (foundIT) {
        for (let y = 1; y <= this.MazeSize - 2; y++) {
          if (foundIT) {
            if (x <= this.MazeSize - 4 && y > 1 && y < this.MazeSize - 2) {
              if (this.array[x][y] === 1 && this.array[x + 1][y] === 1 && this.array[x + 2][y] === 0
                && this.array[x][y + 1] === 1 && this.array[x][y - 1] === 1
              ) {
                //  console.log("+x");
                this.array[x][y] = 0;
                //  this.array[x + 1][y] = 0;
                this.startingLocationX = x + 1;
                this.startingLocationY = y;
                foundIT = false;
                canKill = true;
              }
            }
          }
          if (foundIT) {
            if (x >= 3 && y > 1 && y < this.MazeSize - 2) {
              if (this.array[x][y] === 1 && this.array[x - 1][y] === 1 && this.array[x - 2][y] === 0
                && this.array[x][y + 1] === 1 && this.array[x][y - 1] === 1
              ) {
                //  console.log("-x");
                this.array[x][y] = 0;
                //  this.array[x - 1][y] = 0;
                this.startingLocationX = x - 1;
                this.startingLocationY = y;
                foundIT = false;
                canKill = true;
              }
            }
          }
          if (foundIT) {
            if (y <= 96 && x > 1 && x < this.MazeSize - 2) {
              if (this.array[x][y] === 1 && this.array[x][y + 1] === 1 && this.array[x][y + 2] === 0
                && this.array[x + 1][y] === 1 && this.array[x - 1][y] === 1
              ) {
                //  console.log("+x");
                this.array[x][y] = 0;
                //  this.array[x][y + 1] = 0;
                this.startingLocationX = x;
                this.startingLocationY = y + 1;
                foundIT = false;
                canKill = true;
              }
            }
          }
          if (foundIT) {
            if (y >= 3 && x > 1 && x < this.MazeSize - 2) {
              if (this.array[x][y] === 1 && this.array[x][y - 1] === 1 && this.array[x][y - 2] === 0
                && this.array[x + 1][y] === 1 && this.array[x - 1][y] === 1
              ) {
                //  console.log("+x");
                this.array[x][y] = 0;
                //  this.array[x][y - 1] = 0;
                this.startingLocationX = x;
                this.startingLocationY = y - 1;
                foundIT = false;
                canKill = true;
              }
            }
          }
        }
      }
    }
    if (canKill) {
      return true;
      // eslint-disable-next-line no-else-return
    } else {
      return false;
    }
  }
};




module.exports = class Map {
  constructor() {
    this.array = [];
    this.front = true;
    this.back = false;
    this.right = false;
    this.left = false;
    this.startingLocationX = 1;
    this.startingLocationY = 1;
    this.currentX;
    this.currentY;
    this.PossibleDirections = [];
    this.first = false;
    this.RCToIndex;
    this.howManyInDirectionF = 0;
    this.howManyInDirectionD = 0;
    this.howManyInDirectionR = 0;
    this.howManyInDirectionL = 0;
    this.testBool = false;
    this.MazeSize = 50;
  }

  drawMap() {
    let counter = 0;
    for (let x = 0; x < this.MazeSize; x++) {
      this.array[x] = [];
    }
    for (let x = 0; x < this.MazeSize; x++) {
      for (let y = 0; y < this.MazeSize; y++) {
        this.array[x][y] = 1;
      }
    }
    while (true) {
      if (this.checkDirection()) {
        this.kill();
      } else {
        //console.log("check Direction = false;");
        if (!this.hunt()) {
          //console.log("HUNT FAILED FOR SHO");
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
    //console.log("Check Direction");
    let x = this.startingLocationX;
    let y = this.startingLocationY;
    this.array[x][y] = 0;
    //console.log("x " + x);
    //console.log("y " + y);
    let canGo = false;
    this.PossibleDirections = [];
    if (x + 2 < this.MazeSize - 2 && this.array[x + 2][y] == 1 && this.array[x + 1][y] == 1) {
      //console.log("R");
      this.PossibleDirections.push("R");
      canGo = true;
    }
    if (x - 2 > 1 && this.array[x - 2][y] == 1 && this.array[x - 1][y] == 1) {
      //console.log("L");
      this.PossibleDirections.push("L");
      canGo = true;
    }
    if (y + 2 < this.MazeSize - 2 && this.array[x][y + 2] == 1 && this.array[x][y + 1] == 1) {
      //console.log("D");
      this.PossibleDirections.push("D");
      canGo = true;
    }
    if (y - 2 > 1 && this.array[x][y - 2] == 1 && this.array[x][y - 1] == 1) {
      //console.log("U");
      this.PossibleDirections.push("U");
      canGo = true;
    }
    if (canGo) {
      return true;
    } else {
      return false;
    }
  }

  kill() {
    //  console.log("kill");
    let choice = Math.floor(Math.random() * this.PossibleDirections.length);
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
        //console.log("Traveling R");
        this.array[this.startingLocationX + 1][this.startingLocationY] = 0;
        this.array[this.startingLocationX + 2][this.startingLocationY] = 0;
        this.startingLocationX += 2;
        break;
      case "L":
        //console.log("Traveling L");
        this.array[this.startingLocationX - 1][this.startingLocationY] = 0;
        this.array[this.startingLocationX - 2][this.startingLocationY] = 0;
        this.startingLocationX -= 2;
        break;
      default:
    }
  }

  hunt() {
    //console.log("hunt");
    let canKill = false;
    var foundIT = true;
    for (var x = this.MazeSize - 2; x >= 1; x--) {
      if (foundIT) {
        for (var y = 1; y <= this.MazeSize - 2; y++) {
          if (foundIT) {
            if (x <= this.MazeSize - 4 && y > 1 && y < this.MazeSize - 2) {
              if (this.array[x][y] == 1 && this.array[x + 1][y] == 1 && this.array[x + 2][y] == 0
                && this.array[x][y + 1] == 1 && this.array[x][y - 1] == 1
              ) {
                //console.log("+x");
                this.array[x][y] = 0;
                //this.array[x + 1][y] = 0;
                this.startingLocationX = x + 1;
                this.startingLocationY = y;
                foundIT = false;
                canKill = true;
              }
            }
          }
          if (foundIT) {
            if (x >= 3 && y > 1 && y < this.MazeSize - 2) {
              if (this.array[x][y] == 1 && this.array[x - 1][y] == 1 && this.array[x - 2][y] == 0
                && this.array[x][y + 1] == 1 && this.array[x][y - 1] == 1
              ) {
                //console.log("-x");
                this.array[x][y] = 0;
                //this.array[x - 1][y] = 0;
                this.startingLocationX = x - 1;
                this.startingLocationY = y;
                foundIT = false;
                canKill = true;
              }
            }
          }
          if (foundIT) {
            if (y <= 96 && x > 1 && x < this.MazeSize - 2) {
              if (this.array[x][y] == 1 && this.array[x][y + 1] == 1 && this.array[x][y + 2] == 0
                && this.array[x + 1][y] == 1 && this.array[x - 1][y] == 1
              ) {
                //console.log("+x");
                this.array[x][y] = 0;
                //this.array[x][y + 1] = 0;
                this.startingLocationX = x;
                this.startingLocationY = y + 1;
                foundIT = false;
                canKill = true;
              }
            }
          }
          if (foundIT) {
            if (y >= 3 && x > 1 && x < this.MazeSize - 2) {
              if (this.array[x][y] == 1 && this.array[x][y - 1] == 1 && this.array[x][y - 2] == 0
                && this.array[x + 1][y] == 1 && this.array[x - 1][y] == 1
              ) {
                //console.log("+x");
                this.array[x][y] = 0;
                //this.array[x][y - 1] = 0;
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
    } else {
      return false;
    }
  }
}
// eslint-disable-next-line no-unused-vars
class RecursiveMaze {
  constructor(size) {
    // eslint-disable-next-line no-console
    console.log('recursive');
    this.array = [];
    this.visitedPlacesX = [];
    this.visitedPlacesY = [];
    this.solidfiedX = [];
    this.solidfiedY = [];
    this.solidfiedCounter = 0;
    this.whichMove = [];
    this.front = true;
    this.back = false;
    this.right = false;
    this.left = false;
    this.startingLocationX = 1;
    this.startingLocationY = 1;
    // eslint-disable-next-line no-unused-expressions
    this.currentX;
    // eslint-disable-next-line no-unused-expressions
    this.currentY;
    this.PossibleDirections = [];
    this.first = false;
    // eslint-disable-next-line no-unused-expressions
    this.RCToIndex;
    this.howManyInDirectionF = 0;
    this.howManyInDirectionD = 0;
    this.howManyInDirectionR = 0;
    this.howManyInDirectionL = 0;
    this.testBool = false;
    this.MazeSize = size + 1;
  }

  drawMap() {
    // let counter = 0;
    for (let x = 0; x < this.MazeSize; x++) {
      // console.log("howMany");
      this.array[x] = [];
    }
    for (let x = 0; x < this.MazeSize; x++) {
      for (let y = 0; y < this.MazeSize; y++) {
        // console.log("HowManyY" + y);
        this.array[x][y] = 1;
      }
    }
    this.array[this.startingLocationX][this.startingLocationY] = 0;
    while (true) {
      if (this.checkDirection()) {
        this.kill();
      } else {
        // eslint-disable-next-line no-console
        console.log('check Direction = false;');
        if (!this.finalTest()) {
          // console.log("HUNT FAILED FOR SHO");
          // this.MazeSize[this.MazeSize - 1][this.MazeSize - 2] == 0;
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

  finalTest() {
    // eslint-disable-next-line no-plusplus
    this.whichMove--;
    if (this.whichMove !== 0) {
      // console.log("going back");
      // this.solidfiedX[this.solidfiedCounter] = this.visitedPlacesX[this.whichMove];
      // this.solidfiedY[this.solidfiedCounter] = this.visitedPlacesY[this.whichMove];
      this.startingLocationX = this.visitedPlacesX[this.whichMove];
      this.startingLocationY = this.visitedPlacesY[this.whichMove];
      // eslint-disable-next-line no-plusplus
      this.solidfiedCounter++;
      return true;
    }
    return false;
  }

  test() {
    // console.log("run");
    if (this.checkDirection()) {
      this.kill();
    } else if (!this.finalTest()) {
      // console.log("check Direction = false;");
      // console.log("HUNT FAILED FOR SHO");
    }
  }

  checkDirection() {
    // eslint-disable-next-line no-console
    //console.log('Check Direction');
    const x = this.startingLocationX;
    const y = this.startingLocationY;
    // this.array[x][y] = 0;
    let canGo = false;
    this.PossibleDirections = [];
    if (x + 2 < this.MazeSize - 1 && this.array[x + 2][y] === 1 && this.array[x + 1][y] === 1) {
      // right
      // console.log("R");
      this.PossibleDirections.push('R');
      canGo = true;
    }
    if (x - 2 > 0 && this.array[x - 2][y] === 1 && this.array[x - 1][y] === 1) {
      // left
      // console.log("L");
      this.PossibleDirections.push('L');
      canGo = true;
    }
    if (y + 2 < this.MazeSize - 1 && this.array[x][y + 2] === 1 && this.array[x][y + 1] === 1) {
      // bottom
      // console.log("D");
      this.PossibleDirections.push('D');
      canGo = true;
    }
    if (y - 2 > 0 && this.array[x][y - 2] === 1 && this.array[x][y - 1] === 1) {
      // up
      // console.log("U");
      this.PossibleDirections.push('U');
      canGo = true;
    }
    if (canGo) {
      return true;
    }
    return false;
  }

  kill() {
    // eslint-disable-next-line no-console
    //console.log('kill');
    const choice = Math.floor(Math.random() * this.PossibleDirections.length);
    this.visitedPlacesX[this.whichMove] = this.startingLocationX;
    this.visitedPlacesY[this.whichMove] = this.startingLocationY;
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
        // console.log("Traveling R");
        this.array[this.startingLocationX + 1][this.startingLocationY] = 0;
        this.array[this.startingLocationX + 2][this.startingLocationY] = 0;
        this.startingLocationX += 2;
        break;
      case 'L':
        // console.log("Traveling L");
        this.array[this.startingLocationX - 1][this.startingLocationY] = 0;
        this.array[this.startingLocationX - 2][this.startingLocationY] = 0;
        this.startingLocationX -= 2;
        break;
      default:
        break;
    }
    // eslint-disable-next-line no-plusplus
    this.whichMove++;
  }
}

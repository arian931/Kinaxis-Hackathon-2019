/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
const Floor = require('./Floor.js');
const InsideWallsMaze = require('./InsideWallsMaze.js');
const Map = require('./Map.js');
const WallGenerator = require('./WallGenerator.js');
const RecursiveMaze = require('./RecursiveMaze');
const TwoDCanvas = require('./2DCanvas');
const Platform = require('./Platform');
const LevelOne = require('./LevelOne');
const Collectible = require('./Collectible');

module.exports = class LevelOne {
  constructor(scene, renderer, camera, jumpDistance, sizeOfPlatforms) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.platFormsClass = [];
    this.platFormConstructor = [];
    this.collectibles = [];
    this.collectiblesCurrentIndex = 0;
    this.currentIndex = 0;
    this.currentPositionX = 0;
    this.currentPositionY = 0;
    this.currentPositionZ = 0;
    this.white = new THREE.Color('rgb(255, 255, 255)');
    this.black = new THREE.Color('rgb(0, 0, 0)');
    this.yellow = new THREE.Color('rgb(233, 255, 0)');
    this.green = new THREE.Color('rgb(0,255,0)');
    this.blue = new THREE.Color('rgb(0,100,255)');
    this.red = new THREE.Color('rgb(255,0,0)');
    this.buildASection = false;
    this.counter = 0;
    this.LastDirection = 0;
    this.score = 0;
    this.jumpDistance = jumpDistance;
    this.sizeOfPlatforms = sizeOfPlatforms;
  }

  generateScene() {
    // let floorClass = new Floor(1000, 1000, this.scene);
    // floorClass.addToScene();
    // let walls = [];
    // walls[0] = new WallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, this.white, this.scene, 0);
    // walls[1] = new WallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, this.white, this.scene, 0);
    // walls[2] = new WallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, this.white, this.scene, (-Math.PI / 2));
    // walls[3] = new WallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, this.white, this.scene, (-Math.PI / 2));
    // for (let x = 0; x < walls.length; x++) {
    //     walls[x].addToScene();
    // }
    let DIR;
    let NOS;
    let LastDirection = 0;
    let shouldJump;

    this.scene.fog = new THREE.FogExp2(this.white, 0.005);

    for (let x = 0; x < 20; x++) {
      console.log(
        `X: ${this.currentPositionX} Y: ${this.currentPositionY} Z: ${this.currentPositionZ}`,
      );
      while (true) {
        DIR = Math.floor(Math.random() * 3);
        if (
          (LastDirection == 0 && DIR != 1)
          || (LastDirection == 1 && DIR != 0)
          || (LastDirection == 3 && DIR != 2)
          || (LastDirection == 2 && DIR != 3)
        ) {
          break;
        }
      }
      LastDirection = DIR;
      // console.log(DIR + " DIR");

      if (x % 2 != 0) {
        NOS = Math.floor(Math.random() * 4 + 2);
        this.buildStairCase(
          this.currentPositionX,
          this.currentPositionY,
          this.currentPositionZ,
          DIR,
          NOS,
        );
      } else {
        shouldJump = Math.floor(Math.random() * 4 + 1);
        // console.log(shouldJump + "Should Jump");
        if (shouldJump == 1) {
          // console.log("should Jump");
          NOS = Math.floor(Math.random() * 1 + 1);
          this.buildMovingCourse(
            this.currentPositionX,
            this.currentPositionY,
            this.currentPositionZ,
            DIR,
            NOS,
            true,
          );
        } else {
          NOS = Math.floor(Math.random() * 2 + 1);
          this.buildMovingCourse(
            this.currentPositionX,
            this.currentPositionY,
            this.currentPositionZ,
            DIR,
            NOS,
            false,
          );
        }
      }
    }

    for (let x = 0; x < this.platFormConstructor.length; x++) {
      this.platFormsClass[x] = new Platform(
        this.platFormConstructor[x][0],
        this.platFormConstructor[x][1],
        this.platFormConstructor[x][2],
        this.platFormConstructor[x][3],
        this.platFormConstructor[x][4],
        this.platFormConstructor[x][5],
        this.platFormConstructor[x][6],
        this.platFormConstructor[x][7],
        this.platFormConstructor[x][8],
        this.platFormConstructor[x][9],
      );
      this.platFormsClass[x].addToScene();
    }

    const _this = this;
    setInterval(() => {
      _this.gameLoop();
    }, 33);
  }

  test() {
    let DIR;
    let NOS;
    let shouldJump;
    while (true) {
      DIR = Math.floor(Math.random() * 3);
      if (
        (this.LastDirection == 0 && DIR != 1)
        || (this.LastDirection == 1 && DIR != 0)
        || (this.LastDirection == 3 && DIR != 2)
        || (this.LastDirection == 2 && DIR != 3)
      ) {
        break;
      }
    }
    this.LastDirection = DIR;
    // console.log(DIR + " DIR");
    if (this.counter % 2 != 0) {
      NOS = Math.floor(Math.random() * 4 + 1);
      this.buildStairCase(
        this.currentPositionX,
        this.currentPositionY,
        this.currentPositionZ,
        DIR,
        NOS,
      );
    } else {
      shouldJump = Math.floor(Math.random() * 3);
      // console.log(shouldJump + "Should Jump");
      if (shouldJump == 1) {
        // console.log("should Jump");
        NOS = Math.floor(Math.random() * 1 + 1);
        this.buildMovingCourse(
          this.currentPositionX,
          this.currentPositionY,
          this.currentPositionZ,
          DIR,
          NOS,
          true,
        );
      } else {
        this.buildMovingCourse(
          this.currentPositionX,
          this.currentPositionY,
          this.currentPositionZ,
          DIR,
          NOS,
          false,
        );
      }
    }
    for (let x = 0; x < this.platFormConstructor.length; x++) {
      this.platFormsClass[x] = new Platform(
        this.platFormConstructor[x][0],
        this.platFormConstructor[x][1],
        this.platFormConstructor[x][2],
        this.platFormConstructor[x][3],
        this.platFormConstructor[x][4],
        this.platFormConstructor[x][5],
        this.platFormConstructor[x][6],
        this.platFormConstructor[x][7],
        this.platFormConstructor[x][8],
        this.platFormConstructor[x][9],
      );
      this.platFormsClass[x].addToScene();
    }
    this.counter++;
  }

  gameLoop() {
    if (this.camera.position.y <= -2000) {
      this.camera.position.x = 0;
      this.camera.position.z = 0;
      this.camera.position.y = 10;
    }
    for (let x = 0; x < this.collectibles.length; x++) {
      this.collectibles[x].rotate();
    }

    for (let x = 0; x < this.platFormsClass.length; x++) {
      if (this.platFormsClass[x].movingHor) {
        this.platFormsClass[x].moveHor();
      }
      if (this.platFormsClass[x].movingVer) {
        this.platFormsClass[x].moveVer();
      }
      if (this.platFormsClass[x].movingZ) {
        this.platFormsClass[x].moveZ();
      }
    }
    this.buildASection = false;
  }

  buildStairCase(SX, SY, SZ, Dir, NumOfSteps) {
    let xStair = SX;
    let yStair = SY;
    let zStair = SZ;
    let curIndex;
    let random;
    random = Math.floor(Math.random() * NumOfSteps);
    switch (Dir) {
      case 0:
        // console.log("Dir 0");
        curIndex = this.currentIndex;
        random += curIndex;
        for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
          if (random == x) {
            this.collectibles[this.collectiblesCurrentIndex] = new Collectible(
              xStair,
              yStair,
              zStair + 10,
              this.scene,
            );
            this.collectibles[this.collectiblesCurrentIndex].addToScene();
            this.collectiblesCurrentIndex++;
          }
          this.platFormConstructor[x] = [
            xStair,
            yStair,
            zStair,
            this.sizeOfPlatforms,
            20,
            this.white,
            this.scene,
            false,
            false,
            false,
          ];
          xStair += this.jumpDistance / 2;
          yStair -= 0;
          zStair += 10;
          this.currentIndex++;
        }
        break;
      case 1:
        // console.log("Dir 1");
        curIndex = this.currentIndex;
        random += curIndex;
        for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
          if (random == x) {
            this.collectibles[this.collectiblesCurrentIndex] = new Collectible(
              xStair,
              yStair,
              zStair + 10,
              this.scene,
            );
            this.collectibles[this.collectiblesCurrentIndex].addToScene();
            this.collectiblesCurrentIndex++;
          }
          this.platFormConstructor[x] = [
            xStair,
            yStair,
            zStair,
            this.sizeOfPlatforms,
            20,
            this.yellow,
            this.scene,
            false,
            false,
            false,
          ];
          xStair -= this.jumpDistance / 2;
          yStair -= 0;
          zStair += 10;
          this.currentIndex++;
        }
        break;
      case 2:
        // console.log("Dir 2");
        curIndex = this.currentIndex;
        random += curIndex;
        for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
          if (random == x) {
            this.collectibles[this.collectiblesCurrentIndex] = new Collectible(
              xStair,
              yStair,
              zStair + 10,
              this.scene,
            );
            this.collectibles[this.collectiblesCurrentIndex].addToScene();
            this.collectiblesCurrentIndex++;
          }
          this.platFormConstructor[x] = [
            xStair,
            yStair,
            zStair,
            this.sizeOfPlatforms,
            20,
            this.red,
            this.scene,
            false,
            false,
            false,
          ];
          xStair -= 0;
          yStair -= this.jumpDistance / 2;
          zStair += 10;
          this.currentIndex++;
        }
        break;
      case 3:
        // console.log("Dir 3");
        curIndex = this.currentIndex;
        random += curIndex;
        for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
          if (random == x) {
            this.collectibles[this.collectiblesCurrentIndex] = new Collectible(
              xStair,
              yStair,
              zStair + 10,
              this.scene,
            );
            this.collectibles[this.collectiblesCurrentIndex].addToScene();
            this.collectiblesCurrentIndex++;
          }
          this.platFormConstructor[x] = [
            xStair,
            yStair,
            zStair,
            this.sizeOfPlatforms,
            20,
            this.green,
            this.scene,
            false,
            false,
            false,
          ];
          xStair -= 0;
          yStair += this.jumpDistance / 2;
          zStair += 10;
          this.currentIndex++;
        }
        break;
      default:
    }
    // zStair -= 5;
    this.currentPositionX = xStair;
    this.currentPositionY = yStair;
    this.currentPositionZ = zStair;
  }

  buildMovingCourse(SX, SY, SZ, Dir, numOfJumps, upAndDown) {
    let curIndex;
    let xStair = SX;
    let yStair = SY;
    let zStair = SZ;
    this.platFormConstructor[this.currentIndex] = [
      xStair,
      yStair,
      zStair,
      this.sizeOfPlatforms,
      20,
      this.red,
      this.scene,
      false,
      false,
      false,
    ];
    this.currentIndex++;

    switch (Dir) {
      case 0:
        // console.log("Dir Mov 0")
        xStair += this.jumpDistance;
        yStair -= 0;
        zStair += 0;
        curIndex = this.currentIndex;
        for (let x = curIndex; x < curIndex + numOfJumps; x++) {
          if (upAndDown) {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.white,
              this.scene,
              true,
              false,
              false,
            ];
            xStair += this.jumpDistance;
            yStair -= 0;
            zStair += 0;
            this.currentIndex++;
          } else {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.white,
              this.scene,
              false,
              false,
              true,
            ];
            xStair += this.jumpDistance;
            yStair -= 0;
            zStair += 0;
            this.currentIndex++;
          }
        }
        break;
      case 1:
        // console.log("Dir Mov 1")
        xStair -= this.jumpDistance;
        yStair -= 0;
        zStair += 0;
        curIndex = this.currentIndex;
        for (let x = curIndex; x < curIndex + numOfJumps; x++) {
          if (upAndDown) {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.yellow,
              this.scene,
              true,
              false,
              false,
            ];
            xStair -= this.jumpDistance;
            yStair -= 0;
            zStair += 0;
            this.currentIndex++;
          } else {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.yellow,
              this.scene,
              false,
              false,
              true,
            ];
            xStair -= this.jumpDistance;
            yStair -= 0;
            zStair += 0;
            this.currentIndex++;
          }
        }
        break;
      case 2:
        // console.log("Dir Mov 2")
        xStair += 0;
        yStair -= this.jumpDistance;
        zStair += 0;
        curIndex = this.currentIndex;
        for (let x = curIndex; x < curIndex + numOfJumps; x++) {
          if (upAndDown) {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.red,
              this.scene,
              true,
              false,
              false,
            ];
            xStair -= 0;
            yStair -= this.jumpDistance;
            zStair += 0;
            this.currentIndex++;
          } else {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.red,
              this.scene,
              false,
              true,
              false,
            ];
            xStair -= 0;
            yStair -= this.jumpDistance;
            zStair += 0;
            this.currentIndex++;
          }
        }
        break;
      case 3:
        // console.log("Dir Mov 3")
        xStair += 0;
        yStair += this.jumpDistance;
        zStair += 0;
        curIndex = this.currentIndex;
        for (let x = curIndex; x < curIndex + numOfJumps; x++) {
          if (upAndDown) {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.green,
              this.scene,
              true,
              false,
              false,
            ];
            xStair -= 0;
            yStair += this.jumpDistance;
            zStair += 0;
            this.currentIndex++;
          } else {
            this.platFormConstructor[x] = [
              xStair,
              yStair,
              zStair,
              this.sizeOfPlatforms,
              20,
              this.green,
              this.scene,
              false,
              true,
              false,
            ];
            xStair -= 0;
            yStair += this.jumpDistance;
            zStair += 0;
            this.currentIndex++;
          }
        }
        break;
      default:
    }
    this.currentPositionX = xStair;
    this.currentPositionY = yStair;
    this.currentPositionZ = zStair;
  }

  collectibleCollision(CX, CY, CZ) {
    for (let x = 0; x < this.collectibles.length; x++) {
      if (
        this.collectibles[x].cubeFor.position.x == CX
        && this.collectibles[x].cubeFor.position.y == CY
        && this.collectibles[x].cubeFor.position.z == CZ
      ) {
        this.scene.remove(this.collectibles[x].cubeFor);
        this.collectibles.splice(x, 1);
        this.score++;
      }
    }
  }
};

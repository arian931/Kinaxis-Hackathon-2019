const Floor = require('./Floor.js');
const InsideWallsMaze = require('./InsideWallsMaze.js');
const Map = require('./Map.js');
const WallGenerator = require('./WallGenerator.js');
const RecursiveMaze = require('./RecursiveMaze');
const TwoDCanvas = require('./2DCanvas');
const Platform = require('./Platform');
const LevelOne = require('./LevelOne');

module.exports = class LevelOne {
    constructor(scene, renderer, camera) {
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.platFormsClass = [];
        this.platFormConstructor = [];
        this.currentIndex = 0;
        this.currentPositionX;
        this.currentPositionY;
        this.currentPositionZ;
        this.white = new THREE.Color("rgb(255, 255, 255)");
        this.black = new THREE.Color("rgb(0, 0, 0)");
        this.yellow = new THREE.Color("rgb(233, 255, 0)");
        this.green = new THREE.Color("rgb(0,255,0)");
        this.blue = new THREE.Color("rgb(0,100,255)");
        this.red = new THREE.Color("rgb(255,0,0)");
    }



    generateScene() {
        let white = new THREE.Color("rgb(255, 255, 255)");
        let black = new THREE.Color("rgb(0, 0, 0)");
        let yellow = new THREE.Color("rgb(233, 255, 0)");
        let green = new THREE.Color("rgb(0,255,0)");
        let blue = new THREE.Color("rgb(0,100,255)");
        let red = new THREE.Color("rgb(255,0,0)");
        let floorClass = new Floor(1000, 1000, this.scene);
        floorClass.addToScene();
        let walls = [];
        walls[0] = new WallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, this.white, this.scene, 0);
        walls[1] = new WallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, this.white, this.scene, 0);
        walls[2] = new WallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, this.white, this.scene, (-Math.PI / 2));
        walls[3] = new WallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, this.white, this.scene, (-Math.PI / 2));
        for (let x = 0; x < walls.length; x++) {
            walls[x].addToScene();
        }

        // this.buildStairCase(0, 0, 0, 0, 4);
        // this.buildStairCase(this.currentPositionX, this.currentPositionY, this.currentPositionZ, 1, 2);
        // this.buildStairCase(this.currentPositionX, this.currentPositionY, this.currentPositionZ, 2, 3);
        // this.buildStairCase(this.currentPositionX, this.currentPositionY, this.currentPositionZ, 3, 1);

        this.buildMovingCourse(0, 0, 0, 0, 4);
        this.buildMovingCourse(0, 0, 0, 1, 4);
        this.buildMovingCourse(0, 0, 0, 2, 4);


        for (let x = 0; x < this.platFormConstructor.length - 1; x++) {
            this.platFormsClass[x] = new Platform(this.platFormConstructor[x][0], this.platFormConstructor[x][1], this.platFormConstructor[x][2], this.platFormConstructor[x][3], this.platFormConstructor[x][4], this.platFormConstructor[x][5], this.platFormConstructor[x][6], this.platFormConstructor[x][7], this.platFormConstructor[x][8]);
            this.platFormsClass[x].addToScene();
        }

        var _this = this;
        setInterval(function () {
            _this.gameLoop();
        }, 33);
    }

    gameLoop() {
        //console.log("Game LOop");
        // requestAnimationFrame(this.gameLoop());
        for (let x = 0; x < this.platFormsClass.length; x++) {
            //console.log(this.platFormsClass[x].movingHor);
            if (this.platFormsClass[x].movingHor) {
                this.platFormsClass[x].moveHor();
            }
            if (this.platFormsClass[x].movingVer) {
                this.platFormsClass[x].moveVer();
            }
            if (this.platFormsClass[x].movingZ) {
                console.log("moving z is ture");
                this.platFormsClass[x].moveZ();
            }
        }
        //this.renderer.render(this.scene, this.camera);
    }

    buildStairCase(SX, SY, SZ, Dir, NumOfSteps) {
        let xStair = SX;
        let yStair = SY;
        let zStair = SZ;
        let curIndex;
        switch (Dir) {
            case 0:
                console.log("Dir 0");
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
                    if (x != 2) {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    } else {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    }
                    xStair += 40;
                    yStair -= 0;
                    zStair += 10;
                    this.currentIndex++;
                }
                break;
            case 1:
                console.log("Dir 1");
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
                    if (x != 2) {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    } else {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    }
                    xStair -= 40;
                    yStair -= 0;
                    zStair += 10;
                    this.currentIndex++;
                }
                break;
            case 2:
                console.log("Dir 2");
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
                    if (x != 2) {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    } else {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    }
                    xStair -= 0;
                    yStair += 40;
                    zStair += 10;
                    this.currentIndex++;
                }
                break;
            case 3:
                console.log("Dir 2");
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + NumOfSteps; x++) {
                    if (x != 2) {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    } else {
                        this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, false];
                    }
                    xStair = 0;
                    yStair -= 40;
                    zStair += 10;
                    this.currentIndex++;
                }
                break;
            default:
        }
        this.currentPositionX = xStair;
        this.currentPositionY = yStair;
        this.currentPositionZ = zStair;
    }
    buildMovingCourse(SX, SY, SZ, Dir, numOfJumps) {
        let curIndex;
        let xStair = SX;
        let yStair = SY;
        let zStair = SZ;
        switch (Dir) {
            case 0:
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + numOfJumps; x++) {
                    this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, true, false, false];
                    xStair += 40;
                    yStair -= 0;
                    zStair += 0;
                    this.currentIndex++;
                }
                break;
            case 1:
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + numOfJumps; x++) {
                    this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, true, false];
                    xStair -= 40;
                    yStair -= 0;
                    zStair += 0;
                    this.currentIndex++;
                }
                break;
            case 2:
                curIndex = this.currentIndex;
                for (let x = curIndex; x < curIndex + numOfJumps; x++) {
                    this.platFormConstructor[x] = [xStair, yStair, zStair, 20, this.red, this.scene, false, false, true];
                    xStair -= 0;
                    yStair -= 40;
                    zStair += 0;
                    this.currentIndex++;
                }
                break;
            default:
        }
        this.currentPositionX = xStair;
        this.currentPositionY = yStair;
        this.currentPositionZ = zStair;
    }
};

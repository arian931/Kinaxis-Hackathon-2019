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
        walls[0] = new WallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, this.scene, 0);
        walls[1] = new WallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, this.scene, 0);
        walls[2] = new WallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, white, this.scene, (-Math.PI / 2));
        walls[3] = new WallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, white, this.scene, (-Math.PI / 2));
        for (let x = 0; x < walls.length; x++) {
            walls[x].addToScene();
        }
        let platFormConstructor = [];
        // platFormConstructor[0] = [0, 100, 0, 1, red, this.scene, false, false,];
        // platFormConstructor[1] = [0, 100, 0, 1, red, this.scene, true, false,];
        // platFormConstructor[2] = [0, 100, 0, 1, red, this.scene, false, true,];

        let xStair = 0;
        let yStair = 0;
        let zStair = 0;

        for (let x = 0; x < 4; x++) {
            if (x != 2) {
                platFormConstructor[x] = [xStair, yStair, zStair, 20, red, this.scene, true, false];
            } else {
                platFormConstructor[x] = [xStair, yStair, zStair, 20, red, this.scene, true, false];
            }
            xStair += 40;
            yStair += 0;
            zStair += 10;
        }
        for (let x = 0; x < platFormConstructor.length - 1; x++) {
            console.log("should be sceene");
            this.platFormsClass[x] = new Platform(platFormConstructor[x][0], platFormConstructor[x][1], platFormConstructor[x][2], platFormConstructor[x][3], platFormConstructor[x][4], platFormConstructor[x][5], platFormConstructor[x][6], platFormConstructor[x][7]);
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
        }
        //this.renderer.render(this.scene, this.camera);
    }
};

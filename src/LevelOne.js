const Floor = require('./Floor.js');
const InsideWallsMaze = require('./InsideWallsMaze.js');
const Map = require('./Map.js');
const WallGenerator = require('./WallGenerator.js');
const RecursiveMaze = require('./RecursiveMaze');
const TwoDCanvas = require('./2DCanvas');
const Platform = require('./Platform');
const LevelOne = require('./LevelOne');

module.exports = class LevelOne {
  constructor(scene) {
    this.scene = scene;
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

    //outer wall generation
    let walls = [];
    walls[0] = new WallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, this.scene, 0);
    walls[1] = new WallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, this.scene, 0);
    walls[2] = new WallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, white, this.scene, (-Math.PI / 2));
    walls[3] = new WallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, white, this.scene, (-Math.PI / 2));
    for (let x = 0; x < walls.length; x++) {
      walls[x].addToScene();
    }

    let InsideWallsNumberArray;
    let InsideWalls = [];
    // console.log("hunt And KIll true");
    // let mapAlgo = new Map();
    // mapAlgo.drawMap();
    // InsideWallsNumberArray = mapAlgo.array;

    console.log("hunt And KIll true");

    let platForm1 = new Platform(0, 100, 100, 50, red, this.scene);
    platForm1.addToScene();
    let platForm2 = new Platform(100, 0, 100, 50, black, this.scene);
    platForm2.addToScene();
    let platForm3 = new Platform(100, 100, 0, 50, white, this.scene);
    platForm3.addToScene();
    let platForm4 = new Platform(0, 0, 0, 50, green, this.scene);
    platForm4.addToScene();









    // let mapAlgo = new RecursiveMaze();
    // mapAlgo.drawMap();
    // InsideWallsNumberArray = mapAlgo.array;

    // for (let x = 0; x < mapAlgo.MazeSize; x++) {
    //     for (let y = 0; y < mapAlgo.MazeSize; y++) {
    //         InsideWalls[x] = [];
    //     }
    // }
    // for (let ro = 0; ro < mapAlgo.MazeSize; ro++) {
    //     for (let co = 0; co < mapAlgo.MazeSize; co++) {
    //         if (InsideWallsNumberArray[ro][co] == 1) {
    //             //console.log("1");
    //             let xValue = (ro * floorClass.w / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.w / mapAlgo.MazeSize) / 2);
    //             let zValue = (co * floorClass.h / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.h / mapAlgo.MazeSize) / 2);
    //             InsideWalls[ro][co] = new InsideWallsMaze(xValue, zValue, (floorClass.w / mapAlgo.MazeSize), false, this.scene);
    //             InsideWalls[ro][co].addToScene();
    //         }
    //         if (InsideWallsNumberArray[ro][co] == 3) {
    //             //console.log("3");
    //             let xValue = (ro * floorClass.w / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.w / mapAlgo.MazeSize) / 2);
    //             let zValue = (co * floorClass.h / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.h / mapAlgo.MazeSize) / 2);
    //             InsideWalls[ro][co] = new InsideWallsMaze(xValue, zValue, (floorClass.w / mapAlgo.MazeSize), true, this.scene);
    //             InsideWalls[ro][co].addToScene();
    //         }
    //     }
    // }

  }
};

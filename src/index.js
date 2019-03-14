global.THREE = require('three');
const Floor = require('./Floor.js');
const InsideWallsMaze = require('./InsideWallsMaze.js');
const Map = require('./Map.js');
const WallGenerator = require('./WallGenerator.js');
//  const Door = require('./Door.js');
require('./RecursiveMaze');
require('./2DCanvas');
require('./Controls.js');
/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
const white = new THREE.Color('rgb(255, 255, 255)');
// const black = new THREE.Color("rgb(0, 0, 0)");
// const yellow = new THREE.Color("rgb(233, 255, 0)");
// const green = new THREE.Color("rgb(0,255,0)");
const blue = new THREE.Color('rgb(0,100,255)');
// const red = new THREE.Color("rgb(255,0,0)");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 750);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
// camera starting position
// camera.position.z = 25;
// camera.position.y = 100;
// camera.position.x = 5;
const controls = new THREE.PointerLockControls(camera);
const renderer = new THREE.WebGLRenderer();
const floorClass = new Floor(1000, 1000, scene);
renderer.setPixelRatio(window.devicePixelRatio / 2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// outer wall generation
let walls = [];
walls[0] = new WallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, scene, 0);
walls[1] = new WallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, scene, 0);
walls[2] = new WallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, white, scene, (-Math.PI / 2));
walls[3] = new WallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, white, scene, (-Math.PI / 2));
for (let x = 0; x < walls.length; x++) {
  walls[x].addToScene();
}

//wall genertion
let InsideWallsNumberArray;
let InsideWalls = [];

let mapAlgo = new Map();
mapAlgo.drawMap();
InsideWallsNumberArray = mapAlgo.array;
for (let x = 0; x < mapAlgo.MazeSize; x++) {
  for (let y = 0; y < mapAlgo.MazeSize; y++) {
    InsideWalls[x] = [];
  }
}

for (let ro = 0; ro < mapAlgo.MazeSize; ro++) {
  for (let co = 0; co < mapAlgo.MazeSize; co++) {
    if (InsideWallsNumberArray[ro][co] == 1) {
      //console.log("1");
      let xValue = (ro * floorClass.w / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.w / mapAlgo.MazeSize) / 2);
      let zValue = (co * floorClass.h / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.h / mapAlgo.MazeSize) / 2);
      InsideWalls[ro][co] = new InsideWallsMaze(xValue, zValue, (floorClass.w / mapAlgo.MazeSize), false, scene);
      InsideWalls[ro][co].addToScene();
    }
    if (InsideWallsNumberArray[ro][co] == 3) {
      //console.log("3");
      let xValue = (ro * floorClass.w / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.w / mapAlgo.MazeSize) / 2);
      let zValue = (co * floorClass.h / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.h / mapAlgo.MazeSize) / 2);
      InsideWalls[ro][co] = new InsideWallsMaze(xValue, zValue, (floorClass.w / mapAlgo.MazeSize), true, scene);
      InsideWalls[ro][co].addToScene();
    }
  }
}

// the booleans for moving
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let time;
let delta;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');
instructions.addEventListener('click', () => {
  controls.lock();
}, false);
controls.addEventListener('lock', () => {
  instructions.style.display = 'none';
  blocker.style.display = 'none';
});
controls.addEventListener('unlock', () => {
  blocker.style.display = 'block';
  instructions.style.display = '';
});
scene.add(controls.getObject());
const onKeyDown = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;
    case 37: // left
    case 65: // a
      moveLeft = true;
      break;
    case 40: // down
    case 83: // s
      moveBackward = true;
      break;
    case 39: // right
    case 68: // d
      moveRight = true;
      break;
    default:
      break;
  }
};
const onKeyUp = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;
    case 37: // left
    case 65: // a
      moveLeft = false;
      break;
    case 40: // down
    case 83: // s
      moveBackward = false;
      break;
    case 39: // right
    case 68: // d
      moveRight = false;
      break;
    default:
      break;
  }
};
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

floorClass.addToScene();

// way to make a basic cube with a 1,1,1 size and the color 0x00ff00, but I made some colors on the top like green or white
/*
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.y = 10;
*/

scene.background = blue;

// lighting
// let lightDir = new THREE.DirectionalLight(0xffffff, 0.3);
// lightDir.position.set(500, 500, 500).normalize();
// scene.add(lightDir);

const lightHem = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(lightHem);

// const geometryPlayer = new THREE.BoxGeometry(10, 40, 10);
// const materialPlayer = new THREE.MeshLambertMaterial({ color: new THREE.Color('rgb(255, 255, 255)') });
// const Player = new THREE.Mesh(geometryPlayer, materialPlayer);
// scene.add(Player);
// Player.position.x = 0;
// Player.position.y = 100;
// Player.position.z = 0;

// animate is like gameloop we could probably use setInverval if we wanted to E.X setInterval(animate, 33);
const animate = () => {
  requestAnimationFrame(animate);
  if (controls.isLocked === true) {
    time = performance.now();
    delta = (time - prevTime) / 1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveLeft) - Number(moveRight);
    direction.normalize(); // this ensures consistent movements in all directions
    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateZ(velocity.z * delta);
    prevTime = time;
  }
  renderer.render(scene, camera);
};

animate(); // to start loop

global.THREE = require('three');
const Floor = require('./Floor.js');
// const InsideWallsMaze = require('./InsideWallsMaze.js');
// const Map = require('./Map.js');
// const WallGenerator = require('./WallGenerator.js');
require('./RecursiveMaze');
require('./2DCanvas');
require('./3DControls');
// const Platform = require('./Platform');
const LevelOne = require('./LevelOne');
// const white = new THREE.Color('rgb(255, 255, 255)');
// const black = new THREE.Color("rgb(0, 0, 0)");
// const yellow = new THREE.Color("rgb(233, 255, 0)");
// const green = new THREE.Color("rgb(0,255,0)");
const blue = new THREE.Color('rgb(0,100,255)');
// const red = new THREE.Color("rgb(255,0,0)");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 750);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
const controls = new THREE.PointerLockControls(camera);
const renderer = new THREE.WebGLRenderer();
const floorClass = new Floor(1000, 1000, scene);
renderer.setPixelRatio(window.devicePixelRatio / 2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

const levelOne = new LevelOne(scene);
levelOne.generateScene();

scene.background = blue;

const lightHem = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(lightHem);

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

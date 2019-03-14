


global.THREE = require('three');
global.GLTFLoader = require('three-gltf-loader');
const Floor = require('./Floor.js');
const InsideWallsMaze = require('./InsideWallsMaze.js');
const Map = require('./Map.js');
const WallGenerator = require('./WallGenerator.js');
const RecursiveMaze = require('./RecursiveMaze');
const TwoDCanvas = require('./2DCanvas');
const PointerLockControls = require('./PointerLockControls');
const Platform = require('./Platform');
const LevelOne = require('./LevelOne');
/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
let white = new THREE.Color("rgb(255, 255, 255)");
let black = new THREE.Color("rgb(0, 0, 0)");
let yellow = new THREE.Color("rgb(233, 255, 0)");
let green = new THREE.Color("rgb(0,255,0)");
let blue = new THREE.Color("rgb(0,100,255)");
let red = new THREE.Color("rgb(255,0,0)");

let startScreenBool = true;

// https://www.html5rocks.com/en/tutorials/pointerlock/intro/

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 750);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio / 2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.PointerLockControls(camera);
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
instructions.addEventListener('click', function () {
  controls.lock();
}, false);
controls.addEventListener('lock', function () {
  instructions.style.display = 'none';
  blocker.style.display = 'none';
});
controls.addEventListener('unlock', function () {
  blocker.style.display = 'block';
  instructions.style.display = '';
});
scene.add(controls.getObject());


let levelOne = new LevelOne(scene);
levelOne.generateScene();
// way to make a basic cube with a 1,1,1 size and the color 0x00ff00, but I made some colors on the top like green or white
/*
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.y = 10;
*/

scene.background = blue;

//lighting
// let lightDir = new THREE.DirectionalLight(0xffffff, 0.3);
// lightDir.position.set(500, 500, 500).normalize();
// scene.add(lightDir);

let lightHem = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(lightHem);
//---------

//camera starting position
camera.position.z = 25;
camera.position.y = 100;
camera.position.x = 5;



//the booleans for moving
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let time;
let delta;
let prevTime = performance.now();
let velocity = new THREE.Vector3();

let jumping = false;
let goingDown = false;

let controlsEnabled;

let geometryPlayer = new THREE.BoxGeometry(10, 40, 10);
let materialPlayer = new THREE.MeshLambertMaterial({ color: new THREE.Color("rgb(255, 255, 255)") });
let Player = new THREE.Mesh(geometryPlayer, materialPlayer);
scene.add(Player);
Player.position.x = 0;
Player.position.y = 100;
Player.position.z = 0;

let ray = new THREE.Ray();

//animate is like gameloop we could probably use setInverval if we wanted to E.X setInterval(animate, 33);
let animate = function () {
  //console.log("animate");
  requestAnimationFrame(animate);
  if (controls.isLocked === true) {
    let time = performance.now();
    let delta = (time - prevTime) / 1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    if (moveForward) {
      velocity.z -= 1200.0 * delta;
    };
    if (moveBackward) {
      velocity.z += 1200.0 * delta;
    };
    if (moveLeft) {
      velocity.x -= 1200.0 * delta;

    };
    if (moveRight) {
      velocity.x += 1200.0 * delta;
    };

    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateY(velocity.y * delta);
    controls.getObject().translateZ(velocity.z * delta);
    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;
      canJump = true;
    }
    if (jumping) {
      camera.position.y += 2;
    }
    if (goingDown) {
      camera.position.y -= 2;
    }
    prevTime = time;
  }
  renderer.render(scene, camera);
};

let counterForStart = 0;
camera.rotation.y = 0;
let first = true;
function startScreen() {
  if (controls.isLocked == false) {
    first = true;
    counterForStart++;
    requestAnimationFrame(startScreen);
    camera.rotation.y += ((Math.PI * 2) / 1000);
    camera.rotation.x = 0;
    camera.rotation.z = 0;
    renderer.render(scene, camera);
  } else {
    if (first) {
      first = false;
      camera.rotation.x = 0;
      camera.rotation.y = 0;
      camera.rotation.z = 0;
    }
  }
}

startScreen();
animate(); //to start loop

document.addEventListener("keydown", event => {
  //if we use arrow keys this will prevent them froming scroling the page down
  if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
    event.preventDefault();
  }
  switch (event.keyCode) {
    case 87:
      moveForward = true;
      break;
    case 83:
      moveBackward = true;
      break;
    case 65:
      moveLeft = true;
      break;
    case 68:
      moveRight = true;
      break;
    case 32:
      jumping = true;
      break;
    case 16:
      goingDown = true;
      break;
  }
});
document.addEventListener("keyup", event => {
  //alert(event.keyCode);
  switch (event.keyCode) {
    case 87:
      moveForward = false;
      break;
    case 83:
      moveBackward = false;
      break;
    case 65:
      moveLeft = false;
      break;
    case 68:
      moveRight = false;
      break;
    case 32:
      jumping = false;
      break;
    case 16:
      goingDown = false;
      break;
  }
});

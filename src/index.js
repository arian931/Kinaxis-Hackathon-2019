/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
global.THREE = require('three');
global.GLTFLoader = require('three-gltf-loader');

require('./2DCanvas');
require('./3DControls');
const LevelOne = require('./LevelOne');

const white = new THREE.Color('rgb(255, 255, 255)');
// const black = new THREE.Color("rgb(0, 0, 0)");
// const yellow = new THREE.Color("rgb(233, 255, 0)");
// const green = new THREE.Color("rgb(0,255,0)");
// const blue = new THREE.Color('rgb(0,100,255)');
// const red = new THREE.Color("rgb(255,0,0)");

const scene = new THREE.Scene();
scene.background = white;
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
const controls = new THREE.PointerLockControls(camera);
const renderer = new THREE.WebGLRenderer();

let isPlaying = false;

const bottomRaycaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  20,
);
// const topRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 2);
renderer.setPixelRatio(window.devicePixelRatio / 2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// the booleans for moving
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let time;
let delta;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');

instructions.addEventListener(
  'click',
  () => {
    controls.lock();
  },
  false,
);
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
  if (isPlaying) {
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
      case 32: // space
        if (canJump) velocity.y += 300;
        canJump = false;
        break;
      case 76:
        // eslint-disable-next-line no-use-before-define
        switchBackToTwoD();
        break;
      default:
        break;
    }
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

// const floorClass = new Floor(1000, 1000, scene);
// floorClass.addToScene();
const sizeOfPlatforms = 30;
const sizeOfJump = sizeOfPlatforms / 2 + 50;
console.log(`${sizeOfJump} Size Of Jump`);
const levelOne = new LevelOne(
  scene,
  renderer,
  camera,
  sizeOfJump,
  sizeOfPlatforms,
  5,
  switchBackToTwoD,
);
let gameLoopOne;

scene.background = white;
const lightHem = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(lightHem);

loader.load(
  '../Art/3D/player_arm.glb',
  (gltf) => {
    // called when the resource is loaded
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    camera.add(gltf.scene);
    gltf.scene.rotateY(Math.PI / 2);
    gltf.scene.position.set(5, -8, -7);
  },
  (xhr) => {
    // called while loading is progressing
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  (error) => {
    // called when loading has errors
    console.error('An error happened', error);
  },
);

const geometry = new THREE.BoxGeometry(10, 30, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(geometry, material);
camera.add(player);

// animate is like gameloop we could probably use setInverval if we wanted to E.X setInterval(animate, 33);
const animate = () => {
  if (isPlaying) {
    requestAnimationFrame(animate);
    if (controls.isLocked) {
      const position = new THREE.Vector3().setFromMatrixPosition(player.matrixWorld);
      // console.log();
      bottomRaycaster.ray.origin.copy(position);
      // // bottomRaycaster.ray.origin.y -= 10;
      // topRaycaster.ray.origin.copy(position);
      const platforms = levelOne.platFormsClass.map(x => x.cubeFor);
      const collectibles = levelOne.collectibles.map(x => x.cubeFor);
      const bottomIntersections = bottomRaycaster.intersectObjects(platforms);
      // const topIntersections = topRaycaster.intersectObjects(platforms);
      // const onObject = ;
      // console.log(bottomIntersections.length);
      // const headHit = topIntersections.length > 0;
      time = performance.now();
      delta = (time - prevTime) / 1000;
      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveLeft) - Number(moveRight);
      direction.normalize(); // this ensures consistent movements in all directions
      if (moveForward || moveBackward) velocity.z -= direction.z * 1000.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 1000.0 * delta;
      if (bottomIntersections.length > 0) {
        velocity.y = Math.max(0, velocity.y);
        // controls.getObject().position.set(0, bottomIntersections[0].y + 10, 0);
        canJump = true;
      }
      // if (headHit && velocity.y > 0) velocity.y = 0;
      for (let vertexIndex = 0; vertexIndex < player.geometry.vertices.length; vertexIndex++) {
        const localVertex = player.geometry.vertices[vertexIndex].clone();
        const globalVertex = localVertex.applyMatrix4(player.matrixWorld);
        const directionVector = globalVertex.sub(position);
        const ray = new THREE.Raycaster(
          position,
          directionVector.clone().normalize(),
          0,
          directionVector.length(),
        );
        const collisionResults = ray.intersectObjects(collectibles);
        if (collisionResults.length > 0) {
          // a collision occurred... do something...
          const { position } = collisionResults[0].object;
          levelOne.collectibleCollision(position.x, position.y, position.z);
          console.log('collision');
        }
      }
      controls.getObject().translateX(velocity.x * delta);
      controls.getObject().translateY(velocity.y * delta);
      controls.getObject().translateZ(velocity.z * delta);
      if (
        bottomIntersections.length > 0
        && position.y < bottomIntersections[0].object.position.y + 20
      ) {
        controls.getObject().position.y = bottomIntersections[0].object.position.y + 20;
        // controls.getObject().position.set(position.x, bottomIntersections[0].object.y + 10, position.z);
      }
      if (position.y < -50) {
        // velocity.y = 0;
        controls
          .getObject()
          .position.set(levelOne.spawnPointX, levelOne.spawnPointY, levelOne.spawnPointZ);
        // canJump = true;
      }
      prevTime = time;
    }
    renderer.render(scene, camera);
  }
};
animate(); // to start loop
let timeLeft = 100;

// const scoreTimer = document.getElementById('scoreAndTimer3d');
const canvas = document.getElementById('scoreTimer'); // gets the canvas I want to use
const ctx = canvas.getContext('2d'); // makes it so anything ctx. will appear on the canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const image = new Image();
image.id = 'pic';
let forTimer = 0;
const timer = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  forTimer++;
  if (forTimer == 10) {
    forTimer = 0;
    timeLeft -= 1;
    if (timeLeft <= 0) {
      console.log('TIME LEFT IS ZERO GO BACK TO THE 2D Cavnas');
      switchBackToTwoD();
    }
  }
  ctx.font = '75px TimesNewRoman';
  ctx.fillStyle = 'black';
  ctx.fillText(timeLeft, canvas.width / 2 - 10, 100);
  ctx.fillStyle = 'white';
  ctx.fillText(levelOne.score, canvas.width - 100, canvas.height - 10);
  image.src = canvas.toDataURL();
  image.src = canvas.toDataURL();
  document.getElementById('scoreAndTimer3d').appendChild(image);
};
// setInterval(timer, 100);
const TwoCanvas = document.getElementById('backgroundCanvas');
function checkFor3dTransation() {
  if (TwoCanvas.style.display == 'none') {
    isPlaying = true;
    timeLeft = 100;
    clearInterval(checkingThree);
    console.log('running');
    levelOne.generateScene();
    clearInterval(gameLoopOne);
    animate();
  }
}
let checkingThree = setInterval(checkFor3dTransation, 100);

function switchBackToTwoD() {
  TwoCanvas.style.display = 'block';
  isPlaying = false;
  console.log(
    'switch back to 2d !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
  );
  checkingThree = setInterval(checkFor3dTransation, 100);
  clearScene();
}
function clearScene() {
  levelOne.clearObjects();
}

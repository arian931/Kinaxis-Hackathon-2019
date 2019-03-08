global.THREE = require('three');
global.GLTFLoader = require('three-gltf-loader');
const Floor = require('./Floor.js');
const InsideWallsMaze = require('./InsideWallsMaze.js');
const Map = require('./Map.js');
const WallGenerator = require('./WallGenerator.js');
const Door = require('./Door.js');
const RecursiveMaze = require('./RecursiveMaze');

/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

THREE.PointerLockControls = function (camera, domElement) {

  var scope = this;

  this.domElement = domElement || document.body;
  this.isLocked = false;

  camera.rotation.set(0, 0, 0);

  var pitchObject = new THREE.Object3D();
  pitchObject.add(camera);

  var yawObject = new THREE.Object3D();
  yawObject.position.y = 10;
  yawObject.add(pitchObject);

  var PI_2 = Math.PI / 2;

  function onMouseMove(event) {

    if (scope.isLocked === false) return;

    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(- PI_2, Math.min(PI_2, pitchObject.rotation.x));

  }

  function onPointerlockChange() {

    if (document.pointerLockElement === scope.domElement) {

      scope.dispatchEvent({ type: 'lock' });

      scope.isLocked = true;

    } else {

      scope.dispatchEvent({ type: 'unlock' });

      scope.isLocked = false;

    }

  }

  function onPointerlockError() {

    console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');

  }

  this.connect = function () {

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('pointerlockchange', onPointerlockChange, false);
    document.addEventListener('pointerlockerror', onPointerlockError, false);

  };

  this.disconnect = function () {

    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('pointerlockchange', onPointerlockChange, false);
    document.removeEventListener('pointerlockerror', onPointerlockError, false);

  };

  this.dispose = function () {

    this.disconnect();

  };

  this.getObject = function () {

    return yawObject;

  };

  this.getDirection = function () {

    // assumes the camera itself is not rotated

    var direction = new THREE.Vector3(0, 0, - 1);
    var rotation = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (v) {

      rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);

      v.copy(direction).applyEuler(rotation);

      return v;

    };

  }();

  this.lock = function () {

    this.domElement.requestPointerLock();

  };

  this.unlock = function () {

    document.exitPointerLock();

  };

  this.connect();

};

THREE.PointerLockControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.PointerLockControls.prototype.constructor = THREE.PointerLockControls;


var white = new THREE.Color("rgb(255, 255, 255)");
var black = new THREE.Color("rgb(0, 0, 0)");
var yellow = new THREE.Color("rgb(233, 255, 0)");
var green = new THREE.Color("rgb(0,255,0)");
var blue = new THREE.Color("rgb(0,100,255)");
var red = new THREE.Color("rgb(255,0,0)");

let startScreenBool = true;

//controls button and explanation
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
// https://www.html5rocks.com/en/tutorials/pointerlock/intro/

//CONTROLS BOILER PLATE ---------------------------------------------------------------------
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if (havePointerLock) {
  var element = document.body;
  var pointerlockchange = function (event) {
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      controlsEnabled = true;
      controls.enabled = true;
      startScreenBool = false;
      blocker.style.display = 'none';
      startScreen();
    } else {
      controls.enabled = false;
      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';
      instructions.style.display = '';
    }
  };
  var pointerlockerror = function (event) {
    instructions.style.display = '';
  };
  // Hook pointer lock state change events
  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
  document.addEventListener('pointerlockerror', pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
  instructions.addEventListener('click', function (event) {
    instructions.style.display = 'none';
    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    if (/Firefox/i.test(navigator.userAgent)) {
      var fullscreenchange = function (event) {
        if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
          document.removeEventListener('fullscreenchange', fullscreenchange);
          document.removeEventListener('mozfullscreenchange', fullscreenchange);
          element.requestPointerLock();
        }
      };
      document.addEventListener('fullscreenchange', fullscreenchange, false);
      document.addEventListener('mozfullscreenchange', fullscreenchange, false);
      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
      element.requestFullscreen();
    } else {
      element.requestPointerLock();
    }
  }, false);
} else {
  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}
//------------------------------------------------------------------------------------------



var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 750);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);

controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());

var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio / 2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let floorClass = new Floor(1000, 1000, scene);
floorClass.addToScene();

//outer wall generation
var walls = [];
walls[0] = new WallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, scene, 0);
walls[1] = new WallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, scene, 0);
walls[2] = new WallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, white, scene, (-Math.PI / 2));
walls[3] = new WallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, white, scene, (-Math.PI / 2));
for (var x = 0; x < walls.length; x++) {
  walls[x].addToScene();
}
//-------------------------

//wall genertion
var InsideWallsNumberArray;
var InsideWalls = [];

var huntAndKill = true;
if (huntAndKill) {
  var mapAlgo = new Map();
  mapAlgo.drawMap();
  InsideWallsNumberArray = mapAlgo.array;
} else {
  var mapAlgo = new RecursiveMaze();
  mapAlgo.drawMap();
  InsideWallsNumberArray = mapAlgo.array;
  console.log(InsideWallsNumberArray);
}
for (var x = 0; x < mapAlgo.MazeSize; x++) {
  for (var y = 0; y < mapAlgo.MazeSize; y++) {
    InsideWalls[x] = [];
  }
}

for (var ro = 0; ro < mapAlgo.MazeSize; ro++) {
  for (var co = 0; co < mapAlgo.MazeSize; co++) {
    if (InsideWallsNumberArray[ro][co] == 1) {
      console.log("1");
      let xValue = (ro * floorClass.w / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.w / mapAlgo.MazeSize) / 2);
      let zValue = (co * floorClass.h / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.h / mapAlgo.MazeSize) / 2);
      InsideWalls[ro][co] = new InsideWallsMaze(xValue, zValue, (floorClass.w / mapAlgo.MazeSize), false, scene);
      InsideWalls[ro][co].addToScene();
    }
    if (InsideWallsNumberArray[ro][co] == 3) {
      console.log("3");
      let xValue = (ro * floorClass.w / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.w / mapAlgo.MazeSize) / 2);
      let zValue = (co * floorClass.h / mapAlgo.MazeSize) - (floorClass.w / 2) + ((floorClass.h / mapAlgo.MazeSize) / 2);
      InsideWalls[ro][co] = new InsideWallsMaze(xValue, zValue, (floorClass.w / mapAlgo.MazeSize), true, scene);
      InsideWalls[ro][co].addToScene();
    }
  }
}



// way to make a basic cube with a 1,1,1 size and the color 0x00ff00, but I made some colors on the top like green or white
/*
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.y = 10;
*/

scene.background = blue;

//lighting
// var lightDir = new THREE.DirectionalLight(0xffffff, 0.3);
// lightDir.position.set(500, 500, 500).normalize();
// scene.add(lightDir);

var lightHem = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(lightHem);
//---------

//camera starting position
camera.position.z = 25;
camera.position.y = 100;
camera.position.x = 5;



//the booleans for moving
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var time;
var delta;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

var jumping = false;
var goingDown = false;

var controlsEnabled;

var geometryPlayer = new THREE.BoxGeometry(10, 40, 10);
var materialPlayer = new THREE.MeshLambertMaterial({ color: new THREE.Color("rgb(255, 255, 255)") });
var Player = new THREE.Mesh(geometryPlayer, materialPlayer);
scene.add(Player);
Player.position.x = 0;
Player.position.y = 100;
Player.position.z = 0;

var ray = new THREE.Ray();

//animate is like gameloop we could probably use setInverval if we wanted to E.X setInterval(animate, 33);
var animate = function () {
  requestAnimationFrame(animate);
  if (controlsEnabled) {
    var time = performance.now();
    var delta = (time - prevTime) / 1000;
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
    // for (var vertexIndex = 0; vertexIndex < Player.geometry.vertices.length; vertexIndex++) {
    //     var localVertex = Player.geometry.vertices[vertexIndex].clone();
    //     var globalVertex = Player.matrix.multiplyVector3(localVertex);
    //     var directionVector = globalVertex.sub(Player.position);

    //     var ray = new THREE.Ray(Player.position, directionVector.clone().normalize());
    //     var collisionResults = ray.intersectObjects(scene.children);
    //     if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
    //         console.log("Collided");
    //     }
    // }
  }
  renderer.render(scene, camera);
};

let counterForStart = 0;
camera.rotation.y = 0;
function startScreen() {
  if (counterForStart != 1000) {
    counterForStart++;
    requestAnimationFrame(startScreen);
    counterForStart
    camera.rotation.y += ((Math.PI * 2) / 1000);
    renderer.render(scene, camera);
  } else {

    animate();
  }
}
blocker.style.display = 'none';
startScreen();
//animate(); //to start loop

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

// var canvas = document.getElementById("myCanvas");
// canvas.addEventListener("webglcontextlost", function (event) {
//     event.preventDefault();
//     var error = gl.getError();
//     if (error != gl.NO_ERROR && error != gl.CONTEXT_LOST_WEBGL) {
//         alert("fail");
//     }
// }, false);

// canvas.addEventListener(
//     "webglcontextrestored", setupWebGLStateAndResources, false);

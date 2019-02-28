var white = new THREE.Color("rgb(255, 255, 255)");
var yellow = new THREE.Color("rgb(233, 255, 0)");
var green = new THREE.Color("rgb(0,255,0)");
var blue = new THREE.Color("rgb(0,100,255)");

var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');

// https://www.html5rocks.com/en/tutorials/pointerlock/intro/
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if (havePointerLock) {
    var element = document.body;
    var pointerlockchange = function (event) {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controlsEnabled = true;
            controls.enabled = true;
            blocker.style.display = 'none';
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


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometryFloor = new THREE.PlaneBufferGeometry(200, 200);
geometryFloor.rotateX((-Math.PI) / 2);
var material = new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometryFloor, material);
scene.add(plane);

var cubesToCollect = [];

cubesToCollect[0] = new wallGenerator(100, 50, 0, 1, 100, 200, white, scene, cubesToCollect, x, 0);
cubesToCollect[1] = new wallGenerator(-100, 50, 0, 1, 100, 200, white, scene, cubesToCollect, x, 0);
cubesToCollect[2] = new wallGenerator(0, 50, 100, 1, 100, 200, white, scene, cubesToCollect, x, (-Math.PI / 2));
cubesToCollect[3] = new wallGenerator(0, 50, -100, 1, 100, 200, white, scene, cubesToCollect, x, (-Math.PI / 2));
cubesToCollect[4] = new wallGenerator(-25, 10, 0, 1, 1, 1, yellow, scene, cubesToCollect, x, 0);

for (var x = 0; x < cubesToCollect.length; x++) {
    cubesToCollect[x].addToScene();
}



var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.y = 10;

scene.background = blue;

var lightDir = new THREE.DirectionalLight(0xffffff, 0.3);
lightDir.position.set(500, 500, 500).normalize();
scene.add(lightDir);

var lightHem = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(lightHem);

camera.position.z = 25;
camera.position.y = 10;
camera.position.x = 5;

var cameraXSpeedRotaion = 0;
var cameraXSpeedRotaionMax = 0.01;

var cameraYSpeedRotaion = 0;
var cameraYSpeedRotaionMax = 0.01;

var cameraXSpeed = 0;
var cameraXSpeedMax = 0.1;

var cameraZSpeed = 0;
var cameraZSpeedMax = 0.1;

var cubeSpeedX = 0;
var cubeSpeedY = 0;

var cubeMaxSpeed = 0.5;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var time;
var delta;
var prevTime = performance.now();
var velocity = new THREE.Vector3();



var controlsEnabled;

var animate = function () {

    requestAnimationFrame(animate);

    if (controlsEnabled) {
        var time = performance.now();
        var delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;
        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);
        if (controls.getObject().position.y < 10) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }

        prevTime = time;
    }

    camera.position.x += cameraXSpeed;
    camera.position.z += cameraZSpeed;

    camera.rotation.x += cameraXSpeedRotaion * Math.PI;
    camera.rotation.y += cameraYSpeedRotaion * Math.PI;

    renderer.render(scene, camera);
};
function addCube(x, y, color) {
}
function checkCollision() {
    for (var h = 0; h < cubesToCollect.length; h++) {
    }
}

animate();

document.addEventListener("keydown", event => {
    //alert(event.keyCode);
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
        // case 38:
        //     cameraXSpeedRotaion = cameraXSpeedRotaionMax;
        //     break;
        // case 40:
        //     cameraXSpeedRotaion = -cameraXSpeedRotaionMax;
        //     break;
        // case 37:
        //     cameraYSpeedRotaion = cameraYSpeedRotaionMax;
        //     break;
        // case 39:
        //     cameraYSpeedRotaion = -cameraYSpeedRotaionMax;
        //     break;
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
        // case 38:
        //     cameraXSpeedRotaion = 0;
        //     break;
        // case 40:
        //     cameraXSpeedRotaion = 0;
        //     break;
        // case 37:
        //     cameraYSpeedRotaion = 0;
        //     break;
        // case 39:
        //     cameraYSpeedRotaion = 0;
        //     break;
    }
});
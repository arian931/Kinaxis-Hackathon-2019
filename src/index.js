var white = new THREE.Color("rgb(255, 255, 255)");
var black = new THREE.Color("rgb(0, 0, 0)");
var yellow = new THREE.Color("rgb(233, 255, 0)");
var green = new THREE.Color("rgb(0,255,0)");
var blue = new THREE.Color("rgb(0,100,255)");
var red = new THREE.Color("rgb(255,0,0)");

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
//------------------------------------------------------------------------------------------

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let floorClass = new floor(4000, 4000, scene);
floorClass.addToScene();

//outer wall generation
var walls = [];
walls[0] = new wallGenerator(floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, scene, 0);
walls[1] = new wallGenerator(-floorClass.w / 2, 50, 0, 1, 100, floorClass.w, white, scene, 0);
walls[2] = new wallGenerator(0, 50, floorClass.h / 2, 1, 100, floorClass.h, white, scene, (-Math.PI / 2));
walls[3] = new wallGenerator(0, 50, -floorClass.h / 2, 1, 100, floorClass.h, white, scene, (-Math.PI / 2));
for (var x = 0; x < walls.length; x++) {
    walls[x].addToScene();
}
//-------------------------

//wall genertion
var InsideWallsNumberArray;
var InsideWalls = [];
for (var x = 0; x < 100; x++) {
    for (var y = 0; y < 100; y++) {
        InsideWalls[x] = [];
    }
}

var mapAlgo = new map();
mapAlgo.drawMap();
InsideWallsNumberArray = mapAlgo.array;
// for (var f = 0; f < 10000; f++) {
//     if (f % 2 == 0) {
//         InsideWallsNumberArray[f] = 0;
//     } else {
//         InsideWallsNumberArray[f] = 1;
//     }
// }
for (var ro = 0; ro < 100; ro++) {
    for (var co = 0; co < 100; co++) {
        if (InsideWallsNumberArray[ro][co] == 1) {
            let xValue = (ro * floorClass.w / 100) - (floorClass.w / 2) + ((floorClass.w / 100) / 2);
            let zValue = (co * floorClass.h / 100) - (floorClass.w / 2) + ((floorClass.h / 100) / 2);
            InsideWalls[ro][co] = new insideWallsMaze(xValue, zValue, floorClass.w / 100, scene);
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
var lightDir = new THREE.DirectionalLight(0xffffff, 0.3);
lightDir.position.set(500, 500, 500).normalize();
scene.add(lightDir);

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

//animate is like gameloop we could probably use setInverval if we wanted to E.X setInterval(animate, 33);
var animate = function () {
    requestAnimationFrame(animate);

    if (controlsEnabled) {
        var time = performance.now();
        var delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        if (moveForward) velocity.z -= 1200.0 * delta;
        if (moveBackward) velocity.z += 1200.0 * delta;
        if (moveLeft) velocity.x -= 1200.0 * delta;
        if (moveRight) velocity.x += 1200.0 * delta;

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
        case 40:
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
        case 40:
            goingDown = false;
            break;
    }
});
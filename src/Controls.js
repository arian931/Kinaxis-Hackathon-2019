THREE.PointerLockControls = function (camera, domElement) {
    let scope = this;
    this.domElement = domElement || document.body;
    this.isLocked = false;

    camera.rotation.set(0, 0, 0);

    let pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    let yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add(pitchObject);

    let PI_2 = Math.PI / 2;

    function onMouseMove(event) {

        if (scope.isLocked === false) return;

        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

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

        let direction = new THREE.Vector3(0, 0, - 1);
        let rotation = new THREE.Euler(0, 0, 0, 'YXZ');

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



//controls button and explanation
let blocker = document.getElementById('blocker');
let instructions = document.getElementById('instructions');

// https://www.html5rocks.com/en/tutorials/pointerlock/intro/

//CONTROLS BOILER PLATE ---------------------------------------------------------------------
let havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if (havePointerLock) {
    let element = document.body;
    let pointerlockchange = function (event) {
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
    let pointerlockerror = function (event) {
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
            let fullscreenchange = function (event) {
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


let controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());
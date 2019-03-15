module.exports = class Platform {
    constructor(x, z, y, w, d, color, scene, movingVer, movingHor, movingZ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.d = d;
        this.scene = scene;
        this.color = color;
        this.heightOfPlatform = 5;
        this.movingHor = movingHor;
        this.movingVer = movingVer;
        this.movingZ = movingZ;
        this.cubeFor;
        this.movePos = true;
        this.moveRange = 50;
    }

    addToScene() {
        let geometryFor = new THREE.BoxGeometry(this.w, this.heightOfPlatform, this.w);
        let materialFor;
        materialFor = new THREE.MeshLambertMaterial({ color: this.color });
        this.cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(this.cubeFor);
        this.cubeFor.position.x = this.x;
        this.cubeFor.position.y = this.y;
        this.cubeFor.position.z = this.z;
    }

    moveHor() {
        if (this.movePos) {
            if (this.cubeFor.position.x <= this.x + (this.moveRange / 2)) {
                //console.log("moveHor +");
                this.cubeFor.position.x += 1;
            } else {
                //console.log(movePos);
                this.movePos = false;
            }
        } else {
            if (this.cubeFor.position.x >= this.x - (this.moveRange / 2)) {
                //console.log("moveHor -");
                this.cubeFor.position.x -= 1;
            } else {
                this.movePos = true;
            }
        }
    }
    moveVer() {
        if (this.movePos) {
            if (this.cubeFor.position.y <= this.y + this.moveRange) {
                //console.log("moveVer +");
                this.cubeFor.position.y += 1;
            } else {
                //console.log(movePos);
                this.movePos = false;
            }
        } else {
            if (this.cubeFor.position.y >= this.y - this.heightOfPlatform) {
                //console.log("moveVer -");
                this.cubeFor.position.y -= 1;
            } else {
                this.movePos = true;
            }
        }
    }
    moveZ() {
        // console.log("move Z");
        if (this.movePos) {
            if (this.cubeFor.position.z <= this.z + (this.moveRange / 2)) {
                // console.log("moveVer +");
                this.cubeFor.position.z += 1;
            } else {
                //console.log(movePos);
                this.movePos = false;
            }
        } else {
            if (this.cubeFor.position.z >= this.z - (this.moveRange / 2)) {
                // console.log("moveVer -");
                this.cubeFor.position.z -= 1;
            } else {
                this.movePos = true;
            }
        }
    }
};

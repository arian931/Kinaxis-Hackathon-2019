module.exports = class Platform {
    constructor(x, z, y, w, color, scene, movingVer, movingHor) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.scene = scene;
        this.color = color;
        this.heightOfPlatform = 5;
        this.movingHor = movingHor;
        this.movingVer = movingVer;
        this.cubeFor;
        this.movePos = true;
        this.moveRange = 50;
    }

    addToScene() {
        let geometryFor = new THREE.BoxGeometry(this.w, this.heightOfPlatform, this.w);
        let materialFor;
        //  console.log('plat form');
        materialFor = new THREE.MeshLambertMaterial({ color: this.color });
        this.cubeFor = new THREE.Mesh(geometryFor, materialFor);
        console.log(this.scene + " hi");
        this.scene.add(this.cubeFor);
        this.cubeFor.position.x = this.x;
        this.cubeFor.position.y = this.y;
        this.cubeFor.position.z = this.z;
    }

    moveHor() {
        if (this.movePos) {
            if (this.cubeFor.position.x <= this.x + this.moveRange) {
                console.log("moveHor +");
                this.cubeFor.position.x += 1;
            } else {
                //console.log(movePos);
                this.movePos = false;
            }
        } else {
            console.log("boo");
            if (this.cubeFor.position.x >= this.x - this.moveRange) {
                console.log("moveHor -");
                this.cubeFor.position.x -= 1;
            } else {
                this.movePos = true;
            }
        }
    }
};

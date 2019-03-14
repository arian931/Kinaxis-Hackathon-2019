module.exports = class Platform {
    constructor(x, z, y, w, color, scene) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.scene = scene;
        this.color = color;
        this.heightOfPlatform = 10;

    }

    addToScene() {
        let geometryFor = new THREE.BoxGeometry(this.w, this.heightOfPlatform, this.w);
        let materialFor;
        console.log('plat form');
        materialFor = new THREE.MeshLambertMaterial({ color: this.color });
        let cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(cubeFor);
        cubeFor.position.x = this.x;
        cubeFor.position.y = this.y;
        cubeFor.position.z = this.z;
    }
};

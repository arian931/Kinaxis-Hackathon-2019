module.exports = class Collectiable {
    constructor(x, z, y, scene) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.scene = scene;
        this.cubeFor;
    }

    addToScene() {
        let geometryFor = new THREE.BoxGeometry(2, 2, 2);
        let materialFor;
        materialFor = new THREE.MeshLambertMaterial({ color: new THREE.Color("rgb(233, 255, 0)") });
        this.cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(this.cubeFor);
        this.cubeFor.position.x = this.x;
        this.cubeFor.position.y = this.y;
        this.cubeFor.position.z = this.z;
    }
    rotate() {
        this.cubeFor.rotation.x += 0.1;
        this.cubeFor.rotation.y += 0.1;

    }
};

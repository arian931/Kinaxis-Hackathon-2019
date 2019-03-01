class insideWallsMaze {
    constructor(x, z, w, scene) {
        this.x = x;
        this.y = z;
        this.w = w;
        this.z = z;
        this.scene = scene;
        this.color = new THREE.Color("rgb(0, 0, 0)");
    }
    addToScene() {
        var geometryFor = new THREE.BoxGeometry(this.w, 10, this.w);
        var materialFor = new THREE.MeshLambertMaterial({ color: this.color });
        var cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(cubeFor);
        cubeFor.position.x = this.x;
        cubeFor.position.y = 5;
        cubeFor.position.z = this.z;
    }
} 
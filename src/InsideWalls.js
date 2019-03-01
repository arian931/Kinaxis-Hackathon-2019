class insideWallsMaze {
    constructor(x, z, w, scene) {
        this.x = x;
        this.y = z;
        this.w = w;
        this.z = z;
        this.scene = scene;
        this.color = new THREE.Color("rgb(0, 0, 0)");
        this.heightOfWall = 50;
    }
    addToScene() {
        var geometryFor = new THREE.BoxGeometry(this.w, this.heightOfWall, this.w);
        var materialFor = new THREE.MeshLambertMaterial({ color: this.color });
        var cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(cubeFor);
        cubeFor.position.x = this.x;
        cubeFor.position.y = this.heightOfWall / 2;
        cubeFor.position.z = this.z;
    }
} 
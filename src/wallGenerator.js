class wallGenerator {
    constructor(x, y, z, w, h, d, color, scene, rotation) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.d = d;
        this.z = z;
        this.rotation = rotation;
        this.color = color;
        this.scene = scene;
    }
    addToScene() {
        var geometryFor = new THREE.BoxGeometry(this.w, this.h, this.d);
        var materialFor = new THREE.MeshLambertMaterial({ color: this.color });
        var cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(cubeFor);
        cubeFor.position.x = this.x;
        cubeFor.position.y = this.y;
        cubeFor.position.z = this.z;

        cubeFor.rotation.y = this.rotation;
    }
}
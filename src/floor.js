class floor {
    constructor(w, h, scene) {
        this.w = w;
        this.h = h;
        this.scene = scene;
    }
    addToScene() {
        var geometryFloor = new THREE.PlaneBufferGeometry(this.w, this.h);
        geometryFloor.rotateX((-Math.PI) / 2);
        var material = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        var plane = new THREE.Mesh(geometryFloor, material);
        this.scene.add(plane);
    }
}
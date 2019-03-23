module.exports = class Floor {
  constructor(w, h, scene) {
    this.w = w;
    this.h = h;
    this.scene = scene;
  }

  addToScene() {
    const geometryFloor = new THREE.PlaneBufferGeometry(this.w, this.h);
    geometryFloor.rotateX(-Math.PI / 2);
    const texture = new THREE.TextureLoader().load('/src/04muroverde.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    // let material = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometryFloor, material);
    this.scene.add(plane);
  }
};

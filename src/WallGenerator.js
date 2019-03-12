/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

module.exports = class WallGenerator {
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
    const geometryFor = new THREE.BoxGeometry(this.w, this.h, this.d);

    // let texture = new THREE.TextureLoader().load("/src/zo-mur.png");
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(1, 1);
    // let materialFor = new THREE.MeshBasicMaterial({
    //     map: texture
    // });

    const materialFor = new THREE.MeshLambertMaterial({
      color: new THREE.Color('rgb(255, 255, 255)'),
    });
    const cubeFor = new THREE.Mesh(geometryFor, materialFor);
    this.scene.add(cubeFor);
    cubeFor.position.x = this.x;
    cubeFor.position.y = this.y;
    cubeFor.position.z = this.z;

    cubeFor.rotation.y = this.rotation;
  }
};

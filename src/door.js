class door {
    constructor(x, z, w, scene) {
        this.x = x;
        this.y = z;
        this.w = w;
        this.z = z;
        this.scene = scene;
        this.color = new THREE.Color("rgb(0, 0, 0)");
        this.heightOfWall = 50;
        this.endBlock = endBlock;
    }
    addToScene() {
        var geometryFor = new THREE.BoxGeometry(this.w, this.heightOfWall, this.w);

        // var texture = new THREE.TextureLoader().load("/src/05muronero.jpg");
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(0.25, 0.25);
        // var materialFor = new THREE.MeshLambertMaterial({
        //     map: texture
        // });

        let cubeMaterials = [
            new THREE.MeshLambertMaterial({map: new THREE.tex})
        ]

        var materialFor = new THREE.MeshLambertMaterial({ color: this.color });

        var cubeFor = new THREE.Mesh(geometryFor, materialFor);
        this.scene.add(cubeFor);
        cubeFor.position.x = this.x;
        cubeFor.position.y = this.heightOfWall / 2;
        cubeFor.position.z = this.z;
    }
} 
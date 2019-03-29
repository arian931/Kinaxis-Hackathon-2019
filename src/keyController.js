const Key = require('./key');

module.exports = class KeyController {
  // constructor() {
  //   // this.keys = [];
  // }

  spawnKeys(mapArray, gameObjects) {
    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        // Check for ground.
        if (mapArray[x][y] === 0) {
          gameObjects.push(new Key(128, 128));
          return;
        }
      }
    }
  }

}
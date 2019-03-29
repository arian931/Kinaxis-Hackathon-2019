const Key = require('./key');

module.exports = class KeyController {
  // constructor() {
  //   // this.keys = [];
  // }

  spawnKeys(mapArray, gameObjects) {
    const maxSpawnKeys = 3;
    let keysSpawned = 0;
    const chanceMax = 150;
    let chance = chanceMax;
    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        // Check for ground.
        if (mapArray[x][y] === 0) {
          if (Math.floor(Math.random() * chance) !== 0) {
            continue;
          }
          gameObjects.push(new Key(x * 128, y * 128));
          console.log('good');
          keysSpawned++;
          if (keysSpawned === maxSpawnKeys) {
            return;
          }
          chance = chanceMax;
        }
        chance -= 1;
      }
    }
  }

}
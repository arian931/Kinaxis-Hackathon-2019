const Key = require('./key');

module.exports = class KeyController {
  constructor() {
    this.maxSpawnKeys = 3;
  }

  spawnKeys(mapArray, gameObjects) {
    let keysSpawned = 0;
    while (keysSpawned < this.maxSpawnKeys) {
      const randX = Math.floor(Math.random() * (mapArray.length - 1));
      const randY = Math.floor(Math.random() * (mapArray.length - 1));
      if (mapArray[randX][randY] === 0) {
        gameObjects.push(new Key(randX * 128, randY * 128));
        keysSpawned += 1;
      }
    }
    // const chanceMax = 150;
    // let chance = chanceMax;
    // gameObjects.push(new Key(128 * 26, 128 * 27));
    // for (let y = 0; y < mapArray.length; y++) {
    //   for (let x = 0; x < mapArray[y].length; x++) {
    //     // Check for ground.
    //     if (mapArray[x][y] === 0 && x !== 1 && y !== 1) {
    //       if (Math.floor(Math.random() * chance) !== 0) {
    //         continue;
    //       }
    //       if (keysSpawned === this.maxSpawnKeys) {
    //         return;
    //       }
    //       gameObjects.push(new Key(x * 128, y * 128));
    //       keysSpawned++;
    //       chance = chanceMax;
    //     }
    //     chance -= 1;
    //   }
    // }
  }
};

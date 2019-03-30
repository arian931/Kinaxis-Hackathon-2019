const SpikeTrap = require('./spikeTrap');

module.exports = class TrapController {
  constructor() {
    this.chanceMax = 100;
    this.chance = this.chanceMax;
  }

  spawnTraps(mapArray, gameObjects) {
    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        // Check for ground.
        if (mapArray[x][y] === 0) {
          if (Math.floor(Math.random() * this.chance) === 0) {
            gameObjects.push(new SpikeTrap(x * 128, y * 128));
            this.chance = this.chanceMax;
          }
          this.chance--;
        }
      }
    }
  }
}
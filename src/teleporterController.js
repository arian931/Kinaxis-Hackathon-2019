const Teleporter = require('./teleporter');

module.exports = class TeleporterController {
  constructor() {
    this.teleporters = [];
  }

  spawnTeleporters(mazeArray, gameObjects) {
    let randX = Math.floor(Math.random() * (mazeArray.length - 1));
    let randY = Math.floor(Math.random() * (mazeArray.length - 1));
    while (this.teleporters.length < 2) {
      randX = Math.floor(Math.random() * (mazeArray.length - 1));
      randY = Math.floor(Math.random() * (mazeArray.length - 1));
      if (this.teleporters.length === 0) {
        // Teleporter 1.
        if (mazeArray[randX][randY] === 0) {
          const teleporter = new Teleporter(randX * 128, randY * 128);
          this.teleporters.push(teleporter);
          gameObjects.push(teleporter);
        }
      } else {
        // Teleporter 2.
        if (mazeArray[randX][randY] === 0) {
          const teleporter = new Teleporter(randX * 128, randY * 128);
          this.teleporters.push(teleporter);
          gameObjects.push(teleporter);
        }
      }
    }
  }
}
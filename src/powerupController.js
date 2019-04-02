const MapPowerup = require('./mapPowerup');
const WallBreakerPowerup = require('./wallBreakerPowerup');
const SpeedPowerup = require('./speedPowerup');

module.exports = class PowerupController {
  constructor() {
    this.maxMapPowerup = 1;
    this.maxWallBreakerPowerup = 3;
    this.maxSpeedPowerup = 3;
    this.spawned = [];
  }

  spawnPowerups(mapArray, gameObjects) {
    // Array containing coordinates of the items.
    this.spawned = [];
    let mapPowerupSpawned = 0;
    let wallBreakerPowerupSpawned = 0;
    let speedPowerupSpawned = 0;
    let randX;
    let randY;

    // Create the map power up. (Always present).
    while (mapPowerupSpawned < this.maxMapPowerup) {
      randX = Math.floor(Math.random() * (mapArray.length - 1));
      randY = Math.floor(Math.random() * (mapArray.length - 1));
      if (mapArray[randX][randY] === 0) {
        if (this.isPositionEmpty(randX, randY)) {
          gameObjects.push(new MapPowerup(randX * 128, randY * 128));
          this.spawned.push([randX, randY]);
          mapPowerupSpawned += 1;
        }
      }
    }

    // Create the wall break powerup.
    const maxSpawnChance = 200;
    let chance = maxSpawnChance;
    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        if (mapArray[x][y] === 0) {
          if (Math.floor(Math.random() * chance) === 0) {
            if (this.isPositionEmpty(x, y)) {
              gameObjects.push(new WallBreakerPowerup(x * 128, y * 128));
              this.spawned.push([x, y]);
              wallBreakerPowerupSpawned += 1;
              if (wallBreakerPowerupSpawned >= this.maxWallBreakerPowerup) {
                break;
              }
              chance = maxSpawnChance;
            }
          }
          chance -= 1;
        }
      }
      if (wallBreakerPowerupSpawned >= this.maxWallBreakerPowerup) {
        chance = maxSpawnChance;
        break;
      }
    }

    // Create the speed powerup.
    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        if (mapArray[x][y] === 0) {
          if (Math.floor(Math.random() * chance) === 0) {
            if (this.isPositionEmpty(x, y)) {
              gameObjects.push(new SpeedPowerup(x * 128, y * 128));
              this.spawned.push([x, y]);
              speedPowerupSpawned += 1;
              if (speedPowerupSpawned >= this.maxSpeedPowerup) {
                break;
              }
              chance = maxSpawnChance;
            }
          }
          chance -= 1;
        }
      }
      if (speedPowerupSpawned >= this.maxSpeedPowerup) {
        chance = maxSpawnChance;
        break;
      }
    }

    this.spawned = [];
  }

  // Checks a grid coordinate to see if there's a powerup there already.
  isPositionEmpty(x, y) {
    for (let i = 0; i < this.spawned.length; i++) {
      if (this.spawned[i][0] === x && this.spawned[i][1] === y) {
        return false;
      }
    }
    return true;
  }
}
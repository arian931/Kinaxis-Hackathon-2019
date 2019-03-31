const EnemyAnxiety = require('./enemies/enemyAnxiety');
const EnemyBPD = require('./enemies/enemyBPD');
const EnemyDepression = require('./enemies/enemyDepression');

module.exports = class EnemyController {
  constructor() {
    // this.spriteEnemyAnxiety = new Image();
    // this.spriteEnemyAnxiety.src = '../../Art/2D/enemy_anxiety_spritesheet.png';
    // this.spriteEnemyBPD = new Image();
    // this.spriteEnemyBPD.src = '../../Art/2D/enemy_borderline_personality_disorderanxiety_spritesheet.png';
    // this.spriteEnemyDepression = new Image();
    // this.spriteEnemyDepression = '../../Art/2D/enemy_depression_spritesheet.png';
    this.enemies = [];
  }

  // Spawn the enemies randomly.
  spawnEnemies(mapArray, gameObjects) {
    const chanceMax = 2;
    let chance = chanceMax;
    for (let y = 0; y < mapArray.length; y++) {
      for (let x = 0; x < mapArray[y].length; x++) {
        // Check for ground.
        const rand = Math.floor(Math.random() * chance);
        if (mapArray[x][y] === 0) {
          if (rand === 0) {
            switch (Math.floor(Math.random() * 3)) {
              case 0:
                gameObjects.push(new EnemyDepression(
                  x * 128,
                  y * 128,
                  (mapArray[x][y - 1] === 1 && mapArray[x][y + 1] === 1 ? 0 : 1),
                  mapArray
                ));
                break;
              case 1:
                gameObjects.push(new EnemyAnxiety(
                  x * 128,
                  y * 128,
                  (mapArray[x][y - 1] === 1 && mapArray[x][y + 1] === 1 ? 0 : 1),
                  mapArray
                ));
                break;
              case 2:
                gameObjects.push(new EnemyBPD(
                  x * 128,
                  y * 128,
                  (mapArray[x][y - 1] === 1 && mapArray[x][y + 1] === 1 ? 0 : 1),
                  mapArray
                ));
                break;
              default: break;
            }
            // chance = chanceMax;
          }
          chance -= 1;
        }
        if (chance === 0)
          break;
      }
    }
  }
}

const EnemyAnxiety = require('./enemies/enemyAnxiety');

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
  spawnEnemies(mapArray) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        // Check for ground.
        if (mapArray[y][x] === 0) {
          this.enemies.push(new EnemyAnxiety(x * 128, y * 128 - 10));
          console.log('g');
        }
      }
    }
  }
}

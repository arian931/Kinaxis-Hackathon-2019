const Enemy = require('./enemy');

module.exports = class EnemyAnxiety extends Enemy {
  constructor(x, y, dir) {
    super(x, y, dir);
    this.speed = 220;
    this.animationSpeed = 0.18;
    this.sprite.src = '../../Art/2D/enemy_anxiety_spritesheet.png';
    this.animationSize = 3;
  }
};

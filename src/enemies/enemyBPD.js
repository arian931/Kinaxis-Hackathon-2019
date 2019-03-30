const Enemy = require('./enemy');

module.exports = class EnemyBPD extends Enemy {
  constructor(x, y, dir) {
    super(x, y, dir);
    this.speed = 150;
    this.animationSpeed = 0.1;
    this.sprite.src = '../../Art/2D/enemy_borderline_personality_disorder_spritesheet.png';
    this.animationSize = 4;
  }
};

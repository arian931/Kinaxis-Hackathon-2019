const Enemy = require('./enemy');

module.exports = class EnemyDepression extends Enemy {
  constructor(x, y, dir) {
    super(x, y, dir);
    this.speed = 80;
    this.animationSpeed = 0.07;
    this.sprite.src = '../../Art/2D/enemy_depression_spritesheet.png';
    this.animationSize = 4;
  }
};

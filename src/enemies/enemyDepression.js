const Enemy = require('./enemy');

module.exports = class EnemyDepression extends Enemy {
  constructor(x, y, dir, mapArray) {
    super(x, y, dir, mapArray);
    this.speed = 80;
    this.animationSpeed = 0.07;
    this.sprite.src = '../../Art/2D/enemy_depression_spritesheet.png';
    this.animationSize = 4;
  }
};

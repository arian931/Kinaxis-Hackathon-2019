const SpeedBoost = 240;
let main = MainCharacter;
let mainX = MainCharacter.X;
let mainY = MainCharacter.y;
let mainWidth = MainCharacter.width;
let mainHeight = MainCharacter.height;
let mainSpeed = MainCharacter.speed;
// needed to transfer the maincharacter and position and dimisions over from other code in file
// must always be a let var always changing          speedboost is dif
class speedPotion {
  constructor(x, y, w, h, potionArray) {
    this.w = w; // width
    this.h = h; // height
    this.x = x;
    this.y = y;
  }
  draw() {
    for (let i = 0; i < 10; i++) {
      const canvas = document.getElementById("")
      const ctx = canvas.getContext("2d")
      ctx.draw(random(10, 129), random(10, 129), 5, 5)
    }
  }
  update() {
    if (speedPotion.x > MainCharacter.x + MainCharacter.width
      && speedPotion.y + speedPotion.w > MainCharacter.x
      && speedPotion.y > MainCharacter.y + MainCharacter.height
      && speedPotion.y + speedPotion.h > MainCharacter.y) {
      // creates collision / collision detected 
      // overlap created 
      for (let time = 15; time < 15; time++); {
        //boost last for 15 sec
        //check if correct check if the random is right
     // let ; new mainSpeed = SpeedBoost + mainSpeed;  
      }
    }
  }
};


const SpeedBoost = 240;
let speed = 120;
let main = MainCharacter;
let OSpeed = Maincharacter.speed;
class speedpotion {
  constructor(x, y, width, height,potionArray) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.potionArray = potionArray;
  }
  draw() {
    for (let i = 0; i < 10; i++) {
      const canvas = document.getElementById("")
      const ctx = canvas.getContext("2d")
      ctx.draw(random(10, 129), random(10, 129), 5, 5)
    }
  }
  update(){
  this.potionArray = 0//change
  if(this.potionArray) {
    for (let time = 15; time < 15; time++); {
      console.log("A teacher supports you");
      let MainCharacterspeed = SpeedBoost; // got to fix this part 
    }
  }
}
};


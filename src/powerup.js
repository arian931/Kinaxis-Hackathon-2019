const SpeedBoost = 60;
let mainX = MainCharacter.x;
let mainY = MainCharacter.y;
let mainWidth = MainCharacter.width;
let mainHeight = MainCharacter.height;
let mainSpeed = MainCharacter.speed;
let mainSpeed = 120

// needed to transfer the maincharacter and position and dimisions over from other code in file
// must always be a let var always changing          speedboost is dif
class speedPotion {
  constructor(x, y, w, h) {
    this.w = w; // width
    this.h = h; // height
    this.x = x;
    this.y = y;
  }
  draw() {
    for (let i = 0; i < 3; i++) {
      const canvas = document.getElementById('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/143e82e6-43e9-41d1-a990-36b2cee09934/speed_powerup_spritesheet.png?AWSAccessKeyId=ASIAT73L2G45PGEICPEE&Expires=1554160947&Signature=UQ5p80CLK3xuuMaykksoNBf4qM0%3D&response-content-disposition=filename%20%3D%22speed_powerup_spritesheet.png%22&x-amz-security-token=AgoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBwzROXu6RBsth%2F0uJXPhImGbBtqpLRNcaMvgppnBtQXAiADsr9NxN0TPzPd%2FEeUFwyZAcE%2BgIl%2BCj5CHC%2FED2lJTirjAwiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDI3NDU2NzE0OTM3MCIMEctsQuGNNaOh9vwbKrcDxqE4a9ws2h1qF4zRCvDvQrTDJn6rRNBajyOQbebQITQqkUhePdOgfUxnBgj7NALJBfHaa6lczCFUe8KrFgB7cU2y4jcbsIO%2FqDwXa9Qzldr04Tu0thMopXT%2FyIctBlGNRPGeyFLS1fLjfoFAY8oI4R2yNEZyCbuP8zwwv3BS3oHIVCnhXVMglO0kXVqfh7AO%2FRIkfy587vR%2Fgysl5AsOHllFg%2Bm4Z6l3UxExXxxyoKE0R21bbBa3KeugRYIFMVjhc2NIZj640ZVRJy%2BGhcLmPizOb6tNWmVJYVMCxfQsNBVjbJxvhfkpxnxvS%2B9gtYOyXljF6U%2BlvZUrwh8vzYjV9lCxQ23nK0RhFO%2Bv41adJ8pvlJEBonO3V9W%2BQteNTAVvlTc%2BHmP8Wjo%2FBalOdOcXP%2B8tf%2FyniWrQoRTGyQW4B8TjjywRWhhezIdy%2F%2BaMT4umTdBjMYc7WwceVjzo70hzlcL0c04hfigbX%2FbHs1JoKfqTSOUmZyAwn2M6GhTnarQ8wSKTFZkGr8tRNcoqRFJEAtCWY86F4JZMWZrpJbUFnIV8yWN1oR6U%2B%2Bgd89%2FJlDhU%2BXtIePA2MzDugIXlBTq1AUWQiHM4bbkae8hJ5kq2bMgMZSAvpDytKtfH593EPORYZO%2B555I%2FLgaKUEmyDd7Ag%2Fb7DMwO02us%2B431tWaMucyj7O46OXCb%2BDh2TyAgqjKAkB%2FM2kxFGF0z92q1absDhfJWKwRuZk3ekjCSdO7Pe0KUhhst9WHBSNeNggaA6GtYrM%2F7n48xwi4ovhu2onPGVVp4rJyM8mmYySMkhOuBJIbctWUQXdpU6yCdpKFHBso4p6knFk8%3D');
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
        let mainspeed = SpeedBoost + mainspeed;
      }
    }
  }
};

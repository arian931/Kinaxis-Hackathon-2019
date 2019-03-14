// still need to add imgine for the main character and making sure backround is fine and starting place, size,borders
keyPressed = function() {

}

let main = (x,y,speed,size) => {
   this.x = x;
   this.y = y;
   this.speed = speed;
   this.size = size;
   this.update; {
       if(keycode === UP){
           this.y = this.y + this.speed;
       } 
       if(keycode === DOWN){
           this.y = this.y - this.speed;
       }
       if(keycode === RIGHT){
           this.x = this.x + this.speed;
       }
       if(keycode === LEFT){
           this.x = this.x - this.speed;
       };
       // add img
       ellipse(this.x,this.y,this.speed,this.size);
   }
};                     

const main = Main(10,10,10,10) //change later

draw = () => {
    brackround(fixed)
    main.update()
} 

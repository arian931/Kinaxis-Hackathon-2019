// still need to add imgine for the main character 
keyPressed = function() {

}

class main {} (x,y,speed,size) => {
   this.x = x;
   this.y = y;
   this.speed = speed;
   this.size = size;
   this.update; {
       if(keycode === UP||W){
           this.y = this.y + this.speed;
       } 
       if(keycode === DOWN||S){
           this.y = this.y - this.speed;
       }
       if(keycode === RIGHT||D){
           this.x = this.x + this.speed;
       }
       if(keycode === LEFT||A){
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

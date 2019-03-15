class enemy {} (x,y,w,h,speed) => 
    this.x = x;
    this.y = y;
    this.w = w;//width
    this.h = h;//height
    this.speed = (-speed||speed);
    this.update; {
        this.x = this.x + this.speed
        this.x = this.x + this.speed
        //image insert here
        ellipse(this.x,this.y,this.w,this.h,this.speed);
    } 

let enemy = []
for(let i = 0;i<15;i++){
    let enemy = new enemy(random(-10,-10),random(-10,-10),20,20,10)
}
 
const create = () => {
    for(let i = 0;i<enemy;i++)
    enemy[i].update
};

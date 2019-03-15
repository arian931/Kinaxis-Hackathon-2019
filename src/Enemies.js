class enemie = (x,y,w,h,speed) => 
    this.x = x;
    this.y = y;
    this.w = w;//width
    this.h = h;//height
    this.speed = (-speed||speed);
    this.update; {
        this.x = this.x + this.speed
        //image insert here
        ellipse(this.x,this.y,this.w,this.h,this.speed);
    } 

let enemie = []
for(let i = 0;i<15;i++){
    let enemie = new enemie(random(),random(),20,20,10)
}

const create = () => {
    for(let i = 0;i<enemie;i++)
    enemie[i].update
};

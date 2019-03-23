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
       const canvas = document.getElementById('canvas');
       const ctx = canvas.getContext('2d');
       const image = document.getElementById('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d6e726d6-0552-48cf-ba1c-588de4d64b82/male1_spritesheet.png?AWSAccessKeyId=ASIAT73L2G45DMPYUE5Y&Expires=1553197067&Signature=efxPmMlNWifhlEaTlNcoVOC5www%3D&response-content-disposition=filename%20%3D%22male1_spritesheet.png%22&x-amz-security-token=FQoGZXIvYXdzEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDPHzTI%2Bypj%2FJeqOdYiK3A%2FWCH9NT9YaCUGg6xFvgIT%2BBjeiibUeXEMry491ZQcDXQfjuoGPx6OFioKrv6CF%2BffnP3g2OGIlI9ACYKcdjvS8PJnQ2GC%2BnzfdAnPYkcMiu67KWrWK2mWxuszHXnWKO9FecvCyU%2FIX93CcMMzHbc4PE6Zlv6kDztBT7ZLjt3P74gxfXWu6krNmL9LqnRTqrCQLyKKozXUOb9nM8PmtNnpoy0dCBQA1eLgrv63dKImsiSC1rGd5jTKofRFvSXCOv6gJzHJ3d4HkYjT7lN%2BWeaHjoxvFOuCN07WNo4WNf9ZRsZCwuZ01po6DNt8aF3jXgbv4OSMgKnufP8Zyj9aBN3lFsPgzdUHUIz0f4YYnxr4aswVNhyXlipm98KdtVqh%2BKBA%2BDKoS%2FCMQd1uFghXbZ4xzY9KqjN7ipeSavzwOijMhQjSA948Sk8gwcJU5BEf7ne8ZTir86va06%2B61fqsFzf8xyofKHGlLOujhvkWLUt9FYEY1DJs%2BdCYOFXpErRsXIPziSmvYnDJN%2BGeXdDn%2FKrvohmVKPquCcYTlyN%2BU35VQvHNDFuDZWRrRCP%2BXMQlOQVmG9eE8GHC0o9pvJ5AU%3D');
       ellipse(this.x,this.y,this.speed,this.size);
   }
};                     

const main = Main(10,10,10,10) //change later

draw = () => {
    brackround(fixed)
    main.update()
}

module.exports = class Menu {
  constructor(switchBackTo2D) {
    this.menuMusic = new Audio('./mp3/rain.mp3');
    this.RADIUS = 50;
    this.handleEvent = (e) => {
      switch (e.type) {
        case 'click':
          if (Math.sqrt((e.clientX - canvas.width / 2) * (e.clientX - canvas.width / 2) + (e.clientY - canvas.height / 2) * (e.clientY - canvas.height / 2)) < this.RADIUS) {
            canvas.removeEventListener('mousemove', this);
            canvas.style.cursor = 'auto';
            let timer = 0;
            const circleBigger = setInterval(() => {
              timer += 5;
              ctx.fillStyle = 'white';
              ctx.beginPath();
              ctx.arc(canvas.width / 2, canvas.height / 2, timer, 0, 2 * Math.PI);
              ctx.fill();
              if (timer >= canvas.width / 1.5) {
                clearInterval(circleBigger);
                canvas.removeEventListener('click', this);
                this.menuMusic.pause();
                switchBackTo2D();
                // console.log('test');
              }
            }, 20);
          }
          break;
        case 'mousemove':
          if (Math.sqrt((e.clientX - canvas.width / 2) * (e.clientX - canvas.width / 2) + (e.clientY - canvas.height / 2) * (e.clientY - canvas.height / 2)) < this.RADIUS) {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, this.RADIUS - 1, 0, 2 * Math.PI);
            ctx.fill();
            canvas.style.cursor = 'pointer';
          } else {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, this.RADIUS - 1, 0, 2 * Math.PI);
            ctx.fill();
            canvas.style.cursor = 'auto';
          }
          break;
        default:
          break;
      }
    };
  }


  // handleMouseMove(e) {

  // }

  // handleMouseClick(e) {
  // }

  start() {
    this.menuMusic.play();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText("Let's talk about mental health!", canvas.width / 10, canvas.height / 3);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, this.RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
    canvas.addEventListener('mousemove', this);
    canvas.addEventListener('click', this);
  }
};

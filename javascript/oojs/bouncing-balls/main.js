// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}
  function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
  }
  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;

  }
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < Balls.length; j++) {
      if (!(this === Balls[j])) {
        const dx = this.x - Balls[j].x;
        const dy = this.y - Balls[j].y;
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        
        if (dist < this.size + Balls[j].size) {
          Balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';         
        } 
      }
    }
  }

  let Balls = [];
  while (Balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
      random(0 + size, width - size),
      random(size, height - size),
      random(-7, 7),
      random(-7, 7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    Balls.push(ball);
  }
  function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, width, height);

    for (let i = 0; i < Balls.length; i++) {
      Balls[i].draw();
      Balls[i].update();
      Balls[i].collisionDetect();
    }
  requestAnimationFrame(loop);

  }
  loop();


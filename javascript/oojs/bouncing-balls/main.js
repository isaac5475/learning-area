// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');
para.textContent = 'Score: 0';
let score = 0;
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}
  function Shape(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = 'true';
  }


  function Ball(x, y, velX, velY, color, size) {
    Shape.call(this, x, y, velX, velY);

    this.color = color;
    this.size = size;
  }
  Ball.prototype = Object.create(Shape.prototype);
  Object.defineProperty(Ball.prototype, 'constructor', {
    value: Ball,
    enumerable: false,
    writable: true });

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
      if (!(this === Balls[j]) && Balls[j].exists) {
        const dx = this.x - Balls[j].x;
        const dy = this.y - Balls[j].y;
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        
        if (dist < this.size + Balls[j].size) {
          Balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';         
        } 
      }
    }
  }


function EvilCircle(x, y) {
  Shape.call(this, x, y, 20, 20);
  this.color = 'white';
  this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype, 'constructor', {
  value: EvilCircle,
  enumerable: false,
  writable: true });

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x -= 5*this.size;
  }
  if ((this.x - this.size) <= 0) {
    this.x += 5*this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y += 5*this.size;
  }
  if ((this.y + this.size) >= height) {
    this.y -= 5*this.size;
  }
}
EvilCircle.prototype.setControls = function() {
  let _this = this;
  window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
}
EvilCircle.prototype.collisionDetect = function() {
    for (let j = 0; j < Balls.length; j++) {
      if (Balls[j].exists === 'true') {
        const dx = this.x - Balls[j].x;
        const dy = this.y - Balls[j].y;
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        
        if (dist < this.size + Balls[j].size) {
          Balls[j].exists = "false"; 
          score += 100;
          para.textContent = 'Score: ' + score.toString();        
        } 
      }
    }
  }

  let evCrcl = new EvilCircle(5, 5);
  evCrcl.setControls();

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
    evCrcl.draw();
    evCrcl.checkBounds();
    evCrcl.collisionDetect();
    
    for (let i = 0; i < Balls.length; i++) {
      if (Balls[i].exists === 'true') {
        Balls[i].draw();
        Balls[i].update();
        Balls[i].collisionDetect();
      }
    }
  requestAnimationFrame(loop);

  }
  loop();


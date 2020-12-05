class GameFour {
  constructor(data) {
    this.data = data
    this.stopSwitch = false
    this.k
    this.gridFour = []
    this.dir = []
    this.coins = []
    this.xDirFour = []
    this.yDirFour = []
    this.circles = []
    this.plusX = 500
    this.plusY = 300
    this.circles[0] = createVector(this.plusX+50, random(350, 600), 20);
    this.circles[1] = createVector(this.plusX+70, random(350, 600), 20);
    this.circles[2] = createVector(this.plusX+150, random(350, 600), 20);
    this.circles[3] = createVector(this.plusX+120, random(350, 600), 20);
    this.circleSpdFour = 2
    this.rectSizeFour = 20;
    this.spd = 1
    this.minusX = this.plusX/20.43668122
    this.minusY = this.plusY/20.689655172413
    this.player = createVector(this.plusX+20, 360, 15)
    this.rad = this.player.z/2
    this.gridFour[0] = [5, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    this.gridFour[1] = [5, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5]
    this.gridFour[2] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[3] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[4] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[5] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[6] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[7] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[8] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[9] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[10] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[11] = [5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 5]
    this.gridFour[12] = [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 5]
    this.gridFour[13] = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 5]

    for(let i=0; i<4; i++){
      this.xDirFour[i] = random([-1, 1]);
      this.yDirFour[i] = random([-1, 1]);
    }  
  }

  update() {
    if(this.stopSwitch == false){
      this.movement();
      this.collisionFour();
      this.display()
      this.stageFourCircles()    
      this.hitFour()
    }
  }

  display() {
    background(153, 153, 255);
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 20; j++) {
        if (this.gridFour[i][j] == 1) {
          fill(255);
        } else if (this.gridFour[i][j] == 2) {
          fill(10, 10, 10);
        } else if (this.gridFour[i][j] == 3) {
          fill(50, 255, 80);
        } else if (this.gridFour[i][j] == 4) {
          fill(50, 255, 80);
        } else if (this.gridFour[i][j] == 5) {
          fill(153, 153, 255);
        }
        noStroke();
        rect(i * this.rectSizeFour + this.plusX, j * this.rectSizeFour + this.plusY, this.rectSizeFour, this.rectSizeFour);

        this.k = this.gridFour[int(floor((this.player.x) / this.rectSizeFour - this.minusX))][int(floor((this.player.y) / this.rectSizeFour - this.minusY))];
        if (this.k == 4) {
          socket.emit("GameFourWon", this.data)
          this.stopSwitch = true
        }
      }
    }
    fill(15, 15, 200);
    stroke(0, 255);
    strokeWeight(2);
    rect(this.player.x, this.player.y, this.player.z, this.player.z);
  }

  collisionFour() {  // Checking Collision with the wall
    if (this.dir[0]) {
      if (this.gridFour[int(floor((this.player.x + this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y - this.rad) / this.rectSizeFour - this.minusY))] == 2 ||
        this.gridFour[int(floor((this.player.x - this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y - this.rad) / this.rectSizeFour - this.minusY))] == 2) {
          this.player.y += this.spd;
      }
    }

    if (this.dir[1]) {
      if (this.gridFour[int(floor((this.player.x + this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y +this.rad) / this.rectSizeFour - this.minusY))] == 2 ||
      this.gridFour[int(floor((this.player.x - this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y + this.rad) / this.rectSizeFour - this.minusY))] == 2) {
        this.player.y -= this.spd;
      }
    }

    if (this.dir[2]) {
      if (this.gridFour[int(floor((this.player.x + this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y - this.rad) / this.rectSizeFour - this.minusY))] == 2 ||
      this.gridFour[int(floor((this.player.x +this. rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y + this.rad) / this.rectSizeFour - this.minusY))] == 2) {
        this.player.x -= this.spd;
      }
    }

    if (this.dir[3]) {
      if (this.gridFour[int(floor((this.player.x - this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y - this.rad) / this.rectSizeFour - this.minusY))] == 2 ||
      this.gridFour[int(floor((this.player.x - this.rad) / this.rectSizeFour - this.minusX))][int(floor((this.player.y + this.rad) / this.rectSizeFour - this.minusY))] == 2) {
        this.player.x += this.spd;
      }
    }
  }
  hitFour() {  // The Hitbox
    for (let i = 0; i < 4; i++) {
      if (p5.Vector.dist(this.player, this.circles[i]) < 25) {
        socket.emit("GameFourLost", this.data)
        console.log("hello")
        this.stopSwitch = true
        break
      }            
    }
  }
  stageFourCircles() { // The enemy Circles
    stroke(0, 255);
    strokeWeight(2);
    fill(255, 15, 15);
  
    ellipse(this.circles[0].x, this.circles[0].y, this.circles[0].z, this.circles[0].z);  
    this.circles[0].x += this.circleSpdFour*this.xDirFour[0];
    this.circles[0].y += this.circleSpdFour*this.yDirFour[0];
    if (this.circles[0].x < this.plusX + 50 || this.circles[0].x > this.plusX + 220) this.xDirFour[0] *= -1;
    if (this.circles[0].y < this.plusY + 40 || this.circles[0].y > this.plusY + 340) this.yDirFour[0] *= -1;
  
    ellipse(this.circles[1].x, this.circles[1].y, this.circles[1].z, this.circles[1].z);  
    this.circles[1].x += this.circleSpdFour*this.xDirFour[1];
    this.circles[1].y += this.circleSpdFour*this.yDirFour[1];
    if (this.circles[1].x < this.plusX + 50 || this.circles[1].x > this.plusX + 220) this.xDirFour[1] *= -1;
    if (this.circles[1].y < this.plusY + 40|| this.circles[1].y > this.plusY + 340) this.yDirFour[1] *= -1;
  
    ellipse(this.circles[2].x, this.circles[2].y, this.circles[2].z, this.circles[2].z);  
    this.circles[2].x += this.circleSpdFour*this.xDirFour[2];
    this.circles[2].y += this.circleSpdFour*this.yDirFour[2];
    if (this.circles[2].x < this.plusX + 50  || this.circles[2].x > this.plusX + 220) this.xDirFour[2] *= -1;
    if (this.circles[2].y < this.plusY + 40 || this.circles[2].y > this.plusY + 340) this.yDirFour[2] *= -1;
  
    ellipse(this.circles[3].x, this.circles[3].y, this.circles[3].z, this.circles[3].z);  
    this.circles[3].x += this.circleSpdFour*this.xDirFour[3];
    this.circles[3].y += this.circleSpdFour*this.yDirFour[3];
    if (this.circles[3].x < this.plusX + 50 || this.circles[3].x > this.plusX + 220) this.xDirFour[3] *= -1;
    if (this.circles[3].y < this.plusY + 40 || this.circles[3].y > this.plusY+ 340) this.yDirFour[3] *= -1;
  }
  
  movement() {
    if (this.dir[0]) this.player.y -= this.spd;  //up
    if (this.dir[1]) this.player.y += this.spd;  //down
    if (this.dir[2]) this.player.x += this.spd;  //right 
    if (this.dir[3]) this.player.x -= this.spd;  //left  
  }
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
      gFour.dir[0] = true;
    }
    if (keyCode == DOWN_ARROW) {
      gFour.dir[1] = true;
    }
    if (keyCode == RIGHT_ARROW) {
      gFour.dir[2] = true;
    }
    if (keyCode == LEFT_ARROW) {
      gFour.dir[3] = true;
    }
}
function keyReleased() {
    if (keyCode == UP_ARROW) {
      gFour.dir[0] = false;
    }
    if (keyCode == DOWN_ARROW) {
      gFour.dir[1] = false;
    }
    if (keyCode == RIGHT_ARROW) {
      gFour.dir[2] = false;
    }
    if (keyCode == LEFT_ARROW) {
      gFour.dir[3] = false;
    }
  
}
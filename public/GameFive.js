class GameFive {
  constructor(data) {
    this.stopSwitch = false
    this.data = data
    this.timerValue = 1
    this.timerValue2 = 7
    this.randomNum = data.randomNum
    this.selection = -1
    this.rectSize = 80
    this.spacing = 120
    this.shift = window.innerWidth / 4.5
    this.y = window.innerHeight / 2
  }

  update() {
    if(this.stopSwitch == false){
      this.timer()
      this.display()
    }
  }

  display() {
    if (this.timerValue == 0) {
      background(255)
      if (frameCount % 60 == 0 && this.timerValue2 > 0) {
        this.timerValue2--;
      }
      console.log(this.randomNum)
      for (let i = 0; i < 10; i++) {
        if (mouseX > i * this.spacing + this.shift - this.rectSize / 2 && mouseX < i * this.spacing + this.shift + this.rectSize / 2 && mouseY > this.y - this.rectSize / 2 && mouseY < this.y + this.rectSize / 2) {
          this.selection = i + 1
          fill(150, 150, 150);
        }
        strokeCap(ROUND);
        stroke(100 - 40, 100 - 40, 100 - 40)
        strokeWeight(10)
        rect(i * this.spacing + this.shift, this.y, this.rectSize, this.rectSize, 10);
        stroke(255)
        textStyle(BOLD);
        strokeWeight(4)
        fill(50, 50, 50)
        textSize(50)
        text(i + 1, i * this.spacing + this.shift, this.y + 5);
        noFill()
        noStroke()
      }
      stroke(50)
      textStyle(BOLD);
      strokeWeight(7)
      fill(255)
      textSize(100)
      text("Selection ends in : " + this.timerValue2, window.innerWidth / 2, window.innerHeight / 2 - 300)
      if (this.timerValue2 == 0) {
        fill(234, 72, 60);
        if (this.selection == this.randomNum) {
          socket.emit("GameFiveWon", this.data)
          this.stopSwitch = true
        }
        else {
          this.timerValue = 2
          this.timerValue2 = 4
        }
      }
    }
  }
  timer() {
    background(255)
    textStyle(BOLD);
    stroke(50)
    strokeWeight(7)
    fill(255)
    textSize(50)
    text("Hover your mouse over a Number From 1 to 10 in", window.innerWidth / 2, window.innerHeight / 2 - 300)
    textSize(400)
    text(this.timerValue, window.innerWidth / 2, window.innerHeight / 2)
    if (frameCount % 60 == 0 && this.timerValue > 0) {
      this.timerValue--;
    }
  }
}
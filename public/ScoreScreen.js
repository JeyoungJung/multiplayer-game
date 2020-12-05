class ScoreScreen {
  constructor(data) {
    this.data = data
    this.timerValue = 3
    console.log(data)
  }
  update() {
    background(255)
    if (c == 1) {
      
      fill(255)
      textSize(30)
      textStyle(BOLD);
      stroke(50)
      strokeWeight(6)
      text('YOU', displayWidth / 2 - displayWidth / 4, 200)
      text('OPPONENT', displayWidth / 2 + displayWidth / 4, 200)
      textSize(250)
      strokeWeight(15)
      text(this.data.cOnePoint, displayWidth / 2 - displayWidth / 4, displayHeight / 2)
      text(this.data.cTwoPoint, displayWidth / 2 + displayWidth / 4, displayHeight / 2)
      text(':', displayWidth / 2, displayHeight / 2)
    }
    if (c == 2) {
      fill(255)
      textSize(30)
      textStyle(BOLD);
      stroke(50)
      strokeWeight(6)
      text('YOU', displayWidth / 2 - displayWidth / 4, 200)
      text('OPPONENT', displayWidth / 2 + displayWidth / 4, 200)
      textSize(250)
      strokeWeight(15)
      text(this.data.cTwoPoint, displayWidth / 2 - displayWidth / 4, displayHeight / 2)
      text(this.data.cOnePoint, displayWidth / 2 + displayWidth / 4, displayHeight / 2)
      text(':', displayWidth / 2, displayHeight / 2)
    }
    if (this.timerValue == 0) {
      socket.emit("chooseGame", this.data)
    }
    if (frameCount % 60 == 0 && this.timerValue > 0) {
      this.timerValue--;
    }
  }
}
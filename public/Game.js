class Game {
  constructor() {
  }

  waitingForPlayer() {
    textStyle(BOLD);
    stroke(50)
    strokeWeight(7)
    fill(255)
    textSize(50)
    text('"Waiting for Player 2"', window.innerWidth / 2, window.innerHeight / 2)
  }
}
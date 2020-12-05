class GameTwo {
    constructor(data, c) {
        this.stopSwitch = false
        this.hit
        this.speed = 5
        this.squareLimit = data.xPos.length
        this.square = []
        for (let i = 0; i < data.xPos.length; i++) {
            this.square.push(new Rectangles(data.xPos[i], data.yPos[i], random(255), random(255), random(255), 10, 3, 0))
        }
    }
    update() {
        if(this.stopSwitch == false){
            this.display()
            this.move()
        }
    }
    display() {
        background(255)
        for (let i = 0; i < this.squareLimit; i++) {
            this.square[i].update()
        }
        fill(100, 100, 100)
        stroke(0)
        strokeWeight(2)
        rect(mouseX, 800, 40, 20)
        noStroke()
    }
    move() {
        for (let i = 0; i < this.squareLimit; i++) {
            this.square[i].yPos += this.speed
            this.speed += 0.0001
            this.hit = this.rectRect(this.square[i].xPos, this.square[i].yPos, 13, 13, mouseX, 800, 40, 22)
            if (this.hit) {
                let data = {
                    c : c,
                    roomno : roomno
                }
                socket.emit("GameTwoLost", data)
                this.stopSwitch = true
                break
            }
        }
    }

    rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
        if (r1x + r1w / 2 >= r2x - r2w / 2 &&    // r1 right edge past r2 left
            r1x <= r2x + r2w / 2 &&    // r1 left edge past r2 right
            r1y + r1h / 2 >= r2y - r2h / 2 &&    // r1 top edge past r2 bottom
            r1y <= r2y + r2h / 2) {    // r1 bottom edge past r2 top
            return true
        }
        return false
    }
}
class GameOne {
    constructor(data) {
        this.square = []
        for (let i = 0; i < 4; i++) {
            this.square.push(new Rectangles(i * displayWidth / 4 + displayWidth / 8, displayHeight / 2 + displayHeight / 10, data.color[i], data.color[i+1], data.color[i+2], 200, 10, 30))
        }
        this.randomNum = data.randomNum
        this.answerRect = new Rectangles(displayWidth / 2, displayHeight / 2 - displayHeight / 4, this.square[this.randomNum].red, this.square[this.randomNum].green, this.square[this.randomNum].blue, 200, 10, 30)
        this.c1 = color(data.colorbg[0], data.colorbg[1], data.colorbg[2])
        this.c2 = color(data.colorbg[3], data.colorbg[4], data.colorbg[5])
    }

    update(cPoints) {
        this.cPoints = cPoints
        this.display()
    }

    display() {
        this.setGradient(this.c1, this.c2)
        this.answerRect.update()
        for (let i = 0; i < 4; i++) {
            this.square[i].update()
        }
        textStyle(BOLD);
        stroke(50)
        strokeWeight(7)
        fill(255)
        textSize(50)
        if(this.cPoints.cOnePoint == 10 || this.cPoints.cTwoPoint == 10){
            this.cPoints.cOnePoint = 0
            this.cPoints.cTwoPoint = 0
        }
        if (c == 1) {
            text(this.cPoints.cOnePoint, 50, 50)
            text(this.cPoints.cTwoPoint, window.innerWidth-50, 50)
        }
        else {
            text(this.cPoints.cTwoPoint, 50, 50)
            text(this.cPoints.cOnePoint, window.innerWidth-50, 50)
        }
    }

    setGradient(c1, c2) {
        noFill();
        for (var y = 0; y < height; y++) {
            var inter = map(y, 0, height, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, y, width, y);
        }
    }
}




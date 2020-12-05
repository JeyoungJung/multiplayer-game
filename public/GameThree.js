class GameThree {
    constructor(data) {
        this.numClicked = 0
        this.clickRect = new Rectangles(window.innerWidth / 2, window.innerHeight / 2, data.red, data.green, data.blue, data.size, data.strokeWeight, data.bend)
    }
    update() {
        background(255)
        this.clickRect.update()
        console.log(this.clickRect.size)
    }
}


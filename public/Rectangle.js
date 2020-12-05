class Rectangles{
    constructor(xPos, yPos, red, green, blue, size, strokeWeight, bend) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.size = size
        this.bend = bend
        this.strokeWeight = strokeWeight
    }
    update(){
        this.display()
    }
    display(){
        fill(this.red, this.green, this.blue)
        strokeCap(ROUND);
        stroke(this.red-40, this.green-40, this.blue-40)
        strokeWeight(this.strokeWeight)
        rect(this.xPos, this.yPos, this.size, this.size, this.bend)
        noStroke()
    }
}
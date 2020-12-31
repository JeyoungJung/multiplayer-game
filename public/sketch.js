let socket
let g
let gNum
let c
let cOnePointGameOne = 0
let cTwoPointGameOne = 0
let roomno
let gThreelurpBoolean
let gThreeRectSize
let gThreeNumClicked = 0

function setup() {
  g = new Game()
  createCanvas(displayWidth, displayHeight)
  rectMode(CENTER)
  textAlign(CENTER, CENTER)
  socket = io.connect('localhost:1124')
  socket.on('waiting', g.waitingForPlayer)

  socket.on('clientNumber', function (clients) {
    c = clients
  })
  socket.on('connectToRoom', function (data) {
    roomno = data
  })

  //-----------------------------GameOne---------------------------------//
  socket.on('setupGameOne', function (data) {
    gNum = 1
    gOne = new GameOne(data)
  })
  socket.on('addcOnePointGameOne', function (data) {
    cOnePointGameOne = data
  })
  socket.on('addcTwoPointGameOne', function (data) {
    cTwoPointGameOne = data
  })

  //-----------------------------GameTwo---------------------------------//
  socket.on('setupGameTwo', function (data) {
    gNum = 2
    gTwo = new GameTwo(data, c)
  })

  //-----------------------------GameThree---------------------------------//
  socket.on('setupGameThree', function (data) {
    gNum = 3
    gThree = new GameThree(data)
    gThreeRectSize = data.gThreeRectSize
  })

  socket.on('GameThreeClicked', function (){
    gThree.clickRect.size-=50
    gThreeRectSize = gThree.clickRect.size
    gThreelurpBoolean = true
    gThree.clickRect.green += 20
    gThree.clickRect.blue += 20
  })

  //-----------------------------GameFour---------------------------------//
  socket.on('setupGameFour', function () {
    let data = {
      roomno: roomno,
      c: c
    }
    gNum = 4
    gFour = new GameFour(data)
  })

  //-----------------------------GameFive---------------------------------//

  socket.on('setupGameFive', function(randomNum){
    let data = {
      roomno: roomno,
      c: c,
      randomNum : randomNum
    }
    gNum = 5
    gFive = new GameFive(data)
  })

  //-----------------------------Scoreboard---------------------------------//
  socket.on('clientScores', function (clientScores) {
    let data = {
      cOnePoint: clientScores.cOnePoint,
      cTwoPoint: clientScores.cTwoPoint,
      roomno: roomno,
      c: c
    }
    gNum = -1
    scoreScreen = new ScoreScreen(data)
  })
}


function draw() {
  if (gNum == -1) {
    scoreScreen.update()
  }
  if (gNum == 1) {
    let cPoints = {
      cOnePoint: cOnePointGameOne,
      cTwoPoint: cTwoPointGameOne
    }
    gOne.update(cPoints)
  }
  if (gNum == 2) {
    gTwo.update()
  }
  if (gNum == 3) {
    gThree.update()
    if (gThreelurpBoolean) {
      gThree.clickRect.size = lerp(gThreeRectSize, gThree.clickRect.size + 30, 0.5)
    }
    if (gThreelurpBoolean == false) {
      gThree.clickRect.size = lerp(gThreeRectSize, gThree.clickRect.size - 10, 0.5)
    }
    if(gThree.clickRect.size < 80){
      gThreeRectSize = 200
      gThree.clickRect.size = 200
    }
    if(gThree.clickRect.size > 320){
      gThreeRectSize = 200
      gThree.clickRect.size = 200
      let data = {
        c: c,
        roomno: roomno
      }
      socket.emit("GameThreeWon", data)
    }
  }
  if (gNum == 4) {
    gFour.update()
  }
  if (gNum == 5) {
    gFive.update()
  }
}

function mouseReleased() {
  if (gNum == 1) {
    if (mouseX > gOne.randomNum * displayWidth / 4 + displayWidth / 8 - 100 && mouseX < gOne.randomNum * displayWidth / 4 + displayWidth / 8 + 100 && mouseY > displayHeight / 2 + displayHeight / 10 - 100 && mouseY < displayHeight / 2 + displayHeight / 10 + 100) {
      let data = {
        c: c,
        roomno: roomno,
        cOnePointGameOne: cOnePointGameOne,
        cTwoPointGameOne: cTwoPointGameOne
      }
      socket.emit("addPointGameOne", data)
      socket.emit("GameOneWon", data)
    }
  }
  if (gNum == 3) {
    if (mouseX > window.innerWidth / 2 - gThree.clickRect.size / 2 && mouseX < window.innerWidth / 2 + gThree.clickRect.size / 2 &&
      mouseY > window.innerHeight / 2 - gThree.clickRect.size / 2 && mouseY < window.innerHeight / 2 + gThree.clickRect.size / 2) {
      gThreeRectSize = gThree.clickRect.size
      gThreelurpBoolean = true
      gThree.clickRect.strokeWeight += 1
      gThree.clickRect.green -= 20
      gThree.clickRect.blue -= 20
      gThree.numClicked++
      let data = {
        c: c,
        roomno: roomno
      }
      socket.emit("GameThreeClicked", data)
    }
  }
  
}

function mousePressed() {
  if (gNum == 3) {
    if (mouseX > window.innerWidth / 2 - gThree.clickRect.size / 2 && mouseX < window.innerWidth / 2 + gThree.clickRect.size / 2 &&
      mouseY > window.innerHeight / 2 - gThree.clickRect.size / 2 && mouseY < window.innerHeight / 2 + gThree.clickRect.size / 2) {
      gThreeRectSize = gThree.clickRect.size
      gThreelurpBoolean = false
    }
  }
}

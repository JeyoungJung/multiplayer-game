let express = require('express')

let app = express()
let server = app.listen(1124)

let clients = 0
let gNum = 1
let roomno = 1

let cOneTotalPoint = 0
let cTwoTotalPoint = 0

let cOnePointGameOne = []
let cTwoPointGameOne = []

app.use(express.static('public'))

let socket = require('socket.io')
let io = socket(server)

let Datastore = require('nedb')
let db = new Datastore('database.db')
db.loadDatabase()

io.sockets.on('connection', newConnection)

function newConnection(socket) {
  clients++
  if (clients == 3) {
    clients = 1
    roomno++;
    socket.join("room-" + roomno);
    io.sockets.in("room-" + roomno).emit('connectToRoom', roomno);
  }

  if (clients == 1) {
    socket.emit('waiting')
    socket.emit('clientNumber', clients)

    socket.join("room-" + roomno);
    io.sockets.in("room-" + roomno).emit('connectToRoom', roomno);

    // let dataOne={
    //   _id: "id1",
    //   title : "clientOneScore",
    //   count : 0
    // }
    // db.insert(dataOne, function (err){})
  }

  if (clients == 2) {
    socket.emit('clientNumber', clients)

    socket.join("room-" + roomno);
    io.sockets.in("room-" + roomno).emit('connectToRoom', roomno);

    let data = {
      roomno: roomno
    }
    chooseGame(data)
    // let dataTwo = {
    //   _id: "id2",
    //   title : "clientTwoScore",
    //   count : 0
    // }
    // db.insert(dataTwo, function (err){})
  }

  socket.on('chooseGame', chooseGame)
  gNum = Math.floor(Math.random() * 5) + 1

  function chooseGame(data) {
    gNum = Math.floor(Math.random() * 5) + 1
    if (gNum == 1) {
      io.in('room-' + data.roomno).emit("setupGameOne", GameOneInitialize());
    }
    if (gNum == 2) {
      io.in('room-' + data.roomno).emit("setupGameTwo", GameTwoInitialize());
    }
    if (gNum == 3) {
      io.in('room-' + data.roomno).emit("setupGameThree", GameThreeInitialize());
    }
    if (gNum == 4) {
      io.in('room-' + data.roomno).emit("setupGameFour");
    }
    if (gNum == 5) {
      io.in('room-' + data.roomno).emit("setupGameFive", GameFiveInitialize());
    }
  }


  //------------------------------Game One------------------------------
  function GameOneInitialize() {
    let color = []
    let colorbg = []
    for (let i = 0; i < 12; i++) {
      color[i] = Math.floor(Math.random() * 255)
    }
    for (let i = 0; i < 6; i++) {
      colorbg[i] = Math.floor(Math.random() * 255)
    }
    let randomNum = Math.floor(Math.random() * 4)
    let GameOneData = {
      color: color,
      colorbg: colorbg,
      randomNum: randomNum,
    }
    return GameOneData
  }


  socket.on('addPointGameOne', addPointGameOne)
  function addPointGameOne(data) {
    if (cOnePointGameOne[data.roomno] == null && cTwoPointGameOne[data.roomno] == null) {
      cOnePointGameOne[data.roomno] = 0
      cTwoPointGameOne[data.roomno] = 0
    }
    if (data.c == 1) {
      cOnePointGameOne[data.roomno]++
    } else if (data.c == 2) {
      cTwoPointGameOne[data.roomno]++
    }
    io.in('room-' + data.roomno).emit("addcOnePointGameOne", cOnePointGameOne[data.roomno]);
    io.in('room-' + data.roomno).emit("addcTwoPointGameOne", cTwoPointGameOne[data.roomno]);
  }



  socket.on('GameOneWon', function (data) {
    io.in('room-' + data.roomno).emit("setupGameOne", GameOneInitialize());
    if (cOnePointGameOne[data.roomno] == 10 || cTwoPointGameOne[data.roomno] == 10) { //if Gameone reaches 10 Points pick random game again
      cOnePointGameOne[data.roomno] = 0
      cTwoPointGameOne[data.roomno] = 0
      if (data.c == 1) {
        clientOneWon()
      }
      if (data.c == 2) {
        clientTwoWon()
      }
      clientScoresUpdate(data)
    }
  })

  //------------------------------Game Two------------------------------
  function GameTwoInitialize() {
    let xPos = []
    let yPos = []
    for (let i = 0; i < 50; i++) {
      xPos[i] = Math.floor(Math.random() * 2000)
      yPos[i] = Math.floor(Math.random() * - 500)
    }
    for (let i = 50; i < 1000; i++) {
      xPos[i] = Math.floor(Math.random() * 2000)
      yPos[i] = Math.floor(Math.random() * - 10000) - 500
    }
    let GameTwoData = {
      xPos: xPos,
      yPos: yPos
    }
    return GameTwoData
  }

  socket.on('GameTwoLost', function (data) {
    if (data.c == 2) {
      clientOneWon()
    }
    if (data.c == 1) {
      clientTwoWon()
    }
    clientScoresUpdate(data)
  })

  //------------------------------GameThree------------------------------

  function GameThreeInitialize() {
    let GameThreeData = {
      red: 200,
      green: 200,
      blue: 200,
      size: 200,
      strokeWeight: 10,
      bend: 10,
      gThreeRectSize: 170
    }
    return GameThreeData
  }

  socket.on('GameThreeClicked', function (data) {
    if (data.c == 1) {
      socket.to('room-' + data.roomno).emit("GameThreeClicked");
    }
    else if (data.c == 2) {
      socket.to('room-' + data.roomno).emit("GameThreeClicked");
    }
  })

  socket.on('GameThreeWon', function (data) {
    if (data.c == 1) {
      clientOneWon()
    }
    else if (data.c == 2) {
      clientTwoWon()
    }
    clientScoresUpdate(data)
  })

  //------------------------------GameFour------------------------------

  socket.on('GameFourWon', function (data) {
    if (data.c == 1) {
      clientOneWon()
    }
    else if (data.c == 2) {
      clientTwoWon()
    }
    clientScoresUpdate(data)
  })

  socket.on('GameFourLost', function (data) {
    if (data.c == 1) {
      clientTwoWon()
    }
    else if (data.c == 2) {
      clientOneWon()
    }
    clientScoresUpdate(data)
  })

  //------------------------------GameFive------------------------------

  function GameFiveInitialize() {
    let randomNum = Math.floor(Math.random() * 10 + 1)
    return randomNum
  }

  socket.on('GameFiveWon', function (data) {
    if (data.c == 1) {
      clientOneWon()
    }
    if (data.c == 2) {
      clientTwoWon()
    }
    clientScoresUpdate(data)
  })

  function clientOneWon() {
    db.loadDatabase()
    db.update({ _id: "id1" }, { $inc: { count: 1 } }, { multi: false }, function () { })
  }

  function clientTwoWon() {
    db.loadDatabase()
    db.update({ _id: "id2" }, { $inc: { count: 1 } }, { multi: false }, function () { })
  }


  function clientScoresUpdate(data) {
    db.findOne({ _id: "id1" }, function (err, docs) {
      cOneTotalPoint = docs.count
    })
    db.findOne({ _id: "id2" }, function (err, docs) {
      cTwoTotalPoint = docs.count
      let clientScores = {
        cOnePoint: cOneTotalPoint,
        cTwoPoint: cTwoTotalPoint
      }
      io.in('room-' + data.roomno).emit("clientScores", clientScores);
    })
  }
}

console.log("my server is running")
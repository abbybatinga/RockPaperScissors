// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;
var players = []
var move = ""
var thisPlayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function

  // socket.on('score',
  //     function (score) {
  //     background(0)
  //         console.log(`Current score: ${score}`);
  //         fill(255)
  //         text(score, 100,100)
  //         text(move, 100,150)
  //     }
  // )
    socket.on('players',
        function (players) {
            players = players
            for(let i =0;i<players.length;i++){
                if(players[i].socketId == socket.id){
                    thisPlayer = players[i]
                    background(0)
                    fill(255)
                    text(thisPlayer.score, 100,100)
                    text(thisPlayer.move, 100,150)
                }
            }
        }
        )

}

function draw() {
  // Nothing
}

function mousePressed(){
    var rand = Math.round(Math.random()*3+.5)
    switch (rand) {
        case 1:move = "rock"; break;
        case 2:move = "paper"; break;
        case 3:move = "scissors"; break;
    }
    var moveObj = {
        move:move,
        socketId:socket.id
    }
    text(move, 100,150)
    socket.emit('move',moveObj)
}

// Function for sending to the socket


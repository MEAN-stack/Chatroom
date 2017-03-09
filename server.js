var express = require('express')
var bodyParser = require('body-parser')
var morgan  = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use(require('./controllers'))

var Room = require('./models/room')
Room.remove({}, function(err, room){})
var room1 = new Room({"roomname" : "The Pub", "topic" : "Random Chat", "members" : []})
room1.save(function(err, room) {})
var room2 = new Room({"roomname" : "Node", "topic" : "node.js", "members" : [
          "Paul Robertson",
          "Alonzo Church",
          "Alan Turing",
          "Haskell Curry",
          "Ryan Dahl"
        ]})
room2.save(function(err, room) {})
var room3 = new Room({"roomname" : "Java", "topic" : "Java Talk", "members" : []})
room3.save(function(err, room) {})

var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('Chatroom server listening on port ', port)
})

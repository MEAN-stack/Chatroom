var Room = require('../../models/room')
var router = require('express').Router()

// return a collection of rooms
router.get('/', function(req, res, next) {
  Room.find(function(err, rooms) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(rooms)
    }
  })
})

// create a new room
router.post('/', function(req, res, next) {
  var room = new Room({
    roomname: req.body.roomname,
    topic: req.body.topic,
    // TODO: add the caller's username to the list of members
    members: []
  })
  room.save(function(err, room) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(201, room)
    }
  })
})

// return a collection of members for a given room
router.get('/:roomname/members', function(req, res, next) {
  Room.findOne({roomname: req.params.roomname}, function(err, room) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(room.members)
    }
  })
})


// add a member to a room
router.post('/:roomname/member', function(req, res, next) {
  var member = { name: req.body.name }
  Room.findOneAndUpdate({roomname: req.params.roomname}, {$push: {members: member}}, {new: true}, function(err, room) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(201, room)
    }
  })
})

module.exports = router

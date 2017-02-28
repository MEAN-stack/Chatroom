var db = require('../db')

var Room = db.model('Room', {
  roomname: {type: String, required: true},
  members: [{type: String, required: true}],
  topic: {type: String, required: true}
})

module.exports = Room

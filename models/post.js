var db = require('../db')

var Post = db.model('Post', {
  room: {type: String, required: true},
  member: {type: String, required: true},
  date: {type: String, required: true},
  body: {type: Date, required: true, default: Date.now}
})

module.exports = Post

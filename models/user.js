var db = require('../db')

var User = db.model('User', {
  username: {type: String, required: true},
  fullName: {type: String, required: true},
  email: {type: String, required: true},
  avatar: {type: String, default: ''},
  password: {type: String, select: false}
})

module.exports = User

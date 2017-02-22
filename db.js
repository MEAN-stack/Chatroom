var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chatroom', function(err, result) {
  if (err) {
    console.log('Error connecting to mongo: '+err.message)
  }
  else {
    console.log('mongodb connected')
  }
})
module.exports = mongoose

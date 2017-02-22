var express = require('express')
var bodyParser = require('body-parser')
var morgan  = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use(require('./controllers'))

app.listen(3000, function() {
  console.log('Chatroom server listening on port ', 3000)
})

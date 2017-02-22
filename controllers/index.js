/*
  We define our Express routes here
*/
var router = require('express').Router()
var bodyParser = require('body-parser')

/*
  Any requests with a JSON body will be parsed here...
*/
router.use(bodyParser.json())

/*
  ...the parsed body is now available in req.body
*/

/*
  Serve static assets from the assets folder
*/
router.use('/', require('./static'))

/*
  Other endpoints
*/
router.use('/client', require('./client'))
router.use('/api/rooms', require('./api/rooms'))

module.exports = router

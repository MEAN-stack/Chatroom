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
  Other endpoints
*/
router.use('/client', require('./client'))
router.use('/api/rooms', require('./api/rooms'))
router.use('/api/users', require('./api/users'))
router.use('/api/posts', require('./api/posts'))
router.use('/api/sessions', require('./api/sessions'))

/*
  catch errors here
*/
router.use(function (err, req, res, next) {
  res.status(500).send(err.message)
})

/*
  Serve static assets from the assets folder
*/
router.use('/', require('./static'))

module.exports = router

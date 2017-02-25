var User = require('../../models/user')
var router = require('express').Router()

// return a collection of users
router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(users)
    }
  })
})

// create a new user
router.post('/', function(req, res, next) {
  var user = new User({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    pw: req.body.password,
    avatar: ''
  })
  user.save(function(err, user) {
    if (err) {
      console.log('Error creating user: '+err.message)
      res.send(400)
    }
    else {
      res.status(201).json(user)
    }
  })
})

// return details for a given user
router.get('/:username', function(req, res, next) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (err) {
      return (next(err))
    }
    else {
      if (user) {
        res.json(user)
      }
      else {
        res.send(404)
      }
    }
  })
})

module.exports = router

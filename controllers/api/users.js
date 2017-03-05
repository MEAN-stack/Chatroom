var User = require('../../models/user')
var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../../config')

// 
router.get('/', function(req, res, next) {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401)
  }
  var auth = jwt.decode(req.headers['x-auth'], config.secret)
  User.findOne({username: auth.username}, function(err, user) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(user)
    }
  })
})

// create a new user
router.post('/', function(req, res, next) {
  var user = new User({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    avatar: ''
  })
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    user.save(function(err, user) {
      if (err) {
        console.log('Error creating user: '+err.message)
        res.sendStatus(400)
      }
      else {
        res.status(201).json(user)
      }
    })
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
        res.sendStatus(404)
      }
    }
  })
})

module.exports = router

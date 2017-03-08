var router = require('express').Router()
var User = require('../../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../../config')

router.post('/', function(req, res, next) {
  User.findOne({username: req.body.username})
  .select('password')
  .select('username')
  .select('email')
  .select('fullName')
  .exec(function(err, user) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.sendStatus(401)
    }
    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (err) {
        console.log(err.message)
        return next(err)
      }
      if (!valid) {
        return res.sendStatus(401)
      }
      try {
        var token = jwt.encode({
          username: user.username,
          fullName: user.fullName,
          email: user.email
        }, config.secret)
        res.status(201).send(token)
      }
      catch (ex) {
        console.log('Caught '+ex.message)
      }
    })
  })
})

module.exports = router

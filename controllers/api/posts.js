var Post = require('../../models/post')
var router = require('express').Router()

// return a collection of posts
router.get('/', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(posts)
    }
  })
})

// return a collection of posts
router.get('/:roomname', function(req, res, next) {
  Post.find({room: req.params.roomname}, function(err, posts) {
    if (err) {
      return (next(err))
    }
    else {
      res.json(posts)
    }
  })
})

// create a new post
router.post('/', function(req, res, next) {
  var post = new Post({
    room: req.body.room,
    member: req.body.member,
    body: req.body.body 
  })
  post.save(function(err, post) {
    if (err) {
      console.log('Error creating post: '+err.message)
      res.sendStatus(400)
    }
    else {
      res.status(201).json( post)
    }
  })
})

module.exports = router

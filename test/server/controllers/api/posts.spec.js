var expect = require('chai').expect
var api = require('../../support/api')
var Post = require('../../../../models/post')

describe('controllers.api.posts', function() {
  beforeEach(function(done) {
    Post.remove({}, done)
  })

  describe('GET /api/posts', function() {

    beforeEach(function(done) {
      var posts = [
        {"room": "The Pub", "member": "Ryan", "body": "Is there anyone here?"},
        {"room" : "Node", "member" : "Ryan", "body" : "Node rocks!"},
        {"room" : "Node", "member" : "MEAN-stack", "body" : "Hi Ryan"}
      ]
      Post.create(posts, done)
    })

    it('has 3 posts', function(done) {
      api.get('/api/posts')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.have.length(3)
      })
      .end(done)
    })
  })

  describe('POST /api/posts', function() {
    beforeEach(function(done) {
      api.post('/api/posts')
      .send({"room" : "Node", "member" : "Ryan", "body" : "Node rocks!"})
      .expect(201)
      .end(done)
    })

    it('created a post', function(done) {
      Post.findOne(function(err, post) {
        expect(post.body).to.equal('Node rocks!')
        done(err)
      })
    })
  })

  describe('POST /api/posts', function() {
    beforeEach(function(done) {
      api.post('/api/posts')
      .send({room: 'Node'})
      .expect(400)
      .end(done)
    })

    it('failed to create a post', function(done) {
      Post.findOne(function(err, post) {
        expect(post).to.equal(null)
        done(err)
      })
    })
  })
})

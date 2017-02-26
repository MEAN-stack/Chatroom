var expect = require('chai').expect
var api = require('../../support/api')
var Room = require('../../../../models/room')

describe('controllers.api.rooms', function() {
  beforeEach(function(done) {
    Room.remove({}, done)
  })

  describe('GET /api/rooms', function() {

    beforeEach(function(done) {
      var rooms = [
        {"roomname" : "The Pub", "topic" : "Random Chat", "members" : []},
        {"roomname" : "Node", "topic" : "node.js", "members" : [
          {"name" : "Paul Robertson"},
          {"name" : "Alonzo Church"},
          {"name" : "Alan Turing"},
          {"name" : "Haskell Curry"},
          {"name" : "Ryan Dahl"}
        ]}
      ]
      Room.create(rooms, done)
    })

    it('has 2 rooms', function(done) {
      api.get('/api/rooms')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.have.length(2)
        expect(response.body[1].members).to.have.length(5)
      })
      .end(done)
    })
  })

  describe('GET /api/rooms/:roomname', function() {

    beforeEach(function(done) {
      Room.create({"roomname" : "The Pub", "topic" : "Random Chat", "members" : []}, done)
    })

    it('find room by roomname', function(done) {
      api.get('/api/rooms/The Pub')
      .expect(200)
      .expect(function(response) {
        expect(response.body.topic).to.equal('Random Chat')
      })
      .end(done)
    })

    it('fails to find room by roomname', function(done) {
      api.get('/api/rooms/Java')
      .expect(404)
      .end(done)
    })
  })

  describe('GET /api/rooms/:roomname/members', function() {

    beforeEach(function(done) {
      var rooms = [
        {"roomname" : "Node", "topic" : "node.js", "members" : [
          {"name" : "Paul Robertson"},
          {"name" : "Alonzo Church"},
          {"name" : "Alan Turing"},
          {"name" : "Haskell Curry"},
          {"name" : "Ryan Dahl"}
        ]}
      ]
      Room.create(rooms, done)
    })

    it('find room members by roomname', function(done) {
      api.get('/api/rooms/Node/members')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.have.length(5)
      })
      .end(done)
    })

    it('fails to find room members by roomname', function(done) {
      api.get('/api/rooms/Java/members')
      .expect(404)
      .end(done)
    })
  })

  describe('POST /api/rooms', function() {
    beforeEach(function(done) {
      api.post('/api/rooms')
      .send({"roomname" : "Node", "topic" : "node.js", "members" : [{"name" : "Ryan Dahl"}]})
      .expect(201)
      .end(done)
    })

    it('created a room', function(done) {
      Room.findOne(function(err, room) {
        expect(room.roomname).to.equal('Node')
        done(err)
      })
    })
  })

  describe('POST /api/rooms', function() {
    beforeEach(function(done) {
      api.post('/api/rooms')
      .send({username: 'Ryan', fullName: 'Ryan Dahl' })
      .expect(400)
      .end(done)
    })

    it('failed to create a room', function(done) {
      Room.findOne(function(err, room) {
        expect(room).to.equal(null)
        done(err)
      })
    })
  })

  describe('POST /api/rooms/:roomname/members', function() {
    beforeEach(function(done) {
      api.post('/api/rooms')
      .send({"roomname" : "Node", "topic" : "node.js", "members" : [{"name" : "Ryan"}]})
      .expect(201)
      .end(done)
    })

    beforeEach(function(done) {
      api.post('/api/rooms/Node/members')
      .send({"name" : "Paul"})
      .expect(201)
      .end(done)
    })

    it('created added a room member', function(done) {
      Room.findOne(function(err, room) {
        expect(room.roomname).to.equal('Node')
        expect(room.members).to.have.length(2)
        expect(room.members[1].name).to.equal('Paul')
        done(err)
      })
    })
  })

  describe('POST /api/rooms/:roomname/members', function() {
    beforeEach(function(done) {
      api.post('/api/rooms')
      .send({"roomname" : "Node", "topic" : "node.js", "members" : [{"name" : "Ryan"}]})
      .expect(201)
      .end(done)
    })

    beforeEach(function(done) {
      api.post('/api/rooms/Node/members')
      .send({"fullName" : "Paul Robertson"})
      .expect(400)
      .end(done)
    })

    it('failed to add a room member', function(done) {
      Room.findOne(function(err, room) {
        expect(room.roomname).to.equal('Node')
        expect(room.members).to.have.length(1)
        done(err)
      })
    })
  })
})

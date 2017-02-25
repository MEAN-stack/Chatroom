var expect = require('chai').expect
var api = require('../../support/api')
var User = require('../../../../models/user')

describe('controllers.api.users', function() {
  beforeEach(function(done) {
    User.remove({}, done)
  })

  describe('GET /api/users', function() {

    beforeEach(function(done) {
      var users = [
        {username: 'MEAN-stack', fullName: 'Paul Robertson', email: 'paul.robertson@soft-machine.co.uk', password: 'passsme', avatar: ''},
        {username: 'AnnR', fullName: 'Ann Robertson', email: 'ann.robertson@soft-machine.co.uk', password: 'passsme', avatar: ''},
        {username: 'Dan', fullName: 'Dan Robertson', email: 'dar64@cam.ac.uk', password: 'passsme', avatar: ''},
      ]
      User.create(users, done)
    })

    it('has 3 users', function(done) {
      api.get('/api/users')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.have.length(3)
      })
      .end(done)
    })
  })

  describe('GET /api/users/:user', function() {

    beforeEach(function(done) {
      var user = {username: 'Dan', fullName: 'Dan Robertson', email: 'dar64@cam.ac.uk', password: 'passsme', avatar: ''}
      User.create(user, done)
    })

    it('find user by username', function(done) {
      api.get('/api/users/Dan')
      .expect(200)
      .expect(function(response) {
        expect(response.body.fullName).to.equal('Dan Robertson')
        expect(response.body.email).to.equal('dar64@cam.ac.uk')
      })
      .end(done)
    })

    it('fails to find user by username', function(done) {
      api.get('/api/users/Fred')
      .expect(404)
      .end(done)
    })
  })

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      api.post('/api/users')
      .send({username: 'Randomer', fullName: 'Joe Bloggs', email: 'joe@bloggs.com', password: 'passsme', avatar: ''})
      .expect(201)
      .end(done)
    })

    it('created a user', function(done) {
      User.findOne(function(err, user) {
        expect(user.username).to.equal('Randomer')
        done(err)
      })
    })
  })

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      api.post('/api/users')
      .send({username: 'Randomer', fullName: 'Joe Bloggs' })
      .expect(400)
      .end(done)
    })

    it('failed to create a user', function(done) {
      User.findOne(function(err, user) {
        expect(user).to.be.null
        done(err)
      })
    })
  })
})

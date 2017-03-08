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
        { "password" : "$2a$10$l.51Gf3hVs8.CyUaUpf9wuwiBF7ESSdxALhiac/J/257Asc6sgpky", "username" : "Paul", "fullName" : "Paul Robertson", "email" : "paul.robertson@costain.com", "avatar" : "" },
        { "password" : "$2a$10$y1FW1XFwKkpBcx125po59.XtPGaoYr4fjqgtA9iIjCogN3/GXo9ua", "username" : "Alan", "fullName" : "Alan Turing", "email" : "alant@cam.ac.uk", "avatar" : "" },
        { "password" : "$2a$10$YBRnklXtL9tyg8iNvWjoouf9.0hA0nGSIKA4IKIF4WO.Hyy7qCBwe", "username" : "Linus", "fullName" : "Linus Torvalds", "email" : "linus@kernel.org.uk", "avatar" : "" }
      ]
      User.create(users, done)
    })

    beforeEach(function(done) {
      api.post('/api/sessions')
      .send({username: 'Alan', password: 'passme'})
      .expect(201)
      .end(done)
    })

    it('has a logged-in user', function(done) {
      api.get('/api/users')
      .set('X-Auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFsYW4iLCJmdWxsTmFtZSI6IkFsYW4gVHVyaW5nIiwiZW1haWwiOiJhbGFudEBjYW0uYWMudWsifQ.nkkcg6nMzhrakHyfd4yFfCTDAkkhnfvjgBVXPR7ftyk')
      .expect(200)
      .expect(function(response) {
        expect(response.body.fullName).to.equal('Alan Turing')
      })
      .end(done)
    })
  })

  describe('GET /api/users/:user', function() {

    beforeEach(function(done) {
      var user = { "password" : "$2a$10$y1FW1XFwKkpBcx125po59.XtPGaoYr4fjqgtA9iIjCogN3/GXo9ua", "username" : "Alan", "fullName" : "Alan Turing", "email" : "alant@cam.ac.uk", "avatar" : "" }
      User.create(user, done)
    })

    it('find user by username', function(done) {
      api.get('/api/users/Alan')
      .expect(200)
      .expect(function(response) {
        expect(response.body.fullName).to.equal('Alan Turing')
        expect(response.body.email).to.equal('alant@cam.ac.uk')
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
        expect(user).to.equal(null)
        done(err)
      })
    })
  })

})

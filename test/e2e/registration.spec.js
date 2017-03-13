var db = require('../../db')
var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect


describe('User registration', function() {
  it('registers a new user', function() {
    // go to homepage
    browser.get('http://localhost:3001')
    
    // click 'register'
    element(by.css('nav .register')).click()

    // fill out the form    
    element(by.model('username')).sendKeys('lambda')
    element(by.model('fullName')).sendKeys('Alonzo Church')
    element(by.model('email')).sendKeys('Lambda@calculus.com')
    element(by.model('password')).sendKeys('passme')

    // submit the form
    element(by.css('form .btn')).click()


    // click 'login'
    element(by.css('nav .login')).click()

    // fill out the form    
    element(by.model('username')).sendKeys('Lambda')
    element(by.model('password')).sendKeys('passme')

    // submit the form
    element(by.css('form .btn')).click()

    // the username should appear in the navbar
    expect(element(by.css('.navbar')).getText()).to.eventually.contain('Lambda')
  })

  afterEach(function() {
    db.connection.db.dropDatabase()
  })
})

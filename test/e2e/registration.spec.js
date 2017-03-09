describe('User registration', function() {
  it('registers a new user', function() {
    // go to homepage
    browser.get('http://localhost:3001')
    
    // click 'register'
    element(by.css('nav .register')).click()
    
    element(by.model('username')).sendKeys('Lambda')
    element(by.model('fullName')).sendKeys('Alonzo Church')
    element(by.model('email')).sendKeys('Lambda@calculus.com')
    element(by.model('password')).sendKeys('passme')
    element(by.css('form .btn')).click()

    browser.pause()

    

    // the user should see a confirmation message
  })
})

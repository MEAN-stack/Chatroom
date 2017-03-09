# Chatroom

Things to install globally:

* gulp
* jshint
* bower
* istanbul

Testing:

`./node_modules/.bin/mocha -R nyan`

or

`npm test`

With code coverage report:

`istanbul cover ./node_modules/.bin/_mocha`

End-to-end testing:

 ./node_modules/.bin/webdriver-manager update

Edit protractor.conf.js

 exports.config = {
   seleniumAddress: 'http://localhost:4444/wd/hub',
   framework: 'mocha',
   specs: [
     'test/e2e/**/*.spec.js'
   ],
   mochaOpts: {
     enableTimeouts: false
   }
 }


Run tests

 ./node_modules/.bin/webdriver-manager start
 ./node_modules/.bin/protractor



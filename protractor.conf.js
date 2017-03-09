exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  specs: [
    'test/e2e/**/*.spec.js'
  ],
  mochaOpts: {
    enableTimeouts: false
  },
  onPrepare: function() {
    process.env.PORT = 3001    
    require('./server')
  }
}

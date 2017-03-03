angular.module('app')
.service('UserSvc', function($http) {
  var svc = this
  svc.getUser = function() {
    return $http.get('/api/users', {
      headers: {'X-Auth': this.token}
    })
  }
  svc.login = function(username, fullName, email, password) {
    return $http.post('/api/sessions', {
      username: username,
      fullName: fullName,
      email: email,
      password: password
    }).then(function(val) {
      svc.token = val.data
      return svc.getUser()
    })
  }
})

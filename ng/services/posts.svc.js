angular.module('app')
.service('PostsSvc', function($http) {

  this.fetch = function() {
    console.log("PostsSvc.fetch")
    return $http.get('/api/posts')
  }

  this.create = function(post) {
    console.log("PostsSvc.create")
    return $http.post('/api/posts', post)
  }

})

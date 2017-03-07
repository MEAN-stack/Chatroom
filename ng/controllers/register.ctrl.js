angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc) {
  $scope.register = function(username, fullName, email, password) {
    UserSvc.createUser(username, fullName, email, password)
    .then(function(response) {
      console.log("registered a new user")
    })
  }
})

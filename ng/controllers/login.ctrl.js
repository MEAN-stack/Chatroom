angular.module('app')
.controller('LoginCtrl', function($scope, UserSvc) {
  $scope.login = function(username, fullName, email, password) {
    UserSvc.login(username, password)
    .then(function(user) {
      console.log(user)
    })
  }
})

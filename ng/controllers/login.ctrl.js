angular.module('app')
.controller('LoginCtrl', function($scope, UserSvc) {
  $scope.login = function(username, fullName, email, password) {
    UserSvc.login(username, fullName, email, password)
    .then(function(response) {
      $scope.$emit('login', response.data)
    })
  }
})

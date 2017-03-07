angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc) {
  $scope.register = function(username, fullName, email, password) {
    UserSvc.login(username, fullName, email, password)
    .then(function(response) {
      $scope.$emit('login', response.data)
    })
  }
})

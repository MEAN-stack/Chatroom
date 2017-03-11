angular.module('app')
.config(function($routeProvider) {
  $routeProvider
  .when('/',         {controller: 'LoginCtrl',    templateUrl: 'login.html'})
  .when('/rooms',    {controller: 'RoomsCtrl',   templateUrl: 'home.html'})
  .when('/register', {controller: 'RegisterCtrl', templateUrl: 'register.html'})
  .when('/login',    {controller: 'LoginCtrl',    templateUrl: 'login.html'})
})

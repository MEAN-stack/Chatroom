var app = angular.module('app', [
  'ngRoute',
  'ui.layout'
])


app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])


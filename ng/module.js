var app = angular.module('app', [
  'ui.layout'
])


app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])


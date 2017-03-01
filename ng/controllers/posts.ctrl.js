angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc) {
  // initial data
  PostsSvc.fetch().success(function(posts){
    console.log("fetch() success: " + posts.length + " posts")
    $scope.posts = posts
  })
})


angular.module('app')
.controller('RoomsCtrl', function($scope, RoomsSvc) {
  // initial data
  RoomsSvc.fetch().success(function(rooms){
    console.log("fetch() success: " + rooms.length + " rooms")
    $scope.rooms = rooms
  })
})


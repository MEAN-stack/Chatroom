angular.module('app')
.service('RoomsSvc', function($http) {

  this.fetch = function() {
    console.log("RoomsSvc.fetch")
    return $http.get('/api/rooms')
  }

  this.create = function(room) {
    console.log("RoomsSvc.create")
    return $http.post('/api/rooms', room)
  }

})

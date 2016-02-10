'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, AlbumFactory, PlayerFactory) {

  // load our initial data
  // $http.get('/api/albums/')
  // .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  // .then(res => res.data)
  // .then(album => {
  //   album.imageUrl = '/api/albums/' + album._id + '.image';
  //   album.songs.forEach(function (song, i) {
  //     song.audioUrl = '/api/songs/' + song._id + '.audio';
  //     song.albumIndex = i;
  //   });
  //   $scope.album = album;
  //   AlbumFactory.totalTime($scope.album)
  //   .then (function (time) {
  //     // console.log(time)
  //     $scope.album.time = Math.floor(time/60);  
  //   })
    
  //   // console.log(AlbumFactory.totalTime)
  // })
  // .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.album = AlbumFactory.album;
  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;

  // main toggle
  $scope.toggle = function (song) {

    if ($scope.playing() ) {
      PlayerFactory.pause();
    } else if (song === $scope.currentSong()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, $scope.album.songs);
    }
  };

});

app.controller('albumCtrl', function($scope, $rootScope, $http){
	$http.get('/api/albums/56b9276fbab14d6104dcf45f')
	.then(function(response){
		response.data.imageUrl = '/api/albums/' + response.data._id + '.image';
		$scope.album = response.data;
		console.log('the server responded with', response.data)
	}).catch(console.error.bind(console));

	$scope.joinArtists = function (arrOfArtists){
		var artists = arrOfArtists.map(function(el){
			return el.name;
		})
		return artists.join(", ")
	}
	$scope.toggle = function(song) {
		//send currentSong
		$scope.currentSong.audio = document.createElement('audio');
		var url = "/api/songs/"+song._id+".audio";
		$scope.album.songs.forEach(function(s, i) {
			if (s == song){
				s.hidden = true;
				s.audio.src = url;
				s.audio.load();
				s.audio.play();


			s.audio.addEventListener('timeupdate', function () {
			    $scope.progress = 100 * s.audio.currentTime / s.audio.duration;
			    $rootScope.$broadcast('progressUpdate', $scope.progress);
			});
				$scope.currentSong.index = i;
			} else {
				s.hidden = false;
				if(s.audio) s.audio.pause();
			}
		})
	} 

	$scope.playSong = function(songId, song){
		$scope.currentSong = song;
		$scope.toggle($scope.currentSong);
		$rootScope.$broadcast('songPlay');
	};

	$rootScope.$on('pause', function(event){
		$scope.currentSong.audio.pause();
	})

	$rootScope.$on('play', function(event){
		$scope.currentSong.audio.play();

		$scope.currentSong.audio.addEventListener('timeupdate', function () {
			$scope.progress = 100 * $scope.currentSong.audio.currentTime / $scope.currentSong.audio.duration;
			$rootScope.$broadcast('progressUpdate', $scope.progress);
		});
	})


	$rootScope.$on('next', function (event){
		var currentIndex = $scope.currentSong.index;
		if (currentIndex === $scope.album.songs.length-1) {
			$scope.currentSong = $scope.album.songs[0];
		}
		else $scope.currentSong = $scope.album.songs[currentIndex+1]
		$scope.toggle($scope.currentSong);
	});
	$rootScope.$on('prev', function (event){
		var currentIndex = $scope.currentSong.index;
		if (!currentIndex) $scope.currentSong = $scope.album.songs[$scope.album.songs.length-1];
		else $scope.currentSong = $scope.album.songs[currentIndex-1]
		$scope.toggle($scope.currentSong);
	});
})

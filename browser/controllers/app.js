var app = angular.module('juke',[]);

app.controller('MainCtrl', function($scope, $http){

	$http.get('/api/albums/56b8ef9c7eb78b0a0d282294')
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
				$scope.$digest();
			    // $scope.$broadcast('progress', $scope.progress);
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
		$scope.$broadcast('songPlay', $scope.currentSong);
	};

	$scope.$on('pause', function(event){
		$scope.currentSong.audio.pause();
	})

	$scope.$on('play', function(event){
		$scope.currentSong.audio.play();

		$scope.currentSong.audio.addEventListener('timeupdate', function () {
			$scope.progress = 100;
			$scope.$digest();
			// * $scope.currentSong.audio.currentTime / $scope.currentSong.audio.duration;
		});
	})

	$scope.$on('next', function (event){
		var currentIndex = $scope.currentSong.index;
		if (currentIndex === $scope.album.songs.length-1) {
			$scope.currentSong = $scope.album.songs[0];
		}
		else $scope.currentSong = $scope.album.songs[currentIndex+1]
		$scope.toggle($scope.currentSong);
	});
	$scope.$on('prev', function (event){
		var currentIndex = $scope.currentSong.index;
		if (!currentIndex) $scope.currentSong = $scope.album.songs[$scope.album.songs.length-1];
		else $scope.currentSong = $scope.album.songs[currentIndex-1]
		$scope.toggle($scope.currentSong);
	});
});

app.controller('footCtrl', function($scope){
	$scope.hideBar = true;
	$scope.hidePause = true;
	$scope.showPlay = false;
	$scope.$on('songPlay', function(event, currentSong){
		$scope.hideBar = false;
		$scope.hidePause = false;
		$scope.showPlay = true;
		$scope.currentSong = currentSong;
	});

	$scope.pauseBtn = function(){
		console.log('pushed pause');
		$scope.$emit('pause');
		$scope.hidePause = true;
		$scope.showPlay = false;
	}

	$scope.playBtn = function(){
		console.log('pushed play');
		$scope.$emit('play');
		$scope.hidePause = false;
		$scope.showPlay = true;
	}

	$scope.nextBtn = function(){
		console.log('pushed next')
		$scope.$emit('next');
	}
	$scope.prevBtn = function(){
		console.log('pushed prev')
		$scope.$emit('prev');
	}

});

// app.controller('httpCtrl', function($scope, $http){
// 	$http.get('/api/albums/56b8ef9c7eb78b0a0d282294')
// 	.then(function(response){
// 		$scope.album = response.data;
// 		console.log('the server responded with', response.data)
// 	}).catch(console.error.bind(console));
// });
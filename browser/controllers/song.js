app.controller('songCtrl', function($scope, $rootScope){
	$scope.hideBar = true;
	$scope.hidePause = true;
	$scope.showPlay = false;
	$rootScope.$on('songPlay', function(event){
		$scope.hideBar = false;
		$scope.hidePause = false;
		$scope.showPlay = true;
		// $rootScope.currentSong = currentSong;
	});

	$scope.pauseBtn = function(){
		console.log('pushed pause');
		$rootScope.$broadcast('pause');
		$scope.hidePause = true;
		$scope.showPlay = false;
	}

	$scope.playBtn = function(){
		console.log('pushed play');
		$rootScope.$broadcast('play');
		$scope.hidePause = false;
		$scope.showPlay = true;
	}

	$scope.nextBtn = function(){
		console.log('pushed next')
		$rootScope.$broadcast('next');
	}

	$scope.prevBtn = function(){
		console.log('pushed prev')
		$rootScope.$broadcast('prev');
	}

	$rootScope.$on('progressUpdate', function(event, progress) {
		$scope.progress = progress;
		$scope.$digest();
	})
});
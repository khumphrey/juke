app.controller('songCtrl', function($scope, $rootScope) {
    $scope.hideBar = true;
    $scope.hidePause = true;
    $scope.showPlay = false;
    $rootScope.$on('songPlay', function(event) {
        $scope.hideBar = false;
        $scope.hidePause = false;
        $scope.showPlay = true;
        // $rootScope.currentSong = currentSong;
    });

    $scope.pauseBtn = function() {
        // console.log('pushed pause');
        $rootScope.$broadcast('pause');
        $scope.hidePause = true;
        $scope.showPlay = false;
    }

    $scope.playBtn = function() {
        // console.log('pushed play');
        $rootScope.$broadcast('play');
        $scope.hidePause = false;
        $scope.showPlay = true;
    }

    $scope.nextBtn = function() {
        // console.log('pushed next')
        $rootScope.$broadcast('next');
        $scope.hidePause = false;
        $scope.showPlay = true;
    }

    $scope.prevBtn = function() {
        // console.log('pushed prev')
        $rootScope.$broadcast('prev');
        $scope.hidePause = false;
        $scope.showPlay = true;
    }

    $scope.randomBtn = function() {
        // console.log('pushed random')
        $rootScope.$broadcast('random');
    }

    $rootScope.$on('progressUpdate', function(event, progress) {
    	console.log('updating progress', progress)
        $scope.progress = progress;
        $scope.$evalAsync();
    })

    $scope.$on('togglePlay', function(event) {
    	// console.log("toggling play");
    	$scope.showPlay ? $scope.pauseBtn() : $scope.playBtn();
    })

    $scope.$on('togglePrev', function(event) {
    	// console.log("toggling play");
    	$scope.prevBtn();
    })

    $scope.$on('toggleNext', function(event) {
    	// console.log("toggling play");
    	$scope.nextBtn();
    })

	$scope.toggleProgress = function(e) {
		var width = angular.element(e.srcElement)[0].offsetWidth,
			progressWidth = 100*e.offsetX/width;

	       	// $scope.progress = e.offsetX/width;
	       	//pause
	       	// $scope.pauseBtn();
	       	//send to progressupdate
	    $rootScope.$broadcast('progressUpdate', progressWidth)
	    $rootScope.$broadcast('currentTimeUpdate', progressWidth)

	       	//play
       	// $scope.playBtn();
   
	}

});
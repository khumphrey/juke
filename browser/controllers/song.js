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
    	console.log('updating progress')
        $scope.progress = progress;
        $scope.$digest();
    })

    $scope.$on('togglePlay', function(event) {
    	// console.log("toggling play");
    	$scope.showPlay ? $scope.pauseBtn() : $scope.playBtn();
    })


	$scope.toggleProgress = function(e) {
	var width = angular.element(e.srcElement)[0].offsetWidth;

       	// $scope.progress = e.offsetX/width;
       	//pause
       	$scope.pauseBtn();
       	//send to progressupdate
       	$rootScope.$broadcast('progressUpdate', e.offsetX/width)
       	//play
       	$scope.playBtn();
   
	}

});
var app = angular.module('juke',[]);

app.controller('MainCtrl', function($scope, $http){

	$scope.togglePlay = function($event) {
		//spacebar
		if ($event.keyCode == 32) {		
			//figure out how to prevent browser default of space bar
			$scope.$broadcast('togglePlay')
		}
		//left arrow
		if ($event.keyCode == 37) {		
			$scope.$broadcast('togglePrev')
		}
		//right arrow
		if ($event.keyCode == 39) {		
			//figure out how to prevent browser default of space bar
			$scope.$broadcast('toggleNext')
		}

	}
});

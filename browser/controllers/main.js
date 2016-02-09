var app = angular.module('juke',[]);

app.controller('MainCtrl', function($scope, $http){

	$scope.togglePlay = function($event) {
		if ($event.keyCode == 32) {		
			//figure out how to prevent browser default of space bar
			$scope.$broadcast('togglePlay')
		}
	}
});

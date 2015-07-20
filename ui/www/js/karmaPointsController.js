var KarmaPointsController = angular.module('KarmaPointsController', []);

KarmaPointsController.controller("KarmaPointsController", ['$scope', 'karmaPointsData',
						 function($scope, karmaPointsData){
			
	$scope.karmaPoints = karmaPointsData;
	
	$scope.inLeadershipBoard = false; // Binds the saved deals
	
	if(karmaPointsData.isInLeaderDashboard == true){
		$scope.inLeadershipBoard = true;
	}
	else{
		$scope.inLeadershipBoard = false;
	}
}]);

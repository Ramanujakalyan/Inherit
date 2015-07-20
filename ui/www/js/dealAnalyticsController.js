var DealAnalyticsController = angular.module('DealAnalyticsController', []);

DealAnalyticsController.controller("DealAnalyticsController", ['$scope', 'analyticsData',
						 function($scope, analyticsData){
			
	$scope.analyticsList = analyticsData;

	if(analyticsData.length == 0){
		$scope.hasFavDeals = true;
		$scope.favDealsList = false;
	}
	else{
		$scope.hasFavDeals = false;
		$scope.favDealsList = true;
	}	

}]);

var SavedDealsController = angular.module('SavedDealsController', []);

SavedDealsController.controller("SavedDealsController", ['$scope', 'storedDealsData', 'ConnectionService', 'ToastService', function($scope, storedDealsData, ConnectionService, ToastService){
	
	$scope.deals = storedDealsData;
	$scope.hasFavDeals = false; // Binds the saved deals
	$scope.favDealsList = false;


$scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    });


	if(storedDealsData.length == 0){
		$scope.hasFavDeals = true;
		$scope.favDealsList = false;
	}
	else{
		$scope.hasFavDeals = false;
		$scope.favDealsList = true;
	}
}]);

var StoreViewUserController = angular.module('StoreViewUserController', []);

StoreViewUserController.controller("StoreViewUserController", ['$scope', 'storeDeals', 'storeData', 'FavBrandsService',
									 function($scope, storeDeals, storeData, FavBrandsService){
	
    $scope.dealsList = {};
    $scope.store = {};

    $scope.dealsList = storeDeals;
	$scope.store = storeData;
	
	if($scope.store.phone.length == 0) {
        $scope.displayPhone = false;
        $scope.callBusiness = false;
    } else {
        $scope.displayPhone = true;
        $scope.callBusiness = true;
    }
	
	$scope.doesntHasStoreDeals = false;
	$scope.hasStoreDeals = false;
	
	if($scope.dealsList.length == 0) {
		$scope.doesntHasStoreDeals = true;
		$scope.hasStoreDeals = false;
	}
	else{
		$scope.doesntHasStoreDeals = false;
		$scope.hasStoreDeals = true;
	}
}]);

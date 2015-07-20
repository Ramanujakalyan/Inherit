var StoreViewMerchController = angular.module('StoreViewMerchController', []);

StoreViewMerchController.controller("StoreViewMerchController", ['$scope', 'storeDeals', 'storeData', 'storeAnalytics','LocalStorageService', '$ionicSlideBoxDelegate',
									 function($scope, storeDeals, storeData, storeAnalytics,LocalStorageService, $ionicSlideBoxDelegate){
	$scope.dealsList = storeDeals;
	$scope.store = storeData;
	$scope.analytics = storeAnalytics;
	
	LocalStorageService.set('mid', storeData.mid);


	$scope.$on('$ionicView.enter', function(){
    	$ionicSlideBoxDelegate.update();
  	})
		
	if(storeDeals.length == 0){
		$scope.hasFavDeals = true;
		$scope.favDealsList = false;
	}
	else{
		$scope.hasFavDeals = false;
		$scope.favDealsList = true;
	}
	
	if($scope.store.phone.length == 0) {
		$scope.displayNumber = false;
	} else {
		$scope.displayNumber = true;
	}
	
	$scope.underVerification = false;
	$scope.verified = false;
	$scope.inactive = false;

	if($scope.store.status == 'P') {
		$scope.underVerification = true;
	} else if ($scope.store.status == 'A') {
		$scope.verified = false;
	} else if ($scope.store.status == 'I') {
		$scope.inactive = false;
	} else {
		$scope.stat = false;
	}
	


}]);

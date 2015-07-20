var LocationController = angular.module('LocationController', []);

LocationController.controller("LocationController", ['$scope', 'getLocationData', 'ConnectionService', 'ToastService', 'LocalStorageService',
						 function($scope, getLocationData, ConnectionService, ToastService, LocalStorageService){
	

$scope.loc = getLocationData;
console.log($scope.loc);


$scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    });

$scope.getCatID = function() {
	var locationLID = this.location.lid;
	LocalStorageService.set('locationLID', locationLID);
}


}]);

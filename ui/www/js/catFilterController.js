var CatFilterController = angular.module('CatFilterController', []);

CatFilterController.controller("CatFilterController", ['$scope', 'catData', '$state', '$http', 'ConnectionService', 'ToastService',
						 function($scope, catData, $state, $http, ConnectionService, ToastService){
	
$scope.categoryList = catData;


$scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    });




}]);

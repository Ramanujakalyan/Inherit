var MallsListViewController = angular.module('MallsListViewController', []);

MallsListViewController.controller('MallsListViewController', ['$scope', 'mallsListData', 'ConnectionService', 'ToastService', function($scope, mallsListData, ConnectionService, ToastService){
	$scope.dealsList = {};
	$scope.dealsList = mallsListData;



$scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    });
 

}])

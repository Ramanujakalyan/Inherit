var CategoryController = angular.module("CategoryController", []);

CategoryController.controller("CategoryController", ['$scope', 'catData', 'CategoryService', 'catBrandsMallsService', 'LocalStorageService',
 '$window', 'ToastService', 'ConnectionService', function($scope, catData, CategoryService, catBrandsMallsService, LocalStorageService, $window, ToastService, ConnectionService){
 	
 	$scope.categoryList = {};
	$scope.categoryList = catData;

$scope.$on('$ionicView.beforeEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    })


	$scope.save = function(){
		
		var selectedCat = catBrandsMallsService.checkCat($scope.categoryList);
		var id = LocalStorageService.get('deviceUUID');
		if(selectedCat.selectedCatId.length > 0){
			var data = {
				"deviceUUID":id,
				"selectedCategories":selectedCat.selectedCatId
			};
			CategoryService.saveCategories(data);
			LocalStorageService.set("introStatus", "done");

		}
		else{
			ToastService.showMessage('You have to select atleast 1 category');
			return false;
		}
		
	}
}]);

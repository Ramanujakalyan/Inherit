var UserProfileController = angular.module('UserProfileController', []);

UserProfileController.controller("UserProfileController", ['$scope', 'userDemoData', 'userAnalyticsData', 'LocalStorageService', '$rootScope', function($scope, userDemoData, userAnalyticsData, LocalStorageService, $rootScope){
	
	$scope.userAnalytics = {};
	$scope.userDemoGraphics = {};
	$scope.userDemoGraphics = userDemoData;
	$scope.$on('$ionicView.enter', function(){
    $scope.userAnalytics = userAnalyticsData;
	$scope.userDemoGraphics = userDemoData;
	$scope.hasPic = false;
	$scope.defaultPic = false;
	
	if($scope.userDemoGraphics.profileImageUrl == null){
		$scope.defaultPic = true;
		$scope.hasPic = false;
	}
	else{
		$scope.hasPic = true;
		$scope.defaultPic = false;
	}
  	})

	
	
}]);

var IntroController = angular.module('IntroController', []);

IntroController.controller("IntroController", ['$scope', '$ionicSlideBoxDelegate', '$state', 
						'$cordovaGeolocation', '$ionicModal', 'ConnectionService', 'ToastService', 'DealsService', 'SplashService', 
						 function($scope, $ionicSlideBoxDelegate, $state, $cordovaGeolocation, $ionicModal, ConnectionService, ToastService, DealsService, SplashService){

	$scope.statsDataList = {};
	var options = {
			maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
		}
	$cordovaGeolocation.getCurrentPosition(options).then(
		function(pos){
			$scope.posIsAvail = true;
		},
		function(err){
			$scope.posIsAvail = false;
		}
	);
SplashService.getStats().then(function(statsData) {
  $scope.statsDataList = statsData;
  console.log($scope.statsDataList);
})
	

$scope.$on('$ionicView.beforeEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    })


	$ionicModal.fromTemplateUrl('templates/networkErrorModal.html', function (modal) {
		$scope.networkErrorModal = modal;
	},{
		scope: $scope,
		animation: 'slide-in-up',
		backdropClickToClose: false
	});

	$scope.closeModal = function(){
		$scope.networkErrorModal.hide();
		$scope.networkErrorModal.remove();
		$state.go('categoriesIntro');
	}

	$scope.nextSlide = function(){
		$ionicSlideBoxDelegate.next();
	}

	$scope.previousSlide = function(){
		$ionicSlideBoxDelegate.previous();
	}

	$scope.goToSplash = function(){
		$state.go('splash');
	}

	$scope.goToInterests = function(){
		$state.go('categoriesIntro');
	}

$scope.dealCacheView = DealsService.getDeals(false, 0, 10);
console.log($scope.dealCacheView);
   // navigator.splashscreen.hide();



}]);





IntroController.controller("SplashDealsController", ['$scope', '$ionicSlideBoxDelegate', '$state', 
						'$cordovaGeolocation', '$ionicModal', 'ConnectionService', 'ToastService', 'DealsService', 'SplashService', '$http', 'domainUrl', '$ionicLoading', '$window',
						 function($scope, $ionicSlideBoxDelegate, $state, $cordovaGeolocation, $ionicModal, ConnectionService, ToastService, DealsService, SplashService, $http, domainUrl, $ionicLoading, $window){

	$scope.statsDataList = {};
        $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
	$http.get(domainUrl + 'dealStats', {cache : true}).then(function(statsData) {
  $scope.statsDataList = statsData.data;
  //$state.go('deals.yourDeals');
  $ionicLoading.hide();	
 
})


$scope.nextSlide = function() {
  if (window.localStorage.getItem('isMerch') === 'true') {
    $state.go('merch.merchProfile');
  } else {
    $state.go('deals.yourDeals');
  }
}

	



/*	$ionicModal.fromTemplateUrl('templates/networkErrorModal.html', function (modal) {
		$scope.networkErrorModal = modal;
	},{
		scope: $scope,
		animation: 'slide-in-up',
		backdropClickToClose: false
	});

	$scope.closeModal = function(){
		$scope.networkErrorModal.hide();
		$scope.networkErrorModal.remove();
		$state.go('categoriesIntro');
	}

	$scope.nextSlide = function(){
		$ionicSlideBoxDelegate.next();
	}

	$scope.previousSlide = function(){
		$ionicSlideBoxDelegate.previous();
	}

	$scope.goToSplash = function(){
		$state.go('splash');
	}

	$scope.goToInterests = function(){
		$state.go('categoriesIntro');
	}

$scope.dealCacheView = DealsService.getDeals(false, 0, 10);
console.log($scope.dealCacheView);*/
   // navigator.splashscreen.hide();




}]);

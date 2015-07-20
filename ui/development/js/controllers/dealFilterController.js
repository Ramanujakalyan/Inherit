var DealFilterController = angular.module('DealFilterController', []);

DealFilterController.controller("DealFilterController", ['$scope', 'dealFilterData', 'carouselFilterData', '$state', '$stateParams','DealDetailService', '$ionicSlideBoxDelegate', 
						 function($scope, dealFilterData, carouselFilterData, $state, $stateParams, DealDetailService, $ionicSlideBoxDelegate){
	

$scope.deals = dealFilterData;
console.log($scope.deals);   

$scope.carousels = carouselFilterData;
console.log($scope.carousels); 

$scope.showDeals = true;
$scope.noDeals = false;
if($scope.deals.length == 0) {
$scope.showDeals = false;
$scope.noDeals = true;
} else {
$scope.showDeals = true;
$scope.noDeals = false;
}

$scope.$on('$ionicView.enter', function(){
    $ionicSlideBoxDelegate.update();
  })

/*$scope.noLocMsg = false;
if($scope.deals.length == 0) {
  $scope.noLocMsg = true;
}*/

$scope.moreDataCanBeLoaded = true;
  var startInitial = 0, startEnd = 10;
  var infStart = startEnd;
  var infEnd = infStart + startEnd;
 $scope.loadMore = function() {
      DealDetailService.getDealFilter($stateParams.cid, true, infStart, startEnd).then(function(data){
        
        if(data.length == 0){

          $scope.moreDataCanBeLoaded = false;
          return;
        }
        data.forEach(function(ele, index, array){
          $scope.deals.push(ele);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      infStart = infEnd;
      infEnd = infStart + startEnd;
      });
    };


}]);

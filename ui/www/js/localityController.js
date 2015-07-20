var LocalityController = angular.module('LocalityController', []);

LocalityController.controller("LocalityController", ['$scope', 'getLocalityData',
						 function($scope, getLocalityData){
	

$scope.locality = getLocalityData;
console.log($scope.locality);

}]);




LocalityController.controller("DealLocalityController", ['$scope', 'getDealLocalityData', 'DealDetailService', '$stateParams',
						 function($scope, getDealLocalityData, DealDetailService, $stateParams){
	

$scope.deals = getDealLocalityData;
console.log($scope.deals);

$scope.showDeals = true;
$scope.noDeals = false;
if($scope.deals.length == 0) {
$scope.showDeals = false;
$scope.noDeals = true;
} else {
$scope.showDeals = true;
$scope.noDeals = false;
}




$scope.moreDataCanBeLoaded = true;
  var startInitial = 0, startEnd = 10;
  var infStart = startEnd;
  var infEnd = infStart + startEnd;
 $scope.loadMore = function() {
      DealDetailService.getDealLocality($stateParams.lid, $stateParams.locId, true, infStart, startEnd).then(function(data){
        
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

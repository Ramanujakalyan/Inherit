var MallViewController = angular.module('MallViewController', ['angular-inview']);

MallViewController.controller("MallViewController", ['$scope', 'mallDeals', 'mallData','$http','$window','domainUrl','MallViewService','$stateParams','DealsService',
									 function($scope, mallDeals, mallData, $http, $window, domainUrl,MallViewService,$stateParams,DealsService){
	$scope.deals = mallDeals;
	
	$scope.mall = mallData;
	
	$scope.hasMallDeals = false; // Binds the saved deals
	$scope.mallDealsList = false;

	if(mallDeals.length == 0){
		$scope.hasMallDeals = true;
		$scope.mallDealsList = false;
	}
	else{
		$scope.hasMallDeals = false;
		$scope.mallDealsList = true;
	}
	
	
  $scope.getYourDealId = function() {
  var dealId = this.deal.dealId;
  
  var id = $window.localStorage.deviceUUID;
  $http.post(domainUrl + 'users/' + id + '/dealClick/' + dealId).success(function() {
                console.log('deal clicked');
            }).error(function(err) {
                console.log('deal not clicked');
            })
}


$scope.$on('$ionicView.enter', function(){
     
  })
  
  //var dealsList = new Set(); 

var dealImpressionsId = new Array();
var uniquedealImpressionsId = new Array();
$scope.getInfo = function() {
   dealImpressionsId.push(this.deal.dealId);
   

  uniquedealImpressionsId = dealImpressionsId.filter(function(elem, pos) {
    return dealImpressionsId.indexOf(elem) == pos;
  });
 
 }

$scope.$on('$ionicView.leave', function(){
    if(uniquedealImpressionsId.length == 0) {
    	
    } else {
  DealsService.postDealImpressions(uniquedealImpressionsId);
  

    }
});


 

$scope.moreDataCanBeLoaded = true;
  var startInitial = 0, startEnd = 10;
  var infStart = startEnd;
  var infEnd = infStart + startEnd;
 $scope.loadMore = function() {
      MallViewService.getDealsInMall($stateParams.id, true, infStart, startEnd).then(function(data){
        
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

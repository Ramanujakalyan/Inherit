var SearchController = angular.module("SearchController", []);


SearchController.controller("SearchController", ['$scope', '$location','LocalStorageService','domainUrl','$http','DealsService','$state','$rootScope','$stateParams',
 function($scope, $location,LocalStorageService,domainUrl,$http, DealsService,$state,$rootScope,$stateParams){


 
 			   $scope.moreDataCanBeLoaded = true;
				  var startInitial = 0, startEnd = 10;
				  var infStart = startEnd;
				  var infEnd = infStart + startEnd;

var x = (($stateParams.key));
var z = LocalStorageService.get('searchText');
$scope.deals = {};
$scope.deals = JSON.parse(x);
console.log($scope.deals);
$scope.mymsg = 'We found the following deals for your search ' + z;

if($scope.deals == '' || $scope.deals == null) {
	$scope.mymsg = 'Sorry, There are no deals for your search';
	$scope.searchText = '';
}

$scope.loadMore = function() {
	var searchText = LocalStorageService.get('searchText');
    	DealsService.getSearchResult(searchText, infStart, startEnd).then(function(data){
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
		;
    	});
    };

}]);

var ManageDealsController = angular.module('ManageDealsController', []);

ManageDealsController.controller("ManageDealsController", ['$scope', 'manageDealsData', 'domainUrl','$http', '$window',
						 function($scope, manageDealsData, domainUrl, $http, $window){
						 	
$scope.manageDeals = manageDealsData;
var id = $window.localStorage.deviceUUID;
console.log(id);
console.log($scope.manageDeals);
if(manageDealsData.length == 0){
		$scope.hasFavDeals = true;
		$scope.favDealsList = false;
	}
	else{
		$scope.hasFavDeals = false;
		$scope.favDealsList = true;
	}

$scope.checkActive = function() {
	
	var dealId = this.manageDeal.dealId;
	var data = {
		"dealId": dealId,
		"status": "A"
	}
	var id = window.localStorage.getItem('deviceUUID')
	var url = 'business/'+id+'/manageDeal';
	
	$http.post(domainUrl+url, data).success(function(){
                
               console.log('deals active');
               //$window.location.reload(true);
               $http.get('http://madzztest1-env.elasticbeanstalk.com/rest/business/' + id + '/deals').then(function(data){
               	$scope.manageDeals = data.data;
               	console.log($scope.manageDeals);
               })
            }).error(function (err) {

				    console.log('deals not updated active');
				    
			});
}

$scope.checkInactive = function() {
	
	var dealId = this.manageDeal.dealId;
	var data = {
		"dealId": dealId,
		"status": "I"
	}
	var id = window.localStorage.getItem('deviceUUID')
	var url = 'business/'+id+'/manageDeal';
	
	$http.post(domainUrl+url, data).success(function(){
                
               console.log('deals inactive');
               //$window.location.reload(true);
               $http.get('http://madzztest1-env.elasticbeanstalk.com/rest/business/' + id + '/deals').then(function(data){
               	$scope.manageDeals = data.data;
               	console.log($scope.manageDeals);
               })
            }).error(function (err) {

				    console.log('deals not updated inactive');
			});
}
}]);

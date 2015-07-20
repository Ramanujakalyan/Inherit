var FlashDealsController = angular.module('FlashDealsController', []);


FlashDealsController.controller("FlashDealsController", ['$scope', '$http', '$ionicLoading', '$ionicScrollDelegate',
						 function($scope, $http, $ionicLoading, $ionicScrollDelegate){
	



//$ionicLoading.show({template: 'blah'}, {delay: 20000});
$scope.loader = true;
$http.get('http://madzztest1-env.elasticbeanstalk.com/rest/deals').then(function(data){

console.log(data.data);
$scope.flash = data.data;
$scope.loader = false;
$ionicLoading.hide();

},function(err){
console.log(err);
})

}]);

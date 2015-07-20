var HomeController = angular.module('HomeController', []);

HomeController.value('counter', -1);

HomeController.controller("HomeController", ['$scope', '$http', '$ionicLoading', 'LocalStorageService', '$ionicPlatform', 'counter', '$interval',
						 function($scope, $http, $ionicLoading, LocalStorageService, $ionicPlatform, counter, $interval){
	


//$ionicLoading.show({template: 'Load'});
//$scope.loader = true;


$ionicPlatform.on('resume', function(){
	$scope.loader = true;
$http.get('http://madzztest1-env.elasticbeanstalk.com/rest/users/n2CYaW6Y8hxmJSR7/userActivityFeed').then(function(data){

console.log(data.data);
//$scope.activity = data.data;
LocalStorageService.setObject('activity', JSON.stringify(data.data));
$scope.loader = false;

},function(err){
console.log(err);
})

});
console.log(LocalStorageService.getObject('activity'));

var activity = LocalStorageService.getObject('activity');
activity = JSON.parse(activity);
//$scope.activity = activity;


$scope.activity = new Array();
$scope.activity.push(activity[1],activity[2],activity[3]);
console.log($scope.activity);
var i = counter;
$interval(function(){
if(i<5){
counter = i++;
$scope.activity.unshift(activity[i]);
//console.log($scope.activity);
//console.log(counter);
} else {
counter = i--;
$scope.activity.unshift(activity[i]);
//console.log($scope.activity);
//console.log(counter);
}
},3000)
}]);



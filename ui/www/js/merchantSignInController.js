var merchantSignInController = angular.module("merchantSignInController", []);

merchantSignInController.controller("merchantSignInController",['$scope','domainUrl','$http','$state', '$window',
								 function($scope,domainUrl,$http,$state,$window){
								 
	
	
	
$scope.signIn = function(){
	//$state.go('adminview');
	// alert(domainUrl);
	
	var emailId = this.email;
	var userPassword = this.password;
	// var ugid;
	

	$http.post(domainUrl + 'merchant/'+emailId+ '/'+userPassword+'/roles').success(function(data){
		
		console.log(data);
		if(data.businessId == 0){
			alert('please give correct credentials');
		}
		
		if(data.roleId == 1){
		$state.go('adminview');
		window.localStorage['MerchantId'] = data.businessId;
		}
	}).error(function(){
		alert('failure');
	})	
}	

}]);
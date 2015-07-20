var addUserController = angular.module("addUserController", []);

addUserController.controller("addUserController",['$scope','$ionicModal','$http', '$window','domainUrl','catBrandsMallsService','$state','LocalStorageService',
								 function($scope,$ionicModal,$http,$window,domainUrl,catBrandsMallsService,$state,LocalStorageService){

								 
								 $scope.btnCity = true;
								 $scope.btnLocality = true;
$ionicModal.fromTemplateUrl('templates/userType.html', function (modal) {
	$scope.userType = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$ionicModal.fromTemplateUrl('templates/locationModal.html', function (modal) {
	$scope.locationModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$ionicModal.fromTemplateUrl('templates/localityModal.html', function (modal) {
	$scope.localityModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$scope.adminAddUser = function(){
	$state.go('addUser');
	
}


$scope.adminEditUser = function(){
	$state.go('editUser');
	
}


$scope.adminCreateStore = function(){
	$state.go('createStore');
	
}


$scope.adminEditStore = function(){
	$state.go('editStore');
	
}

	$scope.userTypeJason = [{'role_id' : '1', 'role_description' : 'Merchant Super User'},
	{'role_id' : '2', 'role_description' : 'MARKETING USER'},
	{'role_id' : '3', 'role_description' : 'RETAIL USER'},
	{'role_id' : '4', 'role_description' : 'STORE USER'}];	
var grpId = 1;	
$scope.userType1 = function(){
	$scope.userType.show();
	
} 

var selectedUserType;

$scope.locationList = new Array();
$scope.clkRadio = function() {
	
	selectedUserType = this.category.role_id;
	alert(selectedUserType);
}

// Send user type and mid recieve locations.
 
//var merchId = window.localStorage['MerchantId'] ;
$scope.doneuserType = function(){

	if(selectedUserType != 4){
		
		$scope.showBiz = false;
	}
	else{
		
		$scope.showBiz = true;
	}
	if(selectedUserType == 1){
		$scope.btnCity = false;
		$scope.btnLocality = false;
		
		
	}else{
		$scope.btnCity = true;
		$scope.btnLocality = true;
		
	}
	// post a request for location.'+merchId+' 
	$http.post(domainUrl + 'merchant/'+grpId+'/locations').success(function(data){
		
		
		$scope.locationList = data;
		
		console.log(data);
	})
	// if($scope.btnUpdate){
		
		// // Prepopulated locations
		// for (var i = 0; i < $scope.locationList.length; i++) {
			// for(var j  = 0; j <editMerchLocality.length;j++){
			  // if(editMerchLocality[j].locationId == $scope.locationList[i].lid) 
			  // {
				  // alert('ssssss');
				  // $scope.locationList[i].checked = true;
			  // }
			// }
		// }
		
	// }
	
	$scope.userType.hide();
}


$scope.showCity = function(){
	
	$scope.locationModal.show(); 
}


// Send locations recieve locality.

var selectedLocations = new Array();
$scope.LocalityList = new Array();
var locArray = new Array();

$scope.doneLocation = function(){
	
	
	
	selectedLocations = catBrandsMallsService.checkLocation($scope.locationList);
	
	
	
	if(selectedLocations.selectedLocationId.length == 0){
		alert('select atleaset one location');
	}
	
	
	
	locArray = selectedLocations.selectedLocationId;
	console.log(locArray)
	//  '+merchId+'
	$http.post(domainUrl+'merchant/'+grpId+'/locality',locArray).success(function(data){
		
		console.log(data);
		$scope.localityList = data;
	})
	
	
	 
	
	
	$scope.locationModal.hide(); 
	
}

$scope.showLocality = function(){
	$scope.localityModal.show();
}




// send locality recieve business.
$scope.businessList = new Array();
var localityArray = new Array();

var userDetails = new Array();
$scope.doneLocality = function(){
	
	
	
	
	
	 selectedLocality = catBrandsMallsService.checkLocality($scope.localityList);
		 
	  localityArray = selectedLocality.selectedLocalityId;
	  
	  
	  userDetails = {
			
			"localityId":localityArray,
			"businessStoreGroupId":grpId
		};
	 console.log(userDetails);
	 $http.post(domainUrl + 'merchant/businessDetails',userDetails).success(function(data){
		
		console.log(data);
		$scope.businessList = data;
	})
	
	
	
	
	
	$scope.localityModal.hide();
	
}






// Add pirticular user.
var merId;
var tempLid;
var tempLocalityId = new Array();
$scope.selectStore = function(){
	
	grpId = this.business.mid;
	tempLid = this.business.lid;
	tempLocalityId[0] = this.business.localityId;
	alert(tempLocalityId[0]);
	alert(tempLocalityId);
	alert(merId);
	
	localityArray = tempLocalityId;
	alert(localityArray);
	
}

$scope.addUser = function(){
	alert(localityArray);
	var userAddingList = {
		
		"roleId":selectedUserType,
		"displayName":this.userName,
		"loginEmail":this.email,
		"loginPassword":this.password,
		"localityId":localityArray,
		//"businessId":merId,
		"contactNumber":this.phone,
		"businessStoreGroupId":grpId,
		"uuid":'xd47fiou3fgn23754'
	}
	console.log(userAddingList);
	
	$http.post(domainUrl + 'merchant/create',userAddingList).success(function(){
		alert('inserted');
		$state.go('adminView');
	
	})
	
	
	
	
}


// EDIT USER '+ merchId
var grpid = 0;



$scope.showUsers = function(){
	
	var editingDetails = {	
	"businessStoreGroupId":grpId
}


	$http.post(domainUrl + 'merchant',editingDetails).success(function(data){
		
		console.log(data);
		$scope.userList = data;
	})
	
}

var editedUserDetails = new Array(); 
var editMerchLocality = new Array();
 
$scope.editHim = function(){
	
	//enable delete and update button
	
	

	
	
	editedUserDetails = {
		"displayName":this.user.displayName,
		"merchantId":this.user.merchantId,
		"roleId":this.user.roleId,
		"roleName":this.user.roleName,
		"merchantLocation":this.user.merchantLocationDTOList,
		"email":this.user.loginEmail
}
		
	LocalStorageService.setObject('editedDetail',editedUserDetails);
	
	$state.go('editedUser');
	 
	
	
	
}

				 
								 
								 
}]);
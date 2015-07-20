var editUserController = angular.module("editUserController", []);

editUserController.controller("editUserController",['$scope','$ionicModal','$http', '$window','domainUrl','catBrandsMallsService','LocalStorageService',
								 function($scope,$ionicModal,$http,$window,domainUrl,catBrandsMallsService,LocalStorageService){

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
								 
								 
var editedUserDetails = LocalStorageService.getObject('editedDetail');
//console.log(editedUserDetails);
$scope.userName = editedUserDetails.displayName;
$scope.email = editedUserDetails.email;
var merId = editedUserDetails.merchantId;
var LocationArr = new Array();
var LocalityArr = new Array();
var tempLoc = editedUserDetails.merchantLocation;


tempLoc.forEach(function(item,index,array){
	LocationArr.push(item.locationId);
	LocalityArr.push(item.localityId);
	
});




$scope.userTypeJason = [{'role_id' : '1', 'role_description' : 'Merchant Super User'},
	{'role_id' : '2', 'role_description' : 'MARKETING USER'},
	{'role_id' : '3', 'role_description' : 'RETAIL USER'},
	{'role_id' : '4', 'role_description' : 'STORE USER'}];	
var grpId = 1;
var selectedUserType = editedUserDetails.roleId;	
$scope.userType1 = function(){
	
	//Prepopulated User Type.
		for (var i = 0; i < $scope.userTypeJason.length; i++) {
			
			  if(editedUserDetails.roleId == $scope.userTypeJason[i].role_id) 
			  {
				 
				  $scope.userTypeJason[i].checked = true;
				  selectedUserType = $scope.userTypeJason[i].role_id;
				 
				 
			  }
			
		}
		$scope.userType.show();
	
	
} 



$scope.locationList = new Array();

$scope.clkRadio = function() {
	
	selectedUserType = this.category.role_id;
	alert(selectedUserType);
}

// Send user type and mid recieve locations.
 
//var merchId = window.localStorage['MerchantId'] ;
$scope.doneuserType = function(){
alert(selectedUserType);
	if(selectedUserType != 4){
		alert('sss');
		$scope.showBiz = false;
	}
	else{
		alert('nnn');
		$scope.showBiz = true;
	}
	
	
	$scope.userType.hide();
}


$scope.showCity = function(){
	
	
	// post a request for location.'+merchId+' 
	$http.post(domainUrl + 'merchant/'+grpId+'/locations').success(function(data){
		
		
	$scope.locationList = data;
	
	
	// alert($scope.locationList.length);
	// alert(LocationArr.length);
	// alert($scope.locationList[0].locationId);
	// alert(LocationArr[0]);
	
	
	
	// Prepopulated locations.
		for (var i = 0; i < $scope.locationList.length; i++) {
			
			for(var j  = 0; j <LocationArr.length;j++){
				
				//LocationArr[j].locationId
			  if($scope.locationList[i].locationId == LocationArr[j] ) 
			  {
				 
				  $scope.locationList[i].checked = true;
			  }
			}
		}
		$scope.locationModal.show(); 
		
	})
	
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
	
	
	
	 
	
	
	$scope.locationModal.hide(); 
	
}

$scope.showLocality = function(){
	
	$http.post(domainUrl+'merchant/'+grpId+'/locality',locArray).success(function(data){
		
		console.log(data);
		$scope.localityList = data;
		
		
		
		
		// Prepopulated locations.
		for (var i = 0; i < $scope.localityList.length; i++) {
			
			for(var j  = 0; j <LocalityArr.length;j++){
				
				//LocationArr[j].locationId
			  if($scope.localityList[i].localityId == LocalityArr[j] ) 
			  {
				  
				  $scope.localityList[i].checked = true;
			  }
			}
		}
		
			$scope.localityModal.show();
	})

}




// send locality recieve business.
$scope.businessList = new Array();
var localityArray = new Array();

localityArray = LocalityArr;
var userDetails = new Array();

var merId;
var tempLid;
var tempLocalityId = new Array();


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
		
		for (var i = 0; i < $scope.businessList.length; i++) {
			
			  if(editedUserDetails.roleId == $scope.businessList[i].role_id) 
			  {
				 
				  $scope.businessList[i].checked = true;
				  selectedUserType = $scope.businessList[i].role_id;
				 
				 
			  }
			
		}
		
		
		if(selectedUserType != 4){
			
			$scope.showBiz = false;
		}
		else{
			
			$scope.showBiz = true;
		}
			
			
			$scope.localityModal.hide();
		})
	
	
	
}


// Add pirticular user.




$scope.selectStore = function(){
	
	grpId = this.business.mid;
	tempLid = this.business.lid;
	tempLocalityId[0] = this.business.localityId;
	
	
	localityArray = tempLocalityId;
	
	
}



$scope.updateUser = function(){
	
	
	
	var userUpdatingList = {
		
		"roleId":selectedUserType,
		"displayName":this.userName,
		"loginEmail":this.email,
		//"loginPassword":this.password,
		"localityId":localityArray,
		"merchantId":merId,
		"businessStoreGroupId":grpId,
		//"uuid":'xd47ywsd3bn23754'
	}
	console.log(userUpdatingList);
	
	$http.post(domainUrl + 'merchant/update',userUpdatingList).success(function(){
		alert('updated');
	
	})
	
	
}

$scope.deleteUser = function(){
	
	userDeletingList = {
		"merchantId":merId,
		"loginEmail":this.email
		
	}
	
	$http.post(domainUrl + 'merchant/delete',userDeletingList).success(function(){
		alert('deleted');
	
	})
	
}





		
								 
}]);
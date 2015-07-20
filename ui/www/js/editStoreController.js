var editStoreController = angular.module("editStoreController", []);

editStoreController.controller("editStoreController",['$scope', '$ionicModal','$http','domainUrl','DealDetailService','catBrandsMallsService','$window','LocalStorageService','$state',
								 function($scope,$ionicModal,$http,domainUrl,DealDetailService,catBrandsMallsService,$window,LocalStorageService,$state){
								 
							var storeDetails = LocalStorageService.getObject('editedStoreDetail');	 
								 
console.log(storeDetails);

$scope.userName = storeDetails.displayName;
$scope.Address = storeDetails.address;
$scope.phone = storeDetails.phone;
$scope.pincode = storeDetails.pincode;
var selectedLocation = storeDetails.lid;
var selectedLocalityId = storeDetails.locId;
var selectedMalls = storeDetails.mallId;

//LOCATION STUFF
var cityValue ;
$scope.showCity = function(){
	
	DealDetailService.getLocation().then(function(data){
		console.log(data);
		$scope.locationList = data;
		
		alert($scope.locationList[1].lid);
		
		for (var i = 0; i < $scope.locationList.length; i++) {
			  if(storeDetails.lid == $scope.locationList[i].lid) 
			  {
				  $scope.locationList[i].checked = true;
				  selectedLocation = $scope.locationList[i].lid;
			  }
		}
	})

	$scope.radioCityModal.show();	

}
var selectedLocation ;
$scope.clkCity = function(){
	selectedLocation = this.location.lid;
	
}
$scope.doneLocation = function(){
	
	
	$scope.radioCityModal.hide();
	
}





// LOCALITY STUFF
$scope.showLocality = function(){
	DealDetailService.getLocality(selectedLocationId).then(function(data){
		console.log(data);
		$scope.localityList = data;
		alert($scope.localityList[1].localityId);
		for (var i = 0; i < $scope.localityList.length; i++) {
			  if(storeDetails.locId == $scope.localityList[i].localityId) 
			  {
				  $scope.localityList[i].checked = true;
				  selectedLocality = $scope.localityList[i].lid;
			  }
		}
		
		
	})
	$scope.radioLocalityModal.show();
	
	
}
var selectedLocality ;
$scope.clkLocality = function(){
	selectedLocality = this.locality.locId;
	
}
$scope.doneLocality = function(){
	
	
	$scope.radioLocalityModal.hide();
	
}



//CATEGORY STUFF
$scope.categoryList = new Array();
var catArray = new Array();
$scope.showCategory = function(){
	$http.get(domainUrl + 'categories').success(function(data){
		console.log(data);
		$scope.categoryList = data;
		
		
		for (var i = 0; i < $scope.categoryList.length; i++) {
			
			for(var j  = 0; j <catArr.length;j++){
				
				//LocationArr[j].locationId
			  if($scope.categoryList[i].locationId == catArr[j] ) 
			  {
				 
				  $scope.categoryList[i].checked = true;
			  }
			}
		}
		
	})
	
	$scope.catModal.show();
	
}
$scope.doneCat = function(){
	
	selectedCategories = catBrandsMallsService.checkCat($scope.categoryList);
	catArray = selectedCategories.selectedCatId;
	console.log(selectedCategories);
	$scope.catModal.hide();
	
}




//BRAND STUFF
$scope.selMerchBrands = new Array();
var brandArray = new Array();
var id;
$scope.showBrand = function(){
	
	id = $window.localStorage.deviceUUID;
	var bid = selectedCategories.selectedCatId;
	
	$http.get(domainUrl + 'business/' + id + '/categories/' + bid + '/brands').then(function(res) {
      
      var selectedMerchBrands = JSON.parse(JSON.stringify(res));
      $scope.selMerchBrands = selectedMerchBrands.data;
	  
	  
	  for (var i = 0; i < $scope.selMerchBrands.length; i++) {
			
			for(var j  = 0; j <brandArr.length;j++){
				
				//LocationArr[j].locationId
			  if($scope.selMerchBrands[i].locationId == brandArr[j] ) 
			  {
				 
				  $scope.selMerchBrands[i].checked = true;
			  }
			}
		}
      
    })
	
	$scope.brandsModal.show();
	
	
}

$scope.doneBrands = function(){
	
	
	selectedBrands = catBrandsMallsService.checkBrands($scope.selMerchBrands);
	brandArray = selectedBrands.selectedBrandId;
	console.log(selectedBrands);
	
	
	$scope.brandsModal.hide();
	
}




//MALL STUFF
$scope.mallsList  = new Array();

$scope.showMall = function(){
	$http.get(domainUrl +'malls/location/'+selectedLocation).success(function(data){
		
		$scope.mallsList = data;
		console.log(data);
		
		for (var i = 0; i < $scope.mallsList.length; i++) {
			  if(storeDetails.mallId == $scope.mallsList[i].localityId) 
			  {
				  $scope.mallsList[i].checked = true;
				  selectedMalls = $scope.mallsList[i].lid;
			  }
		}
		
		
	})
	
	$scope.mallsModal.show();
	
	
}

$scope.doneMall = function(){
	selectedMalls = catBrandsMallsService.checkMalls($scope.mallsList);
	
	$scope.mallsModal.hide();
	
	
}
	
	
	
	

	
	
	
	
	
	
	

	
								  }]);
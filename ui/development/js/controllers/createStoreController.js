var createStoreController = angular.module("createStoreController", []);

createStoreController.controller("createStoreController",['$scope', '$ionicModal','$http','domainUrl','DealDetailService','catBrandsMallsService',
'$window','LocalStorageService','$state',
								 function($scope,$ionicModal,$http,domainUrl,DealDetailService,catBrandsMallsService,$window,LocalStorageService,$state){
	
// UPLOAD PHOTo TO S3.
$scope.files = {
  first : ''
};

	
$ionicModal.fromTemplateUrl('templates/radioCityModal.html', function (modal) {
	$scope.radioCityModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});	

$ionicModal.fromTemplateUrl('templates/radioLocalityModal.html', function (modal) {
	$scope.radioLocalityModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});	
$ionicModal.fromTemplateUrl('templates/catModal.html', function (modal) {
	$scope.catModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});
$ionicModal.fromTemplateUrl('templates/brandsModal.html', function (modal) {
	$scope.brandsModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$ionicModal.fromTemplateUrl('templates/mallsModal.html', function (modal) {
	$scope.mallsModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});
var grpId = 1;

//LOCATION STUFF
var cityValue ;
$scope.showCity = function(){
	
	DealDetailService.getLocation().then(function(data){
		console.log(data);
		$scope.locationList = data;
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
	DealDetailService.getLocality(selectedLocation).then(function(data){
		console.log(data);
		$scope.localityList = data;
		
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
	})
	
	$scope.mallsModal.show();
	
	
}
var selectedMalls;
$scope.doneMall = function(){
	selectedMalls = catBrandsMallsService.checkMalls($scope.mallsList);
	
	$scope.mallsModal.hide();
	
	
}








$scope.addStore = function(){
	var merAddress = this.Address;
	var name = this.userName;
	var pin = this.pincode;
	var phone = this.phone;
	
	var latitude;
	var longitude;
	var latLngAddress = merAddress.replace(" ","+");
	$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ latLngAddress +'+'+this.pincode).success(function(data){
		console.log(data);
		latitude = data.results[0].geometry.location.lat;
		longitude = data.results[0].geometry.location.lng;
		var imgUrl = $scope.files.first;
		
		var addingStore = {
			"storeGroupId":grpId,
			"name":name,
			"displayName":name,
			"address":merAddress,
			"pincode":pin,
			"phone":phone,
			"lid":selectedLocation,
			"localityId":selectedLocality,
			"isPrimaryStore":'N',
			"selectedCategories":catArray,
			"selectedBrands":brandArray,
			"imageUrl":imgUrl,
			"latitude":latitude,
			"longitude":longitude,
			"deviceUUID":id,
			"flag":false
			
		}
		console.log(addingStore);
		
		$http.post(domainUrl +'business/create',addingStore).success(function(data){
			
			console.log(data);
			alert('success');
			
			if(data == null || data == ''){
				//NO DUPLICATE.
				
				
			}else{
				
				alert('Duplicate');
			}
		})
		
	})
	
}




//EDIT STORE.

$scope.showStores = function(){
	
	$http.get(domainUrl + 'business/stores/'+grpId).success(function(data){
		
		console.log(data);
		$scope.storeList = data;
		
		
	})
	
	
	
}

$scope.editIt = function(){
	var catArr = new Array();
	var brandArr = new Array();
	for(var i = 0; i<this.selectedCategoriesList.length; i++){
		 catArr.push(this.selectedCategoriesList[i].cid);
	}
	for(var i = 0; i<this.selectedBrandsList.length; i++){
		 brandArr.push(this.selectedBrandsList[i].cid);
	}
	var editedStoreDetails = {
		"address":this.store.address,
		"displayName":this.store.displayName,
		"phone":this.store.phone,
		"pincode":this.store.pincode,
		"locId":this.store.locId,
		"mallId":this.store.mallId,
		"lid":this.store.lid,
		"selectedCategory":catArr,
		"selectedBrand":brandArr,
		"selectedMall":this.mallId
	} 
	
	
	LocalStorageService.setObject('editedStoreDetail',editedStoreDetails);
	
	$state.go('editedStore');
	
	
	

	
}




	
									 
 }]);
									  
									  
								  
								  
var MerchantSettingsController = angular.module('MerchantSettingsController', []);

MerchantSettingsController.controller("MerchantSettingsController", [
	'$scope', '$http', '$state', '$ionicModal', 'catData', '$cordovaGeolocation',
 	'brandsData', 'mallsData', 'domainUrl', '$cordovaDevice', 'catBrandsMallsService', 'businessData','businessSelectedData','$window',
 	function($scope, $http, $state, $ionicModal, catData, $cordovaGeolocation, 
 	brandsData, mallsData, domainUrl, $cordovaDevice, catBrandsMallsService, businessData,businessSelectedData,$window){

 		var selectedCat = new Object();
		var selectedBrands = new Object();
		var selectedMalls = new Object();
		var lat = null;
		var lng = null;
		var isChecked = false;
		var globAddress = null;
	  	$scope.Wantsgecoding = false;
	  	$scope.categoryList = catData;
        $scope.selectedCat = businessSelectedData;
		$scope.mallsList = mallsData;
		$scope.brandList = brandsData;

		$scope.catButton = "Select Your Categories";
		$scope.brandButton = "Select Your Brands";
		$scope.mallButton = "Select Your Mall";
		var isInMall = null;

		$scope.businessSettingsSelectedCat = new Array();
		$scope.businessSettingsSelectedCatId = new Array();
		  for(var i = 0; i < businessData.selectedCategoriesList.length; i++) {
		    
		    $scope.businessSettingsSelectedCat.push(businessData.selectedCategoriesList[i].cname);
		    $scope.businessSettingsSelectedCatId.push(businessData.selectedCategoriesList[i].cid);
		  }

		$scope.businessSettingsSelectedBrands = new Array();
		$scope.businessSettingsSelectedBrandsId = new Array();
		  for(var j = 0; j < businessData.selectedBrandsList.length; j++) {
		    
		    $scope.businessSettingsSelectedBrands.push(businessData.selectedBrandsList[j].brandName);
		    $scope.businessSettingsSelectedBrandsId.push(businessData.selectedBrandsList[j].bid);
		  }

		$scope.businessSettingsMallId = businessData.mallId;

		
 		$scope.businessData = {
 			name : businessData.name || "",
 			displayName : businessData.displayName || "",
 			email : businessData.email || "",
 			phone : businessData.phone || "",
			address : businessData.address || "",
 			pincode : businessData.pincode || "",
 			street : businessData.street || "",
			catButton : $scope.businessSettingsSelectedCat.toString() || "",
			brandButton : $scope.businessSettingsSelectedBrands.toString() || "Others",
			mallButton : businessData.mallName || ""
 		};


if ($scope.selectedCat.length > 0) {
            var tmpMap = new Array();
            
            for (var j = 0; j < $scope.selectedCat.length; j++) {
                if(!tmpMap[$scope.selectedCat[j].cid]) {
                    tmpMap[$scope.selectedCat[j].cid] = $scope.selectedCat[j].cid;
                                    

                }
            }
            $scope.checkedCatTmp = tmpMap;
            
            for (var j = 0; j < $scope.categoryList.length; j++) {
                

                if (tmpMap[$scope.categoryList[j].cid]) {
                    $scope.categoryList[j].checked = true;
                    
                 
                }

            }

        } else {
            console.log('Nothing..');
        }


 		
 		/*$scope.foo = {
 			baz : businessData.displayName || "Enter Display Name"
 		}; 
 		$scope.businessData = {
 			email : businessData.email || "Enter Business Email"
 		};
 		$scope.businessData = {
 			phone : businessData.phone || "Enter your phone number"
 		};
 		$scope.businessData = {
 			street : businessData.street || "Enter Street Number"
 		};

 		$scope.businessData = {
 			location : businessData.address || "Enter Your Locality"
 		};

 		$scope.businessData = {
 			pincode : businessData.pincode || "Enter Your Pincode"
 		};*/

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

$ionicModal.fromTemplateUrl('templates/businessSettingsBrandsModal.html', function (modal) {
  $scope.businessSettingsBrandsModal = modal;
},{
  scope: $scope,
  animation: 'slide-in-up',
  backdropClickToClose: false
});



$ionicModal.fromTemplateUrl('templates/networkErrorModal.html', function (modal) {
	    	$scope.networkErrorModal = modal;
	},{
	  		scope: $scope,
	    	animation: 'slide-in-up',
	    	backdropClickToClose: false
	});

    $scope.getCord = function(chkBoxValue){
    	
    	isChecked = true;
    	if(chkBoxValue == true){
    		$cordovaGeolocation.getCurrentPosition().then(function (position) {
        	lat = position.coords.latitude;
        	lng = position.coords.longitude;
        	var latlng = new google.maps.LatLng(lat.toFixed(9), lng.toFixed(9));
        	var geocoder = new google.maps.Geocoder();
        	geocoder.geocode({'latLng': latlng}, function(results, status) {
				    	if (status == google.maps.GeocoderStatus.OK) {
				      	if (results[1]) {
				        	globAddress = results[1].formatted_address;
				      	} else {
				        	console.log('No results found');
				        	
				      	}
				    	} else {
				      	console.log('Geocoder failed due to: ' + status);
				      	
				    	}	
  					});
    		}, function(err){
    			$scope.networkErrorModal.show();
    		}, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
    	}
    		else{
    			;
    		}
    }

    $scope.doneCat = function(){
	
	$scope.catModal.hide();
	selectedCat = catBrandsMallsService.checkCat($scope.categoryList);
	if(selectedCat.selectedCatId.length == 0){
		$scope.hasSelectedCat = true;
		$scope.businessData.catButton = "Select Deal Categories";
    	selectedCat.selectedCatId = [];
	}
	else{
		$scope.hasSelectedCat = false;
		$scope.businessData.catButton = selectedCat.selectedCatName;
    var selId = selectedCat.selectedCatId;
    
    var id = $window.localStorage.deviceUUID;

    $http.get(domainUrl + 'business/' + id + '/categories/' + selId+ '/brands').then(function(res) {
      
      var selectedBrands = JSON.parse(JSON.stringify(res));
      $scope.selBrands = selectedBrands.data;
      
    }, function(err) {
      console.log(err);
    }
    )
	}
}

/*$scope.doneBrands = function(){
	$scope.brandsModal.hide();
	selectedBrands = catBrandsMallsService.checkBrands($scope.brandList);
	if(selectedBrands.selectedBrandName.length == 0){
		$scope.brandButton = "Select related brands";
    	selectedBrands.selectedBrandId = [];
	}
	else{
		$scope.brandButton = selectedBrands.selectedBrandName;

	}
}*/

$scope.doneSelectedBrand = function() {
  $scope.businessSettingsBrandsModal.hide();
  selectedBrands = catBrandsMallsService.businessSelCheckBrands($scope.selBrands);
  if(selectedBrands.selectedBrandName.length == 0){
    $scope.businessData.brandButton = "Select related brands";
    selectedBrands.selectedBrandId = [];
  }
  if(selectedBrands.selectedBrandName == ''){
    $scope.businessData.brandButton = "Others";
    selectedBrands.selectedBrandId = [];
  }
  else{
    $scope.businessData.brandButton = selectedBrands.selectedBrandName;

  }

}


$scope.doneMall = function(){
	$scope.mallsModal.hide();
	selectedMalls = catBrandsMallsService.checkMalls($scope.mallsList);
	if(selectedMalls.selectedMallsName.length == 0){
		$scope.businessData.mallButton = "Select Your Mall";
		isInMall = 0;
	}
	else{
		$scope.businessData.mallButton = selectedMalls.selectedMallsName;
		isInMall = 1;

	}
}


	/*$scope.submitData = function(business, validity){
		var id = window.localStorage.getItem('deviceUUID')
		console.log(id)
		if(!validity){
			console.log("Invalid form");
			return false;
		}
		else{
			var merch = angular.copy(business);
			var address = null;
			if(globAddress == null){
				address = merch.location.formatted_address || businessData.address;
			}
			else{
				address = globAddress;
			}
			

			var businessData = {
		    	"deviceUUID": id,
		    	"isInMall": isInMall,
		    	"lat":lat,
		    	"lng":lng,
		    	"name":merch.name,
		    	"displayName":merch.displayName,
		    	"email":merch.email,
		    	"pincode":merch.pincode,
		    	"phone":merch.phone,
		    	"address": address,
		    	"selectedCategories":selectedCat.selectedCatId,
		    	"selectedBrands":selectedBrands.selectedBrandId,
		    	"mallId":selectedMalls.selectedMallsId
			}
		}
		console.log(JSON.stringify(businessData))
	

   

		$http.post(domainUrl+'business', businessData).success(function(){
                
                $state.go('merch.merchProfile')
            }).error(function (data, status, headers, config) {

				        console.log(data);
				        console.log(status);
				        console.log(headers);
				        console.log(JSON.stringify(config));
			});
	}*/





$scope.submitData = function(business, validity){
		var id = window.localStorage.getItem('deviceUUID')
		console.log(id)
		if(!validity){
			console.log("Invalid form");
			return false;
		}
		else{
			var merch = angular.copy(business);
			console.log(merch);
			var address = null;
			if(globAddress == null){
				address = merch.address;
			}
			else{
				address = globAddress;
			}
		

			var businessData = {
		    	"deviceUUID": id,
		    	"isInMall": isInMall,
		    	"lat":lat,
		    	"lng":lng,
		    	"name": merch.name,
		    	"displayName":merch.displayName,
		    	"email":merch.email,
		    	"pincode":merch.pincode,
		    	"phone":merch.phone,
		    	"address": address,
		    	"selectedCategories":selectedCat.selectedCatId || $scope.businessSettingsSelectedCatId,
		    	"selectedBrands":selectedBrands.selectedBrandId || $scope.businessSettingsSelectedBrandsId,
		    	"mallId":selectedMalls.selectedMallsId || $scope.businessSettingsMallId
			}
		}
		console.log(JSON.stringify(businessData))
	

   

		$http.post(domainUrl+'business', businessData).success(function(){
                
                $state.go('merch.merchProfile')
            }).error(function (data, status, headers, config) {

				        console.log(data);
				        console.log(status);
				        console.log(headers);
				        console.log(JSON.stringify(config));
			});
	}


						 	

}]);

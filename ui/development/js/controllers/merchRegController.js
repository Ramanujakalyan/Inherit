var MerchRegController = angular.module('MerchRegController', []);

MerchRegController.controller("MerchRegController", ['$scope', '$http', '$state', '$ionicModal', 'catData', '$cordovaGeolocation',
 'brandsData', 'mallsData', 'domainUrl', '$cordovaDevice', 'catBrandsMallsService', '$window','businessSelectedData',
 'LocalStorageService','$location', function($scope, $http, $state, $ionicModal, catData,
  $cordovaGeolocation, brandsData, mallsData, domainUrl, $cordovaDevice, catBrandsMallsService, $window,businessSelectedData,
  LocalStorageService, $location){
  	
  	$scope.files = {
  first : ''
};

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

$ionicModal.fromTemplateUrl('templates/networkErrorModal.html', function (modal) {
	    	$scope.networkErrorModal = modal;
	},{
	  		scope: $scope,
	    	animation: 'slide-in-up',
	    	backdropClickToClose: false
	});

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

    $scope.getCord = function(chkBoxValue){
    	
    	isChecked = true;
    	if(chkBoxValue == true){
    		$cordovaGeolocation.getCurrentPosition().then(function (position) {
        	lat = position.coords.latitude;
        	lng = position.coords.longitude;
        	/*var latlng = new google.maps.LatLng(lat.toFixed(9), lng.toFixed(9));
        	var geocoder = new google.maps.Geocoder();
        	geocoder.geocode({'latLng': latlng}, function(results, status) {
				    	if (status == google.maps.GeocoderStatus.OK) {
				      	if (results[1]) {
				        	globAddress = results[1].formatted_address;
				      	} else {
				        	alert('No results found');
				        	
				      	}
				    	} else {
				      	alert('Geocoder failed due to: ' + status);
				      	
				    	}	
  					});*/
    		}, function(err){
    			$scope.networkErrorModal.show();
    		}, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
    	}
    		else{
    			;
    		}
    }

$scope.selMerchBrands = {};

    $scope.doneCat = function(){
		
	$scope.catModal.hide();
	selectedCat = catBrandsMallsService.checkCat($scope.categoryList);
	
	var bid = selectedCat.selectedCatId;
	
	if(selectedCat.selectedCatId.length == 0){
		$scope.hasSelectedCat = true;
		$scope.catButton = "Select Your Categories";
    	selectedCat.selectedCatId = [];
	}
	else{
		$scope.showCat = false;
		$scope.catButton = selectedCat.selectedCatName;
		var id = $window.localStorage.deviceUUID;
		$http.get(domainUrl + 'business/' + id + '/categories/' + bid + '/brands').then(function(res) {
      
      var selectedMerchBrands = JSON.parse(JSON.stringify(res));
      $scope.selMerchBrands = selectedMerchBrands.data;
      
    }, function(err) {
      console.log(err);
    }
    )
	}
}


$scope.showBrandModal = function() {
	
	if($scope.catButton == 'Select Your Categories') {
		$scope.showCat = true;
	} else {
		$scope.showCat = false;
		$scope.brandsModal.show();
	}
}



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


$scope.doneBrands = function(){
	$scope.brandsModal.hide();
	selectedBrands = catBrandsMallsService.checkBrands($scope.selMerchBrands);
	if(selectedBrands.selectedBrandName.length == 0){
		$scope.brandButton = "Select Your Brands";
    	selectedBrands.selectedBrandId = [];
	}
	if(selectedBrands.selectedBrandName == ''){
		$scope.brandButton = "Others";
    	selectedBrands.selectedBrandId = [];
	}
	else{
		$scope.brandButton = selectedBrands.selectedBrandName;

	}
}

$scope.doneMall = function(){
	$scope.mallsModal.hide();
	selectedMalls = catBrandsMallsService.checkMalls($scope.mallsList);
	if(selectedMalls.selectedMallsName.length == 0){
		$scope.mallButton = "Select Your Mall";
		isInMall = 0;
	}
	if(selectedMalls.selectedMallsName == ''){
		$scope.mallButton = "Not In Mall";
		isInMall = 0;
		selectedMalls.selectedMallsId = 0;
	}
	else{
		$scope.mallButton = selectedMalls.selectedMallsName;
		isInMall = 1;

	}
}

$scope.showCat = false;
$scope.showBrand = false;
$scope.showMall = false;
$scope.showImg = false;


	$scope.submitData = function(business, validity){
		
		var id = window.localStorage.getItem('deviceUUID');
		var defaultLogo = 'https://s3-us-west-2.amazonaws.com/madzz-dev-bucket/defaultLogo.jpg';
		var defaultCover = 'https://s3-us-west-2.amazonaws.com/madzz-dev-bucket/defaultCover.jpg';
		if(!validity){
			alert("Invalid form");
			return false;
		} else if($scope.catButton == 'Select Your Categories') {
			$scope.showCat = true;
			$scope.showBrand = false;
			$scope.showMall = false;
			$scope.showImg = false;
			return false;
		} else if($scope.brandButton == 'Select Your Brands') {
			$scope.showBrand = true;
			$scope.showCat = false;
			$scope.showMall = false;
			$scope.showImg = false;
			return false;
		} else if($scope.mallButton == 'Select Your Mall') {
			$scope.showMall = true;
			$scope.showCat = false;
			$scope.showBrand = false;
			$scope.showImg = false;
			return false;
		} else if($scope.files.first == ''){
			$scope.showImg = true;
			$scope.showCat = false;
			$scope.showBrand = false;
			$scope.showMall = false;
			return false;
		}
		else{

			$scope.showCat = false;
			$scope.showBrand = false;
			$scope.showMall = false;
			$scope.showImg = false;
		
			var merch = angular.copy(business);
			var address = null;
			/*if(globAddress == null){
				address = merch.street + ',' + merch.location.formatted_address;
			}
			else{
				address = globAddress;
			}*/
			address = merch.street + ', ' + merch.location.formatted_address;
			var businessData = {
		    	"deviceUUID": id,
		    	"isInMall": isInMall,
		    	"lat":lat,
		    	"lng":lng,
		    	"name":merch.name,
		    	"displayName":merch.displayName,
		    	"email":merch.email,
		    	"phone":merch.phone,
		    	"address": address,
		    	"selectedCategories":selectedCat.selectedCatId,
		    	"selectedBrands":selectedBrands.selectedBrandId,
				"logoUrl": defaultLogo,
		    	"imageUrl": defaultCover,
		    	"mallId":selectedMalls.selectedMallsId,
		    	"pincode":merch.pincode,
		    	"businessRegImageUrl": $scope.files.first
			}
		}
		/*alert(JSON.stringify(businessData))*/
	

   /* var businessData = {
    	"deviceUUID": 'scotch',
    	"isInMall": isInMall,
    	"lat":lat,
    	"lng":lng,
    	"name":x.name,
    	"displayName":x.displayName,
    	"email":x.email,
    	"phone":x.phone,
    	"address": add
    	ress,
    	"selectedCategories":userChecked.selectedCategories,
    	"selectedBrands":merchantChecked.selectedBrands,
    	"mallId":mallChecked.checkedMall

    };*/

		$http.post(domainUrl+'business', businessData).success(function(){
                $location.path("/merch/merchProfile");
                LocalStorageService.set('isMerch', true);
            }).error(function (data, status, headers, config) {

				        //alert(data);
				        //alert(status);
				        //alert(headers);
				        //alert(JSON.stringify(config));
			});
	}


}]);

var DealDetailController = angular.module("DealDetailController", []);

DealDetailController.controller("DealDetailController", ['$scope',  '$ionicPopup', 'LocalStorageService',
								 '$ionicPopup', '$state', 'DealDetailService', 'dealDetailsData', '$ionicModal',
								  '$ionicPopover', 'ShareService', '$ionicPopover', 'LocalStorageService',
								  'UserRegLogService','$cordovaGeolocation', '$window', 'ToastService',
								 function($scope, $ionicPopup, LocalStorageService, $ionicPopup, $state,
								  DealDetailService, dealDetailsData, $ionicModal, $ionicPopover, ShareService, 
								  $ionicPopover, LocalStorageService,UserRegLogService, $cordovaGeolocation, $window, ToastService){




$ionicPopover.fromTemplateUrl('templates/share-popover.html', {
	scope: $scope,
}).then(function(popover) {
	$scope.popover = popover;
});


var loginStatus = window.localStorage.getItem("isLoggedInSocial")
loginStatus = JSON.parse(loginStatus)
loginStatus = loginStatus.isLoggedIn;

  $scope.latitud = 33.5454;
  $scope.longitud = 12.11515;
  $scope.geolocalizado = false;
  $scope.mapLat = parseFloat(dealDetailsData.lat);
  $scope.mapLng = parseFloat(dealDetailsData.lng);
  $scope.dealData = dealDetailsData;

 /* $scope.title = dealDetailsData.title;
  $scope.storeImg = dealDetailsData.imageUrl;
  $scope.bName = dealDetailsData.businessName;
  $scope.bAddress = dealDetailsData.businessAddress;
  $scope.bPhone = dealDetailsData.businessPhone;
  $scope.bemail = dealDetailsData.businessEmail;
  $scope.description = dealDetailsData.description;
  $scope.bdescription = dealDetailsData.businessDescription;
  $scope.mallName = dealDetailsData.mallName;
  $scope.mallIdData = dealDetailsData.mallId;*/
  
  var merchRegStatus = LocalStorageService.get('isMerch');

  $scope.Geolocalizar = function () { $ionicModal.fromTemplateUrl('templates/mapsModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

	var dealId = dealDetailsData.dealId; 

 	function showSuccessPopup(){

 		var successPopup = $ionicPopup.show({
				templateUrl:'templates/karmaSaved.html',
				title:'Thank You',
				subTitle:'',
				scope:$scope,
				buttons:[
					{
						text : 'View Profile',
						onTap : function(){
							$state.go('userProfile');
						}
					},
					{
						text : 'Close',
						type : 'button-balanced',
						onTap : function(){

							successPopup.close();
						}
					}
				]
			});
			successPopup.then(function(res) {
		    ;
		  });

 	}


function showSuccessCheckInPopup(){

 		var successPopup = $ionicPopup.show({
				templateUrl:'templates/karmaCheckin.html',
				title:'Thank You',
				subTitle:'',
				scope:$scope,
				buttons:[
					{
						text : 'Share on FB',
						onTap : function(){
							var caption = "Madzz - Hey I checked in at " + $scope.dealData.businessAddress;
							UserRegLogService.postFB(caption);
						}
					},
					{
						text : 'Close',
						type : 'button-balanced',
						onTap : function(){
							successPopup.close();
						}
					}
				]
			});
			successPopup.then(function(res) {
		    ;
		  });

 	}

function showSuccessBoughtPopup(){

 		var successPopup = $ionicPopup.show({
				templateUrl:'templates/karmaBought.html',
				title:'Thank You',
				subTitle:'',
				scope:$scope,
				buttons:[
					{
						text : 'Share On FB',
						onTap : function(){
							var caption = "Hey I found this awesome deal on Madzz! " + $scope.dealData.description;
							
							UserRegLogService.postFB(caption);
						}
					},
					{
						text : 'Close',
						type : 'button-balanced',
						onTap : function(){

							successPopup.close();
						}
					}
				]
			});
			successPopup.then(function(res) {
		    ;
		  });

 	}


 	function showFailurePopup(){

 		var regPopup = $ionicPopup.show({
		    templateUrl: 'templates/sorryNotLoggedIn.html',
		    title: 'Sorry',
		    subTitle: '',
		    scope: $scope,
		    buttons: [
		      { 
		      	text: 'Join Us' ,
		      	onTap:function(e){
		      		$state.go('userReg')
		      	}
		      },
		      {
		        text: '<b>Login</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	return;
		          
		        }
		      },
		    ]
		  });
		  regPopup.then(function(res) {
		    ;
		  });

 	}
 	
 	function showNotCheckedInPopup(){

 		var regPopup = $ionicPopup.show({
		    templateUrl: 'templates/sorryNotCheckedIn.html',
		    title: 'Sorry',
		    subTitle: '',
		    scope: $scope,
		    buttons: [
		      { 
		      	text: 'Join Us' 
		      	
		      },
		      {
		        text: '<b>Login</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	return;
		          
		        }
		      },
		    ]
		  });
		  regPopup.then(function(res) {
		    ;
		  });

 	}


 	function showLocationFailurePopup(){

 		var regPopup = $ionicPopup.show({
		    templateUrl: 'templates/sorryLocationNotFound.html',
		    title: 'Sorry',
		    subTitle: '',
		    scope: $scope,
		    buttons: [
		      { 
		      	text: 'Join Us' 
		      	
		      },
		      {
		        text: '<b>Login</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	return;
		          
		        }
		      },
		    ]
		  });
		  regPopup.then(function(res) {
		    ;
		  });

 	}
	
	$scope.saveDeal = function(){
		var uuid = LocalStorageService.get('deviceUUID');
		if(loginStatus || merchRegStatus == 'true'){
			DealDetailService.saveADeal(uuid, dealId).then(function(){
				showSuccessPopup();
				$scope.dealData.isSavedDeal = true;
				
			});
		}
		else{
			showFailurePopup();
		}
	}

	function uiCheckInStatus(uuid, dealId, lat, lng){

		DealDetailService.checkin(uuid, dealId, lat, lng).then(function(data){
            if(data === "Success"){
            	showSuccessCheckInPopup();
            	$scope.dealData.isCheckedInDeal = true;
            }else{
            	showLocationFailurePopup(); // Change to meaningful text popup
            }
			}, function(err){
				;
		});
	}

	$scope.checkin = function(){

		if(loginStatus || merchRegStatus == 'true'){

		var lat = $window.sessionStorage.getItem('lat')
		var lng = $window.sessionStorage.getItem('lng');
		var uuid = LocalStorageService.get('deviceUUID');
		var dealId = $scope.dealData.dealId;
		
		if(lat == '' || lng == '' || lat == 'null' || lat == null){
			
			var options = {
                maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
            }

            $cordovaGeolocation.getCurrentPosition(options).then(function(position){
            	$window.sessionStorage.setItem('lat', position.coords.latitude);
            	$window.sessionStorage.setItem('lat', position.coords.longitude);
            	lat = $window.sessionStorage.getItem('lat');
            	lng = $window.sessionStorage.getItem('lng');

            	uiCheckInStatus(uuid, dealId, lat, lng);

            }, function(err){
            	ToastService.showMessage("We are unable to obtain your location. Switch on location and try again");
            });
		}
		else{
			uiCheckInStatus(uuid, dealId, lat, lng);
		}
		/*var uuid = LocalStorageService.get('deviceUUID');

		if(loginStatus){
			DealDetailService.checkin(uuid, dealId).then(function(){
			showSuccessCheckInPopup();
			console.log($scope.dealData.businessAddress);
			UserRegLogService.postCheckInFB($scope.dealData.businessAddress);
			});
		}
		else{
			showFailurePopup();
		}*/
		} else{
			showFailurePopup();
		}
		
	}

	$scope.purchased = function(){
		var uuid = LocalStorageService.get('deviceUUID');
		if(loginStatus || merchRegStatus == 'true') {
			if($scope.dealData.isCheckedInDeal == true) {
				DealDetailService.purchase(uuid, dealId).then(function(){
				showSuccessBoughtPopup();
				$scope.dealData.isPurchaseDeal = true
			}) 
		} else {
				showNotCheckedInPopup();
			}
		} else {
				showFailurePopup();
		}
	}

	$scope.hello = function(platformName){
		var mainMsg = "Hey I found this awesome deal on Madzz!";
		var dealTitle = dealDetailsData.title;
		var dealStore = dealDetailsData.businessName;
		var finalMessage = mainMsg + " " + dealTitle + ", at the " + dealStore; 
		/*console.log(shareGameResults)*/
		switch(platformName){
			case 'facebook': ShareService.shareViaFB(finalMessage)
			break;
			case 'twitter' : ShareService.shareViaTwitter(finalMessage)
			break;
			case 'whatsApp' : ShareService.shareViaWhatsApp(finalMessage)
			break;
			case 'hangouts' : ShareService.shareViaHangouts(finalMessage)
			break;

		}

		$scope.popover.hide();
	};

}]);


/*
DealDetailController.controller("DirectionController", ['$scope', '$window', 'dealMapData', '$state','$location',
						 function($scope, $window, dealMapData, $state, $location){
						 	

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
//var map;
var startLat = $window.sessionStorage.getItem('lat');
var startLng = $window.sessionStorage.getItem('lng');
var startLatLng = ''+startLat + ',' + startLng+ '';

var endLat = dealMapData.lat;
var endLng = dealMapData.lng;
var endLatLng = ''+endLat + ',' + endLng+ '';
console.log(startLatLng);
console.log(endLatLng);



function initialize() {

  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapCenter = new google.maps.LatLng(13.0293222, 77.6391877);
  var mapOptions = {
    zoom:7,
    center: mapCenter
  };
  $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap($scope.map);
}



  var start = startLatLng;//document.getElementById('start').value;
  var end = endLatLng;//document.getElementById('end').value;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });

google.maps.event.addListenerOnce($window, 'idle', initialize());
//google.maps.event.addDomListener($window, 'load', initialize());
						 	
						 	
						 	
}]);
*/

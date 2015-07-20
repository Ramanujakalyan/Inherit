var UserSettingsController = angular.module('UserSettingsController', []);

UserSettingsController.controller("UserSettingsController", ['$scope', '$ionicPopover', '$cordovaFacebook', 'UserRegLogService', 'LocalStorageService', '$http', 'domainUrl', 'LocalStorageService', '$ionicPopup', 'ToastService', '$window', 'LocalStorageService', 'ShareService', '$ionicModal', 'catBrandsMallsService', 'catData', 'checkedCatData','CategoryService', 'ToastService', function($scope, $ionicPopover, $cordovaFacebook, UserRegLogService, LocalStorageService, $http, domainUrl, LocalStorageService, $ionicPopup, ToastService, $window, LocalStorageService, ShareService,$ionicModal, catBrandsMallsService, catData, checkedCatData, CategoryService, ToastService){
	
//$scope.notification = true;

$scope.notify = function(value) {
//alert(value);
if(value == true) {

var id = window.localStorage.getItem('deviceUUID');
$http.put(domainUrl+'gcm/'+id).success(function() {
	console.log('Notification is ON');
}).error(function(err) {
	console.log('this is err');
})

} else {

var id = window.localStorage.getItem('deviceUUID');
$http.delete(domainUrl+'gcm/'+id).success(function(response, status, headers, config) {
	console.log('Notification is OFF');
}).error(function(err) {
	console.log('some err');
})

}
}

if(LocalStorageService.getObject('isLoggedInOTP').isLoggedIn == false) {
$scope.webPassword = false;
}
else {
$scope.webPassword = false;
}


if(LocalStorageService.getObject('isLoggedInSocial').isLoggedIn == true) {
$scope.fb = true;
} 


$ionicPopover.fromTemplateUrl('templates/share-popover.html', {
	scope: $scope,
}).then(function(popover) {
	$scope.popover = popover;
});

$scope.passMsg = true;
$scope.createPassword = function() {

var pass = this.password;

var id = window.localStorage.getItem('deviceUUID');

var passData = {
	"deviceUUID": id,
	"password": pass
}
if(pass == " " || pass == null) {
alert('field cannot be blank');
} else {
$http.post(domainUrl+'userAuth/'+id+'/createPassword', passData).success(function(){
	console.log('Password Created');
	
	$window.location.reload(true);

}).error(function(err) {
	console.log('this is err');
})
}
}


$scope.hello = function(platformName){
		
		var finalMessage = 'Hey I found this amazing app called Madzz. It helps you find deals around you.';
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

$scope.categoryList = catData;

$scope.checkedCat = {};
$scope.checkedCat = checkedCatData;

		if ($scope.checkedCat.length > 0) {
            var tmpMap = new Array();
            
            for (var j = 0; j < $scope.checkedCat.length; j++) {
                if(!tmpMap[$scope.checkedCat[j]]) {
                    tmpMap[$scope.checkedCat[j]] = $scope.checkedCat[j];
                                    

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
        
        var loginStatus = window.localStorage.getItem("isLoggedInSocial")
	loginStatus = JSON.parse(loginStatus)
	loginStatus = loginStatus.isLoggedIn;

	var platformStatus = window.localStorage.getItem("isLoggedInSocial")
	platformStatus = JSON.parse(platformStatus)
	platformStatus = platformStatus.platform;

if(platformStatus == "facebook" && loginStatus == true) {
    $scope.loginFB = false;
} else {
	$scope.loginFB = true;
}


 
$ionicModal.fromTemplateUrl('templates/catModal.html', function (modal) {
	$scope.catModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

 $scope.doneCat = function(){
	
	
	selectedCat = catBrandsMallsService.checkCat($scope.categoryList);
	if(selectedCat.selectedCatId.length == 0){
		ToastService.showMessage('You have to select atleast 1 category');
		selectedCat.selectedCatId = [];
		return false;
	}
	else{
		$scope.catModal.hide();
		console.log(selectedCat);
		var id = LocalStorageService.get('deviceUUID');
		var data = {
				"deviceUUID":id,
				"selectedCategories":selectedCat.selectedCatId
			};
			CategoryService.settingSaveCategories(data);
	}
}

$ionicModal.fromTemplateUrl('templates/termsModal.html', function (modal) {
	$scope.termsModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$scope.doneTerms = function(){	
	$scope.termsModal.hide();
}

$ionicModal.fromTemplateUrl('templates/privacyModal.html', function (modal) {
	$scope.privacyModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$scope.donePrivacy = function(){	
	$scope.privacyModal.hide();
}

$ionicModal.fromTemplateUrl('templates/disclaimerModal.html', function (modal) {
	$scope.disclaimerModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$scope.doneDisclaimer = function(){	
	$scope.disclaimerModal.hide();
}

$ionicModal.fromTemplateUrl('templates/copyrightModal.html', function (modal) {
	$scope.copyrightModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$scope.doneCopyright = function(){	
	$scope.copyrightModal.hide();
}

	$scope.facebookLogin = function(){
    
   UserRegLogService.facebookLogin();
    /*UserRegLogService.facebookLogin();*/
   
   /*  $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      $cordovaFacebook.api("me", ["public_profile"])
    .then(function(success) {
      alert(JSON.stringify(success))
    }, function (error) {
      // error
    });
    }, function (error) {
      // error
    });*/
  }

}]);

var UserRegLogController = angular.module("UserRegLogController", []);

UserRegLogController.controller("UserRegLogController", [
  '$scope',
  'UserRegLogService',
  'ToastService',
  '$state',
  '$http',
  '$q',
  '$ionicPopup',
  'domainUrl', 
  '$timeout',
  '$window','$location','LocalStorageService', '$state',
  function($scope,
      UserRegLogService, 
      ToastService,
      $state, 
      $http, 
      $q, 
      $ionicPopup,
      domainUrl, 
      $timeout,
      $window, $location, LocalStorageService, $state) {

      var key = 1000 + Math.floor(Math.random() * 9999);

      var keyval = key;
      var keymsg = 'Your MADZZ OTP/Verification Code is ' + key;
      var deferred = $q.defer();

	$scope.uname = true;
	$scope.unum = true;
      $scope.sendSms = function() {
	if(this.username == null || this.username == "" ) { 
	$scope.uname = false;
	$scope.unum = true;
	
	} else if(this.number == null || this.number == "") {
    	$scope.unum = false;
	$scope.uname = true;
	} else {
	$scope.uname = true;
	$scope.unum = true;
        var username = this.username;
        var num = this.number;
	
        var otpData = {
			"phone": num,
			"otp" : key
		}
		
		
		var id = $window.localStorage.getItem('deviceUUID');

$http.post(
            domainUrl +'userAuth/' + id +'/sendOTP', otpData).success(
            function() {
            	deferred.resolve();
               verifyOTP();
            }).error(function(err) {
              console.log(err);
              deferred.reject();
            }
          )
          
        

        var regData = {
          "userName": username,
          "phone": num,
          "deviceUUID": id,
          "otpStatus": "A"
        }

        $http.post(domainUrl +'userAuth/' + id +'/otp', regData).success(
          function(data) {
		
		console.log('success');
          }).error(function(err) {
		console.log('err');
        })

}      
};


    $scope.checkSMS = function(number) {
            if (keyval == $scope.data.smscode) {
              $scope.verified = false; 
		          $scope.notVerified = true; 
                //showVerified();

                var data = {
                    'platform': 'otp',
                    'isLoggedIn': true
                };
                LocalStorageService.setObject('isLoggedInSocial', data);
		LocalStorageService.set('isUser', true);	
                $location.path("/deals/yourDeals");
                $timeout(function() {
		myPopup.close();
		},3000);
            } else {
              $scope.notVerified = false;
		          $scope.verified = true;
                //showNotVerified();

            }
        };
var myPopup;
function verifyOTP() {
        $scope.data = {};

        // An elaborate, custom popup
         myPopup = $ionicPopup.show({
         templateUrl:'templates/otp.html',
         scope: $scope,
	buttons: [{
            text: 'Close'
          }]
        });
      }

    /*  function verifyOTP() {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
         templateUrl:'templates/otp.html',
         scope: $scope,
          buttons: [{
            text: 'Cancel'
          }, {
            text: '<b>Verify</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.smscode) {
                e.preventDefault();
              } else {
                checkSMS($scope.data.smscode);
              }
            }
          }, ]
        });
      }*/

    function showVerified() {
        var confirmPopup =
          $ionicPopup.show({
            templateUrl : 'templates/verifyOTP.html',
		buttons: [{
            text: 'OK'
          }]
          });
      };


     function showNotVerified() {
        var confirmPopup =
          $ionicPopup.show({
            templateUrl : 'templates/notVerifyOTP.html',
	buttons: [{
            text: 'Cancel'
          }]
          });
      };

$scope.verified = true;
$scope.notVerified = true;

 /*  function showVerified() {
        var confirmPopup =
          $ionicPopup.alert({
            title: 'Number Verified!!'
          });
      };*/


      /*function showNotVerified() {
        var confirmPopup =
          $ionicPopup.alert({
            title: 'Oops!! Wrong Key. Please Try Again'
          });
      };*/
      
      $scope.googleLogin = function() {
        window.plugins.googleplus.login({},
          function(obj) {
            UserRegLogService.googleLogin(obj)
            ToastService.setToastMessage( "You Have Been Logged In Successfully");
          },
          function(msg) {
            ToastService.showShortMessage("Platform not available");

          }
        );
      };

      $scope.facebookLogin = function() {

        UserRegLogService.facebookLogin();
      }

      $scope.later = function(){
        $state.go('deals.yourDeals');
        LocalStorageService.set('isUser', true);
      }
    }
  ]);

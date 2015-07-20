var UserSettingsService = angular.module('UserSettingsService', []);

UserSettingsService.service("UserSettingsService", ['$http', '$ionicLoading', '$q', '$state', 'domainUrl', 'LocalStorageService', 'ToastService',
  '$cordovaFacebook', function($http, $ionicLoading, $q, $state, domainUrl, LocalStorageService, ToastService, $cordovaFacebook){
    
    return {

      facebookLogin : function(){  
        var data = {
          'platform':'facebook',
          'isLoggedIn':true
        }

        var id = LocalStorageService.get("deviceUUID");

        var finalData = new Object();
        
        $cordovaFacebook.login(["public_profile", "email", "user_friends"])
          .then(function(success) {
            $cordovaFacebook.api("me", ["public_profile"])
              .then(function(success) {

                  finalData = {
                    "name": success.first_name,
                    "phone":null,
                    "gender":success.gender,
                    "deviceUUID":id,
                    "lastName":success.name,
                    "birthDate": success.birthday,
                    "maritalStatus":null,
                    "email":success.email,
                    "location":null,
                    "loginType":"Facebook",
                    "loginId":success.id,
                    "profileImageUrl":null
                  };

                  $http.post(domainUrl+'users/'+id+'/userDemoProfile', finalData).success(function(){
                    ToastService.setSuccessLoginMessage("Facebook");
                    LocalStorageService.setObject('isLoggedInSocial', data);
                    $state.go('deals.yourDeals')
                  }).error(function (data, status, headers, config) {
                        ToastService.showMessage("Sorry! We are not able to log you in.")
                  });
                  
                
              }, function (error) {
                ToastService.showMessage("Sorry! We are not able to log you in.")
            });
          }, function (error) {
              ToastService.showMessage("Sorry! We are not able to log you in.");
          });

      },

    googleLogin : function(loginData){
      var data = {
        'platform':'google',
        'isLoggedIn':true
      }

      var id = LocalStorageService.get("deviceUUID");

      var finalData = {
        "name": loginData.displayName,
        "phone":null,
        "gender":loginData.gender,
        "deviceUUID":id,
        "lastName":loginData.familyName,
        "age":loginData.ageRangeMin,
        "birthDate": loginData.birthday,
        "maritalStatus":null,
        "email":loginData.email,
        "location":null,
        "loginType":"google",
        "loginId":loginData.userId,
        "profileImageUrl":loginData.imageUrl
      };

      $http.post(domainUrl+'users/'+id+'/userDemoProfile', finalData).success(function(){
        ToastService.setSuccessLoginMessage("Google+");
        LocalStorageService.setObject('isLoggedInSocial', data);
        $state.go('deals.yourDeals')
      }).error(function (data, status, headers, config) {
            ToastService.showMessage("Sorry! We are not able to log you in.")
      });


    }
  }


}]);

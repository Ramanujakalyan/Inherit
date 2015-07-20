var UserRegLogService = angular.module('UserRegLogService', []);

UserRegLogService.service("UserRegLogService", ['$http', '$ionicLoading', '$q', '$state', 'domainUrl', 'LocalStorageService', 'ToastService',
  '$cordovaFacebook', function($http, $ionicLoading, $q, $state, domainUrl, LocalStorageService, ToastService, $cordovaFacebook){
    
    return {

      facebookLogin : function(){  
        var data = {
          'platform':'facebook',
          'isLoggedIn':true
        }

        var id = LocalStorageService.get("deviceUUID");

        var finalData = new Object();
        
        $cordovaFacebook.login(["public_profile", "email"])
          .then(function(success) {
            $cordovaFacebook.api("me?fields=picture,name,gender,last_name,birthday,relationship_status,email",[])
              .then(function(success) {

                  finalData = {
                    "name": success.name,
                    "phone":null,
                    "gender":success.gender,
                    "deviceUUID":id,
                    "lastName":success.last_name,
                    "birthDate": success.birthday,
                    "maritalStatus":success.relationship_status,
                    "email":success.email,
                    "location":success.location,
                    "loginType":"Facebook",
                    "loginId":success.id,
                    "profileImageUrl":'http://graph.facebook.com/'+success.id+'/picture?type=large'//success.picture.data.url
                  };
                 

                  $http.post(domainUrl+'users/'+id+'/userDemoProfile', finalData).success(function(){
                    ToastService.setSuccessLoginMessage("Facebook");
                    LocalStorageService.setObject('isLoggedInSocial', data);
                    LocalStorageService.set('isUser', true);
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


      postFB : function(desc) {
        $cordovaFacebook.login(["public_profile", "email"])
          .then(function(success) {
        
    
    var options = {
    method: "feed",
    link: "http://www.madzz.co.in/",
    caption: '<b>' + desc + '</b>'
  };
  $cordovaFacebook.showDialog(options)
    .then(function(success) {
      
      // success
    }, function (error) {
      
      // error
    });
  }, function (error) {
    
    ToastService.showMessage("not posted");
    
          })
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
        LocalStorageService.set('isUser', true);
        $state.go('deals.yourDeals')
      }).error(function (data, status, headers, config) {
            ToastService.showMessage("Sorry! We are not able to log you in.")
      });


    }
  }


}]);

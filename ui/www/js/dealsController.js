var DealsController = angular.module("DealsController", ['angular-inview']);

DealsController.controller("DealsController", ['$scope', 'dealsData', 'carousel', '$cordovaGeolocation', '$window', 'LocalStorageService', '$rootScope', 
                '$ionicSlideBoxDelegate', '$cordovaBackgroundGeolocation', 'domainUrl', '$ionicPlatform',
                 '$http', 'DealsService', 'ConnectionService', 'ToastService', 'UserProfileService',
                function($scope, dealsData, carousel, $cordovaGeolocation, $window, LocalStorageService, 
                  $rootScope, $ionicSlideBoxDelegate, $cordovaBackgroundGeolocation, domainUrl,
                   $ionicPlatform, $http, DealsService, ConnectionService, ToastService, UserProfileService){

  if(LocalStorageService.get('cacheRec') == '' || LocalStorageService.get('cacheRec') == false){
    LocalStorageService.setObject('cacheRec', JSON.stringify(dealsData));
  }
  
  $scope.deals = {};
  $scope.carousels = {};
  /*$scope.moreDataCanBeLoaded = true;
  var startInitial = 0, startEnd = 10;
  var infStart = startEnd;
  var infEnd = infStart + startEnd;*/
  

  var id = LocalStorageService.get('deviceUUID');

  $scope.$on('$ionicView.enter', function(){
     var status = LocalStorageService.getObject('isLoggedInSocial');
    $rootScope.logInStatus = status.isLoggedIn;
    $ionicSlideBoxDelegate.update();
  })

UserProfileService.getUserDemoData().then(function(profile) {
                   $scope.userDemoGraphics = profile;   
                   $rootScope.userNameHam = $scope.userDemoGraphics.name;
                   $rootScope.userImgHam = $scope.userDemoGraphics.profileImageUrl || 'https://s3-us-west-2.amazonaws.com/madzz-dev-bucket/defaultPic.jpg';
},function(err){
                  
                  });

 
  $scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    })
  
 
var dealImpressionsId = new Array();
var uniquedealImpressionsId = new Array();
$scope.getInfo = function() {
   
   dealImpressionsId.push(this.deal.dealId);

 
  uniquedealImpressionsId = dealImpressionsId.filter(function(elem, pos) {
    return dealImpressionsId.indexOf(elem) == pos;
  });
 
 }


$scope.$on('$ionicView.leave', function(){
  if(uniquedealImpressionsId.length == 0) {
    	
    } else {
  DealsService.postDealImpressions(uniquedealImpressionsId);
  dealImpressionsId = new Array();
  uniquedealImpressionsId = new Array();
    }
      });


$scope.getCarouselID = function() {
  
 var carouselID = this.carousel.dealId;
 
 DealsService.postCarouselImpressions(carouselID);
}

/*var loginStatus = window.localStorage.getItem("isLoggedInSocial")
	loginStatus = JSON.parse(loginStatus)
	loginStatus = loginStatus.isLoggedIn;*/


   /* $scope.loadMore = function() {
      if(ConnectionService.connectionStatus()){
        DealsService.getDeals(true, infStart, startEnd).then(function(data){
        if(data.length == 0){

          $scope.moreDataCanBeLoaded = false;
          return;
        }
        data.forEach(function(ele, index, array){
          $scope.deals.push(ele);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      infStart = infEnd;
      infEnd = infStart + startEnd;
      });
      }
    	
    };*/
    
  if(! ConnectionService.connectionStatus()){
    
    var x = LocalStorageService.getObject('cacheRec');
    x = JSON.parse(x);
    $scope.deals = x
  }
  else{
    
    $scope.deals = dealsData;
    $scope.carousels = carousel;
  }

  /*$cordovaGeolocation.getCurrentPosition()
    .then(function (position) {
        var lat  = position.coords.latitude
        var lng = position.coords.longitude
        console.log(lat, lng);
        var options = {
          // https://github.com/christocracy/cordova-plugin-background-geolocation#config
          url:'domainUrl/mallNotification/'+id+'/gcmUser?lat='+lat+'&lng='+lng, // <-- Android ONLY:  your server url to send locations to
         
          desiredAccuracy: 100,
          stationaryRadius: 1,
          distanceFilter: 1,
          activityType: 'AutomotiveNavigation',
          debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
          stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
        };

        // `configure` calls `start` internally
         $ionicPlatform.ready(function() {
            $cordovaBackgroundGeolocation.configure(options).then(function (location) {
              alert(location)
          console.log(location);
        }, function (err) {
          alert(err)
          console.error(err);
        });

        $scope.stopBackgroundGeolocation = function () {
          $cordovaBackgroundGeolocation.stop();
        };
         });
    

    }, function(err) {
        alert("No pos");
    });*/

    $scope.getYourDealId = function() {
  var dealId = this.deal.dealId;
  
  var id = $window.localStorage.deviceUUID;
  $http.post(domainUrl + 'users/' + id + '/dealClick/' + dealId).success(function() {
                
            }).error(function(err) {
                
            })
}

/*var options = {
    // https://github.com/christocracy/cordova-plugin-background-geolocation#config
          url:domainUrl+'mallNotification/'+id+'/gcmUser', // <-- Android ONLY:  your server url to send locations to
          desiredAccuracy: 100,
          stationaryRadius: 500,
          distanceFilter: 500,
          notificationTitle: 'Madzz', // <-- android only, customize the title of the notification
          notificationText: 'Location On', // <-- android only, customize the text of the notification
          activityType: 'AutomotiveNavigation',
          debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
          stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
  };*/

  // `configure` calls `start` internally
  /*$ionicPlatform.ready(function(){
  	$cordovaBackgroundGeolocation.configure(options).then(function (location) {
  }, function (err) {
 
  });
        $cordovaBackgroundGeolocation.start();
  })*/

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
   
   
   $ionicPlatform.ready(function(){
   window.navigator.geolocation.getCurrentPosition(function(location) {
        
    });
    
    
    var bgGeo = window.plugins.backgroundGeoLocation;

    
    
    var yourAjaxCallback = function(response) {
        ////
        // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
        //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        //
        //
        bgGeo.finish();
    };

  

    
    var callbackFn = function(location) {
        

	LocalStorageService.set('dealLat', location.latitude);
        LocalStorageService.set('dealLng', location.longitude);
        // Do your HTTP request here to POST location to your server.
        //
        //
       
        /*var loc = {
          location : {
            "latitude": location.latitude,
            "longitude": location.longitude
          }
        }

        $http.post(domainUrl+'mallNotification/'+id+'/gcmUser', loc).success(function() {
                console.log('location');
            }).error(function(err) {
                console.log(err);
            })*/
        yourAjaxCallback.call(this);
    };


   
    var failureFn = function(error) {
        
    }

    
    bgGeo.configure(callbackFn, failureFn, {
        url:domainUrl+'mallNotification/'+id+'/gcmUser',
        headers : {},
        desiredAccuracy: 100,                         // <-- 0:  highest power, highest accuracy; 1000:  lowest power, lowest accuracy.
        stationaryRadius: 500,
        distanceFilter: 700,                         // <-- minimum distance between location events
        activityType: 'AutomotiveNavigation',       // <-- [ios]
        locationUpdateInterval: 50000,              // <-- [android] minimum time between location updates, used in conjunction with #distanceFilter
        activityRecognitionInterval: 60000,         // <-- [android] sampling-rate activity-recognition system for movement/stationary detection
        debug: false,                                // <-- enable this hear sounds, see notifications during life-cycle events.
        stopOnTerminate: false                      // <-- enable this to clear background location settings when the app terminates
    });

   
    bgGeo.start();

    
    
   });

}]);

DealsController.controller("PopularDealsController", ['$scope', 'popularDealsData', '$ionicSlideBoxDelegate', 'carousel','$window', '$http', 'domainUrl', 'DealsService', 'ConnectionService', 'ToastService',
 function($scope, popularDealsData,  $ionicSlideBoxDelegate, carousel, $window, $http, domainUrl, DealsService, ConnectionService, ToastService){
 
  $scope.deals = {};
  $scope.moreDataCanBeLoaded = true;
  var startInitial = 0, startEnd = 10;
  var infStart = startEnd;
  var infEnd = infStart + startEnd;

  $scope.deals = popularDealsData;


    $scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }
     //ToastService.showConnMessage('Deals From Your Selected Categories');
     
    })

  $scope.loadMore = function() {
      DealsService.getPopularDeals(true, infStart, startEnd).then(function(data){
        if(data.length == 0){

          $scope.moreDataCanBeLoaded = false;
          return;
        }
        data.forEach(function(ele, index, array){
          $scope.deals.push(ele);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      infStart = infEnd;
      infEnd = infStart + startEnd;
      });
    };
  
var dealImpressionsId = new Array();
var uniquedealImpressionsId = new Array();
$scope.getInfo = function() {
   
   dealImpressionsId.push(this.deal.dealId);

 
  uniquedealImpressionsId = dealImpressionsId.filter(function(elem, pos) {
    return dealImpressionsId.indexOf(elem) == pos;
  });
 
 }


$scope.$on('$ionicView.leave', function(){
  if(uniquedealImpressionsId.length == 0) {
    
    } else {
  DealsService.postDealImpressions(uniquedealImpressionsId);
  dealImpressionsId = new Array();
  uniquedealImpressionsId = new Array();
    }
      });


$scope.getCarouselID = function() {
  
 var carouselID = this.carousel.dealId;
 
 DealsService.postCarouselImpressions(carouselID);
}


  $scope.getYourDealId = function() {
  var dealId = this.deal.dealId;
  
  var id = $window.localStorage.deviceUUID;
  $http.post(domainUrl + 'users/' + id + '/dealClick/' + dealId).success(function() {
               
            }).error(function(err) {
                
            })
}

  $scope.carousels = carousel;

  $scope.$on('$ionicView.enter', function(){
    $ionicSlideBoxDelegate.update();
  })


}]);

DealsController.controller("DealNearYouController", ['$scope', '$ionicSlideBoxDelegate', 'dealsNearYouData', 'carousel','$window', '$http', 'domainUrl', 'DealsService', 'ConnectionService', 'ToastService', 'LocalStorageService',
 function($scope, $ionicSlideBoxDelegate, dealsNearYouData, carousel, $window, $http, domainUrl, DealsService, ConnectionService, ToastService, LocalStorageService){
$scope.noLocMsg = false;
$scope.deals = {};


  $scope.moreDataCanBeLoaded = true;
  var startInitial = 0, startEnd = 10;
  var infStart = startEnd;
  var infEnd = infStart + startEnd;

  $scope.deals = dealsNearYouData;

  if(LocalStorageService.get('dealLat') == '' || LocalStorageService.get('dealLat') == null || LocalStorageService.get('dealLng') == '' || LocalStorageService.get('dealLng') == null)
    $scope.noLocMsg = true;


/*         $scope.$watch(ConnectionService.connectionStatus(), function() {
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Connect To Internet');
      }

          })*/


$scope.$on('$ionicView.afterEnter', function(){
   if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }
      var valueStorage = $window.sessionStorage.getItem('value');
        if(valueStorage < 111) {
      ToastService.showShortMessage('Deals From Your Selected Categories');
      $window.sessionStorage.setItem('value', ($window.sessionStorage.getItem('value') + 1));
      
} else {
   
}
  })



     


  $scope.loadMore = function() {
      DealsService.getDealsNearYou(true, infStart, startEnd).then(function(data){
        if(data.length == 0 || JSON.stringify(data) == '{}'){

          $scope.moreDataCanBeLoaded = false;
          return;
        }
        data.forEach(function(ele, index, array){
          $scope.deals.push(ele);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      infStart = infEnd;
      infEnd = infStart + startEnd;
      });
    };
    
    var dealImpressionsId = new Array();
var uniquedealImpressionsId = new Array();
$scope.getInfo = function() {
   
   dealImpressionsId.push(this.deal.dealId);

 
  uniquedealImpressionsId = dealImpressionsId.filter(function(elem, pos) {
    return dealImpressionsId.indexOf(elem) == pos;
  });
 
 }


$scope.$on('$ionicView.leave', function(){
  if(uniquedealImpressionsId.length == 0) {
    	
    } else {
  DealsService.postDealImpressions(uniquedealImpressionsId);
  dealImpressionsId = new Array();
  uniquedealImpressionsId = new Array();
    }
      });

$scope.getCarouselID = function() {
 
 var carouselID = this.carousel.dealId;
 
 DealsService.postCarouselImpressions(carouselID);
}

$scope.getYourDealId = function() {
  var dealId = this.deal.dealId;
  
  var id = $window.localStorage.deviceUUID;
  $http.post(domainUrl + 'users/' + id + '/dealClick/' + dealId).success(function() {
                
            }).error(function(err) {
               
            })
}

$scope.carousels = carousel;

$scope.$on('$ionicView.enter', function(){
    $ionicSlideBoxDelegate.update();
  })

  
}]);

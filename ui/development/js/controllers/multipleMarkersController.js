var MultipleMarkersController = angular.module("MultipleMarkersController", []);


MultipleMarkersController.controller("MultipleMarkersController", ['$scope', 'multipleMarkersDealsData', '$ionicLoading','$rootScope','$state','multipleMarkersDealsDataPopular','multipleMarkersDealsDataRecommended','$window','$ionicPlatform', 'ConnectionService', 'ToastService',
    function($scope, multipleMarkersDealsData, $ionicLoading,$rootScope, $state, multipleMarkersDealsDataPopular,multipleMarkersDealsDataRecommended, $window, $ionicPlatform, ConnectionService, ToastService) {



      $scope.$on('$ionicView.enter', function(){
   
    google.maps.event.trigger($scope.map, 'resize');

});


 $scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    });
 

    $scope.markers = multipleMarkersDealsDataRecommended;
    
    $scope.activateTab = 1;

        var myLat = 0;
        var myLng = 0;
        for(var i=0; i<$scope.markers.length; i++) {
          myLat = myLat + $scope.markers[i].lat;
          myLng = myLng + $scope.markers[i].lng;
          var myAvgLat = myLat / $scope.markers.length;
          var myAvgLng = myLng / $scope.markers.length;
        }
        
        var mapOptions = {
            zoom: 12,
            center:new google.maps.LatLng(myAvgLat,myAvgLng),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        var tmpMarkerData = $scope.markers;

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function(info) {
            var mapLat = parseFloat(info.lat);
            var mapLng = parseFloat(info.lng);

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(mapLat, mapLng),
                animation: google.maps.Animation.DROP,
                title: info.title,
                bName: info.bDisplayName,
                did: info.dealId,
                lat: info.lat,
                lng: info.lng,
                logoUrl : info.logoUrl
            });

            marker.content = '<div class="infoWindowContent">' + info.title + info.bDisplayName  +'</div>';
            var url = "#/deals/dealDetails/"+marker.did;
            //var mapurl = "http://maps.google.com/maps?z=12&t=m&q=loc:" + marker.lat + "+" + marker.lng;
            
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<a href="'+ url +'">' + '<img style="float:left;margin-right:10px;border: 1px solid #CBCBCB;border-radius:100%;" src="' + marker.logoUrl + '" width="20%" height="20%"/>' + '</a>' + '<a href="'+ url +'" style="text-decoration: none">' + '<p class="markerDealTitle">' + marker.title + '</p>' + '<p class="markerDealBrand">' + marker.bName + '</p>'+'</a>');
                infoWindow.open($scope.map, marker);
        
            });
        
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {
                    google.maps.event.trigger($scope.map, 'resize');
                    $scope.map.setCenter(new google.maps.LatLng(myAvgLat,myAvgLng));
                });

            $scope.markers.push(marker);

        }

        for (var i = 0; i < tmpMarkerData.length; i++) {
             createMarker(tmpMarkerData[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
        


  

    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
   // $state.href(from, fromParams)
   //$rootScope.$previousState = from;
   
   //console.log('sanchit ' + $state.href(from, fromParams));
   //console.log('sanchit sanchit ' + $state.href(to, toParams));


   if($state.href(from, fromParams) == '#/deals/yourDeals' || $state.href(to, toParams) == '#/deals/multipleMapMarkersRecommended') {
    $scope.markers = multipleMarkersDealsDataRecommended;
    $scope.activateTab = 1;
    
   } else if($state.href(from, fromParams) == '#/deals/popularDeals' || $state.href(to, toParams) == '#/deals/multipleMapMarkersPopular') {
    $scope.markers = multipleMarkersDealsDataPopular;
    $scope.activateTab = 2;
   } else if($state.href(from, fromParams) == '#/deals/dealNearYou' || $state.href(to, toParams) == '#/deals/multipleMapMarkersMyDeals') {
    $scope.markers = multipleMarkersDealsData;
    $scope.activateTab = 3;
    
   } else {
        $scope.markers = multipleMarkersDealsDataRecommended;
        $scope.activateTab = 1;

   }

        
        var myLat = 0;
        var myLng = 0;
        for(var i=0; i<$scope.markers.length; i++) {
          myLat = myLat + $scope.markers[i].lat;
          myLng = myLng + $scope.markers[i].lng;
          var myAvgLat = myLat / $scope.markers.length;
          var myAvgLng = myLng / $scope.markers.length;
        }
        
        var mapOptions = {
            zoom: 12,
            center:new google.maps.LatLng(myAvgLat,myAvgLng),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        var tmpMarkerData = $scope.markers;

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function(info) {
            var mapLat = parseFloat(info.lat);
            var mapLng = parseFloat(info.lng);
   
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(mapLat, mapLng),
                animation: google.maps.Animation.DROP,
                title: info.title,
                bName: info.bDisplayName,
                did: info.dealId,
                lat: info.lat,
                lng: info.lng,
                logoUrl : info.logoUrl
            });

            marker.content = '<div class="infoWindowContent">' + info.title + info.bDisplayName + '</div>';
            var Url = "#/deals/dealDetails/"+marker.did;
            //var mapUrl = "http://maps.google.com/maps?z=12&t=m&q=loc:" + marker.lat + "+" + marker.lng;
            google.maps.event.addListener(marker, 'click', function() {
                  infoWindow.setContent('<a href="'+ Url +'">' + '<img style="float:left;margin-right:10px;border: 1px solid #CBCBCB;border-radius:100%;" src="' + marker.logoUrl + '" width="20%" height="20%"/>' + '</a>' + '<a href="'+ Url +'" style="text-decoration: none">' + '<p class="markerDealTitle">' + marker.title + '</p>' + '<p class="markerDealBrand">' + marker.bName + '</p>'+'</a>');
                  infoWindow.open($scope.map, marker);
        
            });

      google.maps.event.addListenerOnce($scope.map, 'idle', function () {
                    google.maps.event.trigger($scope.map, 'resize');
                    $scope.map.setCenter(new google.maps.LatLng(myAvgLat,myAvgLng));
                });
        

            $scope.markers.push(marker);

        }

        for (var i = 0; i < tmpMarkerData.length; i++) {
             createMarker(tmpMarkerData[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
          
        }
    
        //google.maps.event.trigger($scope.map, 'resize');
  
        //$ionicLoading.hide();
         });
    }
    
])

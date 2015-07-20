var DealsService = angular.module('DealsService', []);

DealsService.service("DealsService", ['$http', '$ionicLoading', '$q', 'domainUrl', '$state',
    '$cordovaGeolocation', 'LocalStorageService', 'ConnectionService', '$ionicLoading', '$window', 'RemoteDataService',
    function($http, $ionicLoading, $q, domainUrl, $state, $cordovaGeolocation,
        LocalStorageService, ConnectionService, $ionicLoading, $window, RemoteDataService) {

        var lat;
        var lng;
        var id = LocalStorageService.get('deviceUUID');


        function locBasedDeals(dealRes, start, end) {


            var deferred = $q.defer();
            var url = dealRes + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, true, false);
        }

        function locBasedDealsPagination(start, end) {


            var deferred = $q.defer();
            var url = 'deals?' + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, true, true);
        }

        function popularDeals(start, end) {

            lat = LocalStorageService.get('dealLat');
            lng = LocalStorageService.get('dealLng');

            /*var deferred = $q.defer();*/
            var url = 'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            console.log(url);
            return RemoteDataService.fetchData(url, false, false);


        }

        function popularDealsPagination(start, end) {

            lat = LocalStorageService.get('dealLat');
            lng = LocalStorageService.get('dealLng');

            var deferred = $q.defer();
            var url = 'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            console.log(url);
            return RemoteDataService.fetchData(url, false, true);
        }

        function dealsNearYou(start, end) {


            //return {}

            var options = {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true
            }

            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;

            }, function(err) {

                lat = '';
                lng = '';

            })

            if (lat == '' || lat == null || lng == '' || lng == null) {
                var url = 'deals/myDeals?deviceUUID=' + id + '&start=' + start + '&end=' + end;
            } else {
                LocalStorageService.set('dealLat', lat);
                LocalStorageService.set('dealLng', lng);
                var url = 'deals/myDeals?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end;


            }
            console.log(url);
            return RemoteDataService.fetchData(url, false, false);

        }

        function dealNearYouPagination(start, end) {
            var options = {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true
            }

            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;

            }, function(err) {

                lat = '';
                lng = '';

            })

            if (lat == '' || lat == null || lng == '' || lng == null) {
                var url = 'deals/myDeals?deviceUUID=' + id + '&start=' + start + '&end=' + end;
            } else {
                LocalStorageService.set('dealLat', lat);
                LocalStorageService.set('dealLng', lng);
                var url = 'deals/myDeals?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end;


            }
            console.log(url);
            return RemoteDataService.fetchData(url, false, false);

        }

        return {
            /*getDeals: function(hasPagination, start, end) {
              var x = $window.sessionStorage.getItem('initial'); 

            
              if(x == 'null'){
                            
                var q = $q.defer();
                if (ConnectionService.connectionStatus()) {
                  
                  var options = {
                    maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
                  }

                  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
             
                    $window.sessionStorage.setItem('lat',position.coords.latitude);
                     $window.sessionStorage.setItem('lng',position.coords.longitude);
                     LocalStorageService.set('dealLat',position.coords.latitude);
                     LocalStorageService.set('dealLng',position.coords.longitude);
                     lat = $window.sessionStorage.getItem('lat');
                     lng = $window.sessionStorage.getItem('lng');
                     $window.sessionStorage.setItem('initial', {});

                    if (hasPagination)
                      q.resolve(locBasedDealsPagination(start, end))

                    else 
                       q.resolve(locBasedDeals('deals?', start, end))
                      
                  }, function(err){
                    
                    $window.sessionStorage.setItem('initial', {});
                    $window.sessionStorage.setItem('lat','');
                    $window.sessionStorage.setItem('lng','');
                    if (hasPagination)
                        q.resolve(locBasedDealsPagination(start, end))

                    else
                        q.resolve(locBasedDeals('deals?', start, end))
                  })
                    
                } else {
                    q.resolve({});
                    
                }
                
                return q.promise;
              }
              else{
                

                if (ConnectionService.connectionStatus()) {

                    if (hasPagination)
                        return locBasedDealsPagination(start, end);
                    else
                        return locBasedDeals('deals?', start, end);
                } else {

                    return {};
                }
              }
              
            },*/

            getDeals: function() {
                /*var options = {
                    maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
                  }

                  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
             
                    $window.sessionStorage.setItem('lat',position.coords.latitude);
                     $window.sessionStorage.setItem('lng',position.coords.longitude);
                     LocalStorageService.set('dealLat',position.coords.latitude);
                     LocalStorageService.set('dealLng',position.coords.longitude);
                     $window.sessionStorage.setItem('initial', {});
                     
                 },function(err) {

                  $window.sessionStorage.setItem('initial', {});
                    $window.sessionStorage.setItem('lat','');
                    $window.sessionStorage.setItem('lng','');
                    

                 })*/
                lat = LocalStorageService.get('dealLat');
                lng = LocalStorageService.get('dealLng');

                var deferred = $q.defer();
                var url = 'deals?' + 'lat=' + lat + '&lng=' + lng + '&start=&end=';
                console.log(url);
                return RemoteDataService.fetchData(url, true);
            },

            getPopularDeals: function(hasPagination, start, end) {
                if (hasPagination)
                    return popularDealsPagination(start, end);
                else
                    return popularDeals(start, end);

            },

            getDealsNearYou: function(hasPagination, start, end) {
                if (hasPagination)
                    return dealNearYouPagination(start, end);
                else
                    return dealsNearYou(start, end);

            },

            getCarousel: function() {

                if (ConnectionService.connectionStatus()) {
                    lat = LocalStorageService.get('dealLat');
                    lng = LocalStorageService.get('dealLng');

                    var id = LocalStorageService.get('deviceUUID');

                    var deferred = $q.defer();
                    var url = 'deals/carousel?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng;

                    return RemoteDataService.fetchData(url, true, false);

                } else {
                    return {};
                }

            },

            getSearchResult: function(searchTextInput, start, end) {
                var lat = $window.sessionStorage.getItem('lat');
                var lng = $window.sessionStorage.getItem('lng');


                var url = 'deals/search?lat=' + lat + '&lng=' + lng + '&searchQuery=' + searchTextInput + '&start=' + start + '&end=' + end;

                return RemoteDataService.fetchData(url, true, false);


            },

            postDealImpressions: function(dealData) {
                $http.post(domainUrl + 'users/' + id + '/dealImpressions', dealData).success(function() {


                }).error(function(data, status, headers, config) {

                });

            },

            postCarouselImpressions: function(dealID) {
                $http.post(domainUrl + 'users/' + id + '/dealImpression/' + dealID).success(function() {


                }).error(function(data, status, headers, config) {

                });

            },

            /*getSearchResultPagination: function(searchTextInput, start, end) {
                var lat = $window.sessionStorage.getItem('lat');
                var lng = $window.sessionStorage.getItem('lng');
                
                var url = 'deals/search?lat=' + lat + '&lng=' + lng + '&searchQuery=' + searchTextInput + '&start=' + start + '&end=' + end;
                return RemoteDataService.fetchData(url, true, true);
            }*/
        }
    }
]);

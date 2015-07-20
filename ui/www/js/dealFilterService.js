var DealFilterService = angular.module('DealFilterService', []);

DealFilterService.service("DealFilterService", ['$http', '$ionicLoading', '$q', 'domainUrl', '$state',
    '$cordovaGeolocation', 'LocalStorageService', 'ConnectionService', '$ionicLoading', '$window', 'RemoteDataService',
    function($http, $ionicLoading, $q, domainUrl, $state, $cordovaGeolocation,
        LocalStorageService, ConnectionService, $ionicLoading, $window, RemoteDataService) {

      var lat='';
      var lng = '';
      var id = LocalStorageService.get('deviceUUID');


        function locBasedDeals(dealRes, start, end) {
            /*var lat = null;
            var lng = null;
            var options = {
                    maximumAge: Infinity,
                    timeout: 0,
                    enableHighAccuracy: false
                }
            return $cordovaGeolocation.getCurrentPosition(options).then(
                function(position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    var deferred = $q.defer();
                    var url = domainUrl + dealRes + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)
                        },
                        function(err) {
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                },
                function(err) {
                    alert("err")
                    lat = '';
                    lng = '';

                    var deferred = $q.defer();
                    var url = domainUrl + dealRes + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(
                        function(resp) {
                            console.log(resp)
                            deferred.resolve(resp.data)
                        },
                        function(err) {
                            console.log(err)
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                }
            );*/

            var deferred = $q.defer();
            var url = dealRes + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, true, false);
        }

        function locBasedDealsPagination(start, end) {
            /*var lat = null;
            var lng = null;
            return $cordovaGeolocation.getCurrentPosition().then(
                function(position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals?' + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                },
                function(err) {
                    alert("err")
                    lat = '';
                    lng = '';
                    var deferred = $q.defer();
                    var url = domainUrl + 'deals?' + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                }, {
                    maximumAge: Infinity,
                    timeout: 0,
                    enableHighAccuracy: false
                }
            );*/

            var deferred = $q.defer();
            var url =   'deals?' + 'lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, true, true);
        }

        function popularDeals(start, end) {
            /*var lat = null;
            var lng = null;
            var id = LocalStorageService.get('deviceUUID');
            return $cordovaGeolocation.getCurrentPosition().then(
                function(position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                },
                function(err) {
                    lat = '';
                    lng = '';

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
                    console.log(url)
                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;

                }, {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: true
                }
            );*/

            /*var deferred = $q.defer();*/
            var url =  'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, true, false);
           /* $http.get(url, {
                cache:true
            }).then(
              function(resp) {
              console.log(resp)
              deferred.resolve(resp.data)
            },
              function(err) {
                console.log(err)
                $ionicLoading.hide();
                deferred.reject();
              }
            )
            return deferred.promise;*/


        }

        function popularDealsPagination(start, end) {
            /*var lat = null;
            var lng = null;
            var id = LocalStorageService.get('deviceUUID');
            return $cordovaGeolocation.getCurrentPosition().then(
                function(position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
$ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                },
                function(err) {
                    lat = '';
                    lng = '';

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
$ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;

                }, {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: true
                }
            );*/

            var deferred = $q.defer();
            var url =   'deals/popular?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, true, true);
        }

        function dealsNearYou(start, end) {
            /*var lat = null;
            var lng = null;
            var id = LocalStorageService.get('deviceUUID');

            return $cordovaGeolocation.getCurrentPosition().then(
                function(position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals/myDeals?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end;;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
$ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                },
                function(err) {
                    lat = null;
                    lng = null;
                    return {};


                }, {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: true
                }
            );*/
          if(lat == '' || lng == ''){
            
            return {}
          }
          else{
           
            /*var deferred = $q.defer();*/
          var url = 'deals/myDeals?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end;;
          
            /*$http.get(url, {
                cache:true
            }).then(
              function(resp) {
              console.log(resp)
              
              deferred.resolve(resp.data)
            },
              function(err) {
                console.log(err)
                $ionicLoading.hide();
                deferred.reject();
              }
            )
              return deferred.promise;*/
              return RemoteDataService.fetchData(url, false, false);
          }
          
            
        }

        function dealNearYouPagination(start, end) {
            /*var lat = null;
            var lng = null;
            var id = LocalStorageService.get('deviceUUID');

            return $cordovaGeolocation.getCurrentPosition().then(
                function(position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;

                    var deferred = $q.defer();
                    var url = domainUrl + 'deals/myDeals?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end;

                    $http.get(url, {
                        cache:true
                    }).then(

                        function(resp) {
                            deferred.resolve(resp.data)

                        },
                        function(err) {
$ionicLoading.hide();
                            deferred.reject();
                        }
                    )
                    return deferred.promise;
                },
                function(err) {
                    lat = null;
                    lng = null;
                    return {};
                }, {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: true
                }
            );*/
          if(lat == '' || lng == ''){
            return {}
          }
          else{

            var deferred = $q.defer();
            var url =   'deals/myDeals?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end;
            return RemoteDataService.fetchData(url, false,  true);
          }
        }

        return {
            getDeals: function(hasPagination, start, end) {
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

                    var id = LocalStorageService.get('deviceUUID');

                    var deferred = $q.defer();
                    var url =  'deals/carousel?deviceUUID=' + id;

                    return RemoteDataService.fetchData(url, true, false);

                } else {
                    return {};
                }

            },

            getSearchResult: function(searchTextInput, start, end) {
                var lat = '';
                var lng = '';
 
                var url = 'deals/search?lat=' + lat + '&lng=' + lng + '&searchQuery=' + searchTextInput + '&start=0&end=10';
                
                return RemoteDataService.fetchData(url, true, false);


            },
            
            postDealImpressions : function(dealData) {
                   $http.post(domainUrl+'users/'+id+'/dealImpressions', dealData).success(function(){
                    
                    
                   }).error(function (data, status, headers, config) {
                   
                  });
               
            },

            postCarouselImpressions : function(dealID) {
                   $http.post(domainUrl+'users/'+id+'/dealImpression/'+dealID).success(function(){
                    
                   
                   }).error(function (data, status, headers, config) {
                   
                  });
               
            },

            getSearchResultPagination: function(searchTextInput, start, end) {
                var lat = '';
                var lng = '';

                var url = domainUrl + 'deals/search?lat=' + lat + '&lng=' + lng + '&searchQuery=' + searchTextInput + '&start=' + start + '&end=' + end;
                return RemoteDataService.fetchData(url, true, true);
            }
        }
    }
]);
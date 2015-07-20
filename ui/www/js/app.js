// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var madzz = angular.module("madzz", ['ionic', 'ngImgCache', 'ngS3upload', 'SplashService',
    'IntroController', 'DealsController', 'DealsService',
    'DealDetailController', 'DealDetailService', 'CategoryController', 'CategoryService',
    'UserRegLogController', 'UserRegLogService', 'ion-google-place', 'MerchRegController', 'BusinessService', 'UtilityService', 'PostADealController', 'catBrandsMallsService',
    'FavBrandsController', 'FavBrandsService', 'StoreViewMerchController', 'StoreViewMerchService',
    'UserProfileController', 'UserProfileService', 'SavedDealsController', 'SavedDealsService',
    'ManageDealsController', 'ManageDealsService', 'MerchantSettingsController',
    'DealAnalyticsService', 'DealAnalyticsController', 'MultipleMarkersController',
    'MallViewService', 'MallViewController', 'UserSettingsController',
    'StoreViewUserController', 'StoreViewUserService', 'TokenService', 'ngCordova',
    'LeadershipBoardController', 'KarmaPointsController', 'LeadershipBoardService',
    'KarmaPointsService', 'MallsListViewController', 'MallsListViewService', 'SearchController', 'CatFilterController',
	'DealFilterController', 'DealFilterService', 'LocationController', 'LocalityController', 'HomeController', 'FlashDealsController',
	'createStoreController','addUserController','merchantSignInController','editUserController','editStoreController'
]);

(function(angular) {

    "use strict";

    var ngImgCache = angular.module('ngImgCache', []);

    ngImgCache.directive('ngCache', function() {

        return {
            restrict: 'A',
            link: function(scope, el, attrs) {

                attrs.$observe('ngSrc', function(src) {

                    ImgCache.isCached(src, function(path, success) {

                        if (success) {
                            ImgCache.useCachedFile(el);

                        } else {

                            ImgCache.cacheFile(src, function() {
                                ImgCache.useCachedFile(el);
                            });
                        }
                    });

                });
            }
        };
    });

})(angular);

madzz.directive('map', ["$ionicLoading", function($ionicLoading) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            lat: '@',
            lng: '@'
        },
        template: "<div></div>",
        link: function($scope, $element) {
            var businessLat = parseFloat($scope.lat);
            var businessLng = parseFloat($scope.lng);

            function CreateMap(center, successFunction) {
                var map = new google.maps.Map($element[0], {
                    center: center,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    streetViewControl: false,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    }
                });
                var styledMapType = new google.maps.StyledMapType([{
                    featureType: 'all',
                    elementType: 'all',
                    stylers: [{
                        saturation: -99
                    }]
                }], {
                    map: map,
                    name: 'Night Map'
                });
                map.mapTypes.set('map-style', styledMapType);
                map.setMapTypeId('map-style');
                google.maps.event.addDomListener($element[0], 'mousedown', function(e) {
                    e.preventDefault();
                    return false;
                });
                google.maps.event.addListener(map, 'click', function(e) {
                    CreateMarker(e.latLng);
                });
                google.maps.event.addListener(map, "idle", function() {
                    google.maps.event.trigger(map, 'resize');
                });
                var marker = new google.maps.Marker();

                function CreateMarker(latLng) {
                    $scope.$parent.latitud = latLng.lat(); //latitud
                    
                    $scope.$parent.longitud = latLng.lng(); //longitud
                    
                    marker.setMap(null);
                    marker = new google.maps.Marker({
                        position: latLng,
                        animation: google.maps.Animation.DROP,
                        map: map
                    });
                    map.setZoom(17);
                    setTimeout(function() {
                        map.setZoom(18);
                        map.setCenter(latLng);
                    }, 500);
                }
                if (successFunction) {
                    successFunction(CreateMarker);
                }
            }
            if (!$scope.$parent.geolocalizado) { //No Location yet
                $ionicLoading.show({
                    template: '<i class="icon ion-loading-b"></i>'
                });
                /*navigator.geolocation.getCurrentPosition(function (pos) {
                    var LatLng = new google.maps.LatLng(businessLat, businessLng);
                    CreateMap(LatLng, function (CreateMarker) {
                        CreateMarker(LatLng);
                        $ionicLoading.hide();
                        $scope.$parent.geolocalizado = true;
                    });
                }, function () {
                    //Default Location
                    var LatLng = new google.maps.LatLng(6.233311, -75.575248);
                    CreateMap(LatLng, function () {
                        $ionicLoading.hide();
                        $scope.$parent.geolocalizado = true;
                    });
                },{maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});*/
                var LatLng = new google.maps.LatLng(businessLat, businessLng);
                CreateMap(LatLng, function(CreateMarker) {
                    CreateMarker(LatLng);
                    $ionicLoading.hide();
                    $scope.$parent.geolocalizado = true;
                });
            } else {
                var LatLng = new google.maps.LatLng($scope.$parent.latitud,
                    $scope.$parent.longitud);
                CreateMap(LatLng, function(CreateMarker) {
                    CreateMarker(LatLng);
                });
            }
        }
    }
}]);


/*
  Value : Global Param
  Type : DI values
*/
//madzz.value("domainUrl", "http://192.168.0.112:8080/madzz/rest/") 
//madzz.value("S3_DEV_BUCKET", "madzz-dev-bucket")
madzz.value("domainUrl", "http://madzztest1-env.elasticbeanstalk.com/rest/")

madzz.config(["$httpProvider", "$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", "$injector", function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $injector) {

    /*  $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;*/

    $ionicConfigProvider.tabs.position('bottom');
    window.sessionStorage.setItem('initial', null);

    /* $httpProvider.interceptors.push(["$rootScope", "$injector", function($rootScope, $injector) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show')
          return config
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide')
          return response
        }
      }
    }])*/

    $stateProvider
    // route for the home page

        .state('deals', {
        url: "/deals",
        abstract: true,
        templateUrl: "templates/deals.html"
    })

    .state('searchResult', {
        url: "/searchResult/:key/:carKey",
        templateUrl: "templates/searchResult.html",
        controller: 'SearchController'
    })

    .state('deals.yourDeals', {
        url: '/yourDeals',
        views: {
            'your-deals': {

                templateUrl: 'templates/your-deals.html',
                controller: 'DealsController',
                resolve: {
                    dealsData: ["DealsService", function(DealsService) {

                        return DealsService.getDeals();
                    }],
                    carousel: ["DealsService", function(DealsService) {

                        return DealsService.getCarousel();
                    }]
                }
            }
        }
    })

    .state('deals.popularDeals', {
        url: "/popularDeals",
        views: {
            'your-deals': {
                templateUrl: 'templates/your-popular-deals.html',
                controller: 'PopularDealsController',
                resolve: {
                    popularDealsData: ["DealsService", function(DealsService) {
                        return DealsService.getPopularDeals(false, 0, 10);
                    }],
                    carousel: ["DealsService", function(DealsService) {
                        return DealsService.getCarousel();
                    }]
                }
            }
        }
    })

    .state('deals.dealsNearYou', {
        url: "/dealNearYou",
        views: {
            'your-deals': {
                templateUrl: 'templates/deals-near-you.html',
                controller: 'DealNearYouController',
                resolve: {
                    dealsNearYouData: ["DealsService", function(DealsService) {
                        return DealsService.getDealsNearYou(false, 0, 10);
                    }],
                    carousel: ["DealsService", function(DealsService) {
                        return DealsService.getCarousel();
                    }]
                }
            }
        }
    })


    /*.state('catDeals', {
          url: "/catDeals",
          templateUrl:'templates/catDeals.html',
          controller:'DealsController',
          resolve:{
              dealsData : ["DealsService", function(DealsService){
                var startInitial = 0, startEnd = 10
                  return DealsService.getDeals(false, startInitial, startEnd);
              }],
              carousel : ["DealsService", function(DealsService){
                
                return DealsService.getCarousel();
              }]
            }
    })*/


    .state('deals.details', {
        url: "/dealDetails/:dealId",
        views: {
            'your-deals': {
                templateUrl: "templates/details.html",
                controller: "DealDetailController",
                resolve: {
                    dealDetailsData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getDealDesc($stateParams.dealId);
                    }]
                }
            }
        }
    })

    /*.state('deals.directions', {
        url: '/directions/:dealId',
        views: {
            'your-deals': {
                templateUrl: 'templates/mapDirection.html',
                controller: 'DirectionController',
    resolve:{
          dealMapData: function($stateParams, DealDetailService){
            return DealDetailService.getDealDesc($stateParams.dealId);
          }
               }
            }
        }
    })*/


    .state('deals.mallView', {
        url: "/mallView/:mall",
        views: {
            'your-deals': {
                templateUrl: "templates/mallView.html",
                controller: "MallViewController",
                resolve: {
                    mallData: ["$stateParams", "MallViewService", function($stateParams, MallViewService) {
                        return MallViewService.getMall($stateParams.mall);
                    }],
                    mallDeals: ["$stateParams", "MallViewService", function($stateParams, MallViewService) {
                        return MallViewService.getDeals($stateParams.mall);
                    }]
                }
            }
        }
    })

    .state('deals.storeViewUser', {
        url: "/storeView/:store",
        views: {
            'your-deals': {
                templateUrl: "templates/storeViewUser.html",
                controller: "StoreViewUserController",
                resolve: {
                    storeData: ["$stateParams", "StoreViewUserService", function($stateParams, StoreViewUserService) {
                        return StoreViewUserService.getStore($stateParams.store);
                    }],
                    storeDeals: ["$stateParams", "StoreViewUserService", function($stateParams, StoreViewUserService) {
                        return StoreViewUserService.getDeals($stateParams.store);
                    }]
                }
            }
        }
    })

    /* .state('deals.storeViewUser', {
        url: "/storeView/:store",
        views: {
          'your-deals': {
        templateUrl: "templates/storeViewUser.html",
        controller: "StoreViewUserController",
        resolve: {
                storeData : function($stateParams, StoreViewUserService){
                return StoreViewUserService.getStore($stateParams.store);
                },
                storeDeals : function($stateParams, StoreViewUserService){
                return StoreViewUserService.getDeals($stateParams.store);
          }
            }
          }
        }
      }) */

    .state('deals.mallsListView', {
        url: '/mallsListView',
        views: {
            'your-deals': {
                templateUrl: 'templates/mallsListView.html',
                controller: 'MallsListViewController',
                resolve: {
                    mallsListData: ['MallsListViewService', function(MallsListViewService) {
                        return MallsListViewService.getMalls();
                    }]
                }
            }
        }
    })

    .state('deals.mallDetails', {
        url: "/mallDetails/:id",
        views: {
            'your-deals': {
                templateUrl: "templates/mallView.html",
                controller: "MallViewController",
                resolve: {
                    mallData: ["$stateParams", "MallViewService", function($stateParams, MallViewService) {
                        return MallViewService.getMall($stateParams.id);
                    }],
                    /*mallDeals : ["$stateParams", "MallViewService", function($stateParams, MallViewService){
            return MallViewService.getDeals($stateParams.mallId);
      }]*/
                    mallDeals: ["$stateParams", "MallViewService", function($stateParams, MallViewService) {
                        return MallViewService.getDealsInMall($stateParams.id, true, 0, 10);
                    }]
                }
            }
        }
    })


    /* .state('deals.detailsMap',{
    url:"/dealDetailsMap/:dealId",
    views: {
      'your-deals':{
        templateUrl:"templates/details.html",
        controller: "DealDetailController",
  resolve : {
          dealDetailsData : ["$stateParams", "DealDetailService", function($stateParams, DealDetailService){
            return DealDetailService.getDealDesc($stateParams.dealId);
          }]
        }
      }
    }
  })*/



    .state('deals.multipleMapMarkers', {
        url: '/multipleMapMarkers',
        views: {
            'your-deals': {
                templateUrl: 'templates/mapMultipleMarkers.html',
                controller: 'MultipleMarkersController',
                resolve: {
                    multipleMarkersDealsData: ["DealsService", function(DealsService) {
                        return DealsService.getDealsNearYou();
                    }],
                    multipleMarkersDealsDataPopular: ["DealsService", function(DealsService) {
                        return DealsService.getPopularDeals();
                    }],
                    multipleMarkersDealsDataRecommended: ["DealsService", function(DealsService) {
                        return DealsService.getDeals();
                    }]
                }
            }
        }
    })
    
    .state('deals.home', {
        url: '/home',
        views: {
            'your-deals' : {
                templateUrl: 'templates/home.html',
                //controller: 'HomeController'
            }
        }

    })

    .state('deals.multipleMapMarkersMyDeals', {
        url: '/multipleMapMarkersMyDeals',
        views: {
            'your-dealsmap': {
                templateUrl: 'templates/mapMultipleMarkers.html',
                controller: 'MultipleMarkersController'

            }
        }
    })

    .state('deals.multipleMapMarkersPopular', {
        url: '/multipleMapMarkersPopular',
        views: {
            'your-dealsmap': {
                templateUrl: 'templates/mapMultipleMarkers.html',
                controller: 'MultipleMarkersController'

            }
        }
    })

    .state('deals.multipleMapMarkersRecommended', {
        url: '/multipleMapMarkersRecommended',
        views: {
            'your-dealsmap': {
                templateUrl: 'templates/mapMultipleMarkers.html',
                controller: 'MultipleMarkersController'

            }
        }
    })



    /*.state('deals.favStores', {
        cache : false,
        url: '/favStores',
        views: {
          'your-stores': {
            templateUrl: 'templates/your-stores.html',
            controller: 'FavStoresController',
            resolve:{
            favStoresData : ["FavStoresService", function(FavStoresService){
              return FavStoresService.getUserFavStores();
            }],
            businessData : ["FavStoresService", function(FavStoresService){
              return FavStoresService.getAllBusiness();
            }]
          } 
          }
        }
      })*/

    .state('deals.favBrands', {
        cache: true,
        url: '/favBrands',
        views: {
            'your-deals': {
                templateUrl: 'templates/your-brands.html',
                controller: 'FavBrandsController'
                    /*resolve: {
                      favBrandsData: function(FavBrandsService){
                        return FavBrandsService.getUserFavBrands();
                      }
                    }*/
            }
        }
    })



    .state('deals.selectFavBrands', {
        cache: true,
        url: '/selectFavBrands/',
        views: {
            'your-deals': {
                templateUrl: 'templates/selectBrands.html',
                controller: 'SelectBrandsController',
                resolve: {
                    brandsData: ["FavBrandsService", function(FavBrandsService) {
                        return FavBrandsService.getAllBrands(false, 0, 12);
                    }]
                }
            }
        }
    })

    /*.state('deals.brandLoc',{
      cache: true,
      url: '/brandLoc/:id',
      views:{
        'your-brands':{
          templateUrl:'templates/brandLoc.html',
          controller: 'BrandLocController',
          resolve:{
            brandLocData: function($stateParams, FavBrandsService){
              return FavBrandsService.getBrandLoc($stateParams.id);
            },
            brandDetailsData: function($stateParams, FavBrandsService){
              return FavBrandsService.getBrandDetails($stateParams.id);
            }
          }
        }
      }
    })*/

    .state('deals.brandDeals', {
        cache: true,
        url: '/brandDeals/:id',
        views: {
            'your-deals': {
                templateUrl: 'templates/brandDeals.html',
                controller: 'BrandDealsController',
                resolve: {
                    brandDealsData: ["$stateParams", "FavBrandsService", function($stateParams, FavBrandsService) {
                        return FavBrandsService.getBrandDeals($stateParams.id, false, 0, 10);
                    }],
                    brandDetailsData: ["$stateParams", "FavBrandsService", function($stateParams, FavBrandsService) {
                        return FavBrandsService.getBrandDetails($stateParams.id);
                    }]
                }
            }
        }
    })

    .state('deals.brandDealsDetails', {
        cache: true,
        url: '/brandDealsDetails/:dealId',
        views: {
            'your-deals': {
                templateUrl: "templates/details.html",
                controller: "DealDetailController",
                resolve: {
                    dealDetailsData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getDealDesc($stateParams.dealId);
                    }]
                }
            }
        }
    })

    .state('deals.storeViewBrand', {
        url: "/storeViewBrand/:store",
        views: {
            'your-deals': {
                templateUrl: "templates/storeViewUser.html",
                controller: "StoreViewUserController",
                resolve: {
                    storeData: ["$stateParams", "StoreViewUserService", function($stateParams, StoreViewUserService) {
                        return StoreViewUserService.getStore($stateParams.store);
                    }],
                    storeDeals: ["$stateParams", "StoreViewUserService", function($stateParams, StoreViewUserService) {
                        return StoreViewUserService.getDeals($stateParams.store);
                    }]
                }
            }
        }
    })

    .state('deals.savedDeals', {
        url: '/savedDeals',
        views: {
            'your-deals': {
                templateUrl: 'templates/saved-deals.html',
                controller: 'SavedDealsController',
                resolve: {
                    storedDealsData: ["SavedDealsService", function(SavedDealsService) {
                        return SavedDealsService.getSavedDeals();
                    }]
                }
            }
        }
    })

    .state('deals.savedDealsDet', {
        url: "/savedDealsDet/:dealId",
        views: {
            'your-deals': {
                templateUrl: "templates/details.html",
                controller: "DealDetailController",
                resolve: {
                    dealDetailsData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getDealDesc($stateParams.dealId);
                    }]
                }
            }
        }
    })

    .state('deals.catFilter', {
        url: "/catFilter",
        views: {
            'your-deals': {
                templateUrl: "templates/catFilter.html",
                controller: "CatFilterController",
                resolve: {
                    catData: ["CategoryService", function(CategoryService) {
                        return CategoryService.getCats();
                    }]
                }
            }
        }
    })

    /*.state('deals.catLocation',{
      url:"/catLocation",
      views: {
        'your-deals':{
          templateUrl:"templates/catLocation.html",
          controller: "LocationController",
          resolve : {
            getLocationData : ["DealDetailService", function(DealDetailService){
              return DealDetailService.getLocation();
            }]
          }
        }
      }
    })*/


    .state('deals.dealFilter', {
        url: "/dealFilter/:cid",
        views: {
            'your-deals': {
                templateUrl: "templates/dealFilter.html",
                controller: "DealFilterController",
                resolve: {
                    dealFilterData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getDealFilter($stateParams.cid, true, 0, 10);
                    }],
                    carouselFilterData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getCarouselFilter($stateParams.cid);
                    }]
                }
            }
        }
    })

    .state('deals.location', {
        url: "/location",
        views: {
            'your-deals': {
                templateUrl: "templates/location.html",
                controller: "LocationController",
                resolve: {
                    getLocationData: ["DealDetailService", function(DealDetailService) {
                        return DealDetailService.getLocation();
                    }]
                }
            }
        }
    })

    .state('deals.localities', {
        url: "/localities/:lid",
        views: {
            'your-deals': {
                templateUrl: "templates/locality.html",
                controller: "LocalityController",
                resolve: {
                    getLocalityData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getLocality($stateParams.lid);
                    }]
                }
            }
        }
    })

    .state('deals.deallocalities', {
        url: "/deallocalities/:lid/:locId",
        views: {
            'your-deals': {
                templateUrl: "templates/localitydeal.html",
                controller: "DealLocalityController",
                resolve: {
                    getDealLocalityData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getDealLocality($stateParams.lid, $stateParams.locId, true, 0, 10);
                    }]
                }
            }
        }
    })




    .state('userSettings', {
        url: "/userSettings",
        templateUrl: "templates/userSettings.html",
        controller: 'UserSettingsController',
        resolve: {
            catData: ["CategoryService", function(CategoryService) {
                return CategoryService.getCats();
            }],
            checkedCatData: ["CategoryService", function(CategoryService) {
                return CategoryService.getUserSelectedCategories();
            }]
        }
    })

    .state('intro', {
        url: "/intro",
        templateUrl: "templates/intro.html",
        controller: "IntroController"
            /*,
                resolve:{
                  statsData : ["SplashService", function(SplashService){
                    return SplashService.getStats();
                  }]
                } */
    })

    .state('splashDeals', {
        url: "/splashDeals",
        templateUrl: "templates/splashDeals.html",
        controller: "SplashDealsController"
    })


    .state('merch', {
        url: "/merch",
        abstract: true,
        templateUrl: "templates/merch.html"
    })

    .state('merch.merchProfile', {
        url: '/merchProfile',
        views: {
            'merch-profile': {

                templateUrl: 'templates/storeViewMerch.html',
                controller: "StoreViewMerchController",
                resolve: {
                    storeData: ["StoreViewMerchService", function(StoreViewMerchService) {
                        return StoreViewMerchService.getStore();
                    }],
                    storeDeals: ["StoreViewMerchService", function(StoreViewMerchService) {
                        return StoreViewMerchService.getDeals();
                    }],
                    storeAnalytics: ["StoreViewMerchService", function(StoreViewMerchService) {
                        return StoreViewMerchService.getBusinessAnalytics();
                    }]
                }

            }
        }
    })

    .state('merch.merchDealDetails', {
        url: "/merchDealDetails/:dealId",
        views: {
            'merch-profile': {
                templateUrl: "templates/merchDetails.html",
                controller: "DealDetailController",
                resolve: {
                    dealDetailsData: ["$stateParams", "DealDetailService", function($stateParams, DealDetailService) {
                        return DealDetailService.getDealDesc($stateParams.dealId);
                    }]
                }
            }
        }
    })

    .state('merch.merchViewUser', {
        url: "/merchView/:store",
        views: {
            'merch-profile': {
                templateUrl: "templates/merchDetail.html",
                controller: "StoreViewUserController",
                resolve: {
                    storeData: ["$stateParams", "StoreViewUserService", function($stateParams, StoreViewUserService) {
                        return StoreViewUserService.getStore($stateParams.store);
                    }],
                    storeDeals: ["$stateParams", "StoreViewUserService", function($stateParams, StoreViewUserService) {
                        return StoreViewUserService.getDeals($stateParams.store);
                    }]
                }
            }
        }
    })


    .state('merch.postADeal', {
        url: '/postADeal',
        views: {
            'merch-post-deal': {

                templateUrl: 'templates/postADeal.html',
                controller: "PostADealController",
                resolve: {
                    catData: ["CategoryService", function(CategoryService) {
                        return CategoryService.getCats();
                    }],
                    brandsData: ["BusinessService", function(BusinessService) {
                        return BusinessService.getBrands();
                    }],
                    selectedCatData: ["CategoryService", function(CategoryService) {
                        return CategoryService.getSelectedCat();
                    }]
                }

            }
        }
    })

    .state('merch.manageDeal', {
        url: '/manageDeals',
        views: {
            'merch-mng-deal': {
                templateUrl: "templates/manageDeals.html",
                controller: "ManageDealsController",
                resolve: {
                    manageDealsData: ["ManageDealsService", function(ManageDealsService) {
                        return ManageDealsService.getDeals();
                    }]
                }

            }
        }
    })

    .state('merch.dealAnalytics', {
        url: '/dealAnalytics',
        views: {
            'merch-deal-analytics': {
                templateUrl: "templates/dealAnalytics.html",
                controller: "DealAnalyticsController",
                resolve: {
                    analyticsData: ["DealAnalyticsService", function(DealAnalyticsService) {
                        return DealAnalyticsService.getDealAnalytics();
                    }]
                }

            }
        }
    })

    .state('merch.upgradeIntro', {
        url: '/upgradeIntro',
        views: {
            'merch-mng-deal': {
                templateUrl: "templates/upgradeIntro.html"

            }
        }
    })


    .state('merch.merchSettings', {
        url: '/merchSettings',
        views: {
            'merch-profile': {

                templateUrl: 'templates/merchSettings.html',
                controller: "MerchantSettingsController",
                resolve: {
                    businessData: ["StoreViewMerchService", function(StoreViewMerchService) {
                        return StoreViewMerchService.getStore();
                    }],
                    catData: ["CategoryService", function(CategoryService) {
                        return CategoryService.getCats();
                    }],
                    brandsData: ["BusinessService", function(BusinessService) {
                        return BusinessService.getBrands();
                    }],
                    mallsData: ["BusinessService", function(BusinessService) {
                        return BusinessService.getMalls();
                    }],
                    businessSelectedData: ["CategoryService", function(CategoryService) {
                        return CategoryService.getSelectedCat();
                    }]
                }

            }
        }
    })

    /*.state('merchSettings', {
      url: "/merchSettings",
      templateUrl:"templates/merchSettings.html",
      controller : "MerchantSettingsController",
      resolve : {
        businessData : ["StoreViewMerchService", function(StoreViewMerchService){
                return StoreViewMerchService.getStore();
        }],
        catData : ["CategoryService", function(CategoryService){
          return CategoryService.getCats();
        }],
        brandsData : ["BusinessService", function(BusinessService){
          return BusinessService.getBrands();
        }],
        mallsData : ["BusinessService", function(BusinessService){
          return BusinessService.getMalls();
        }],
        businessSelectedData : ["CategoryService", function(CategoryService){
          return CategoryService.getSelectedCat();
        }]
      }
    })*/

    .state('interests', {
        url: "/interests",
        templateUrl: "templates/interests.html",
        controller: "CategoryController",
        resolve: {
            catData: ["CategoryService", function(CategoryService) {
                return CategoryService.getCats();
            }]
        }
    })

    .state('userReg', {
        url: "/userRegistration",
        templateUrl: "templates/user-reg.html",
        controller: "UserRegLogController"
    })

    .state('categoriesIntro', {
        url: "/catIntro",
        templateUrl: "templates/categoriesIntro.html"
    })
	
	// Add a sStore.
	
	.state('createStore', {
        url: '/createStore',
        
                templateUrl: 'templates/createStore.html',
                controller: "createStoreController"
    })
	
	// EDIT  STORE.
	.state('editStore', {
        url: '/editStore',
        templateUrl: 'templates/editStore.html',
        controller: "createStoreController"     
    })
	
	
	//Add User Type.
	.state('addUser', {
        url: '/addUser',
        
                templateUrl: 'templates/addUser.html',
                controller: "addUserController"
    })
	
	//update User
	.state('editUser', {
        url: '/editUser',
        templateUrl: 'templates/editUser.html',
        controller: "addUserController"     
    })
	
	
	//Merchant Sign In.
	.state('merchantSignIn', {
        url: '/merchantSignIn',
        
                templateUrl: 'templates/merchantSignIn.html',
                controller: "merchantSignInController"
    })
	
	//admin View
	.state('adminView', {
        url: '/adminView',
        templateUrl: 'templates/adminView.html',
		controller: "addUserController"
              
    })
	
	//Edited User
	.state('editedUser', {
        url: '/editedUser',
        templateUrl: 'templates/editedUser.html',
        controller: "editUserController"     
    })
	
	
	//EDITED STORE.
	.state('editedStore', {
        url: '/editedStore',
        templateUrl: 'templates/editedStore.html',
        controller: "editStoreController"     
    })
	
	//Activity 
	.state('activity', {
        url: '/activity',
        templateUrl: 'templates/activity.html',
            
    })
	
	//newarrivals
	.state('newarrivals', {
        url: '/newarrivals',
        templateUrl: 'templates/newarrivals.html',
            
    })
	
	//popularitems
	.state('popularitems', {
        url: '/popularitems',
        templateUrl: 'templates/popularitems.html',
            
    })
	//youmightlike
	.state('youmightlike', {
        url: '/youmightlike',
        templateUrl: 'templates/youmightlike.html',
            
    })

       //greatbuys
	.state('greatbuys', {
        url: '/greatbuys',
        templateUrl: 'templates/greatbuys.html',
            
    })

       //newstores
	.state('newstores', {
        url: '/newstores',
        templateUrl: 'templates/newstores.html',
            
    })


//popularstores
	.state('popularstores', {
        url: '/popularstores',
        templateUrl: 'templates/popularstores.html',
            
    })


//nearyou
	.state('nearyou', {
        url: '/nearyou',
        templateUrl: 'templates/nearyou.html',
            
    })


     .state('deals.madzzhome', {
        url: "/madzzhome",
        views: {
            'your-deals': {
                templateUrl: 'templates/madzzHome.html'
            }
        }
    })

     .state('deals.stores', {
        url: "/stores",
        views: {
            'your-deals': {
                templateUrl: 'templates/stores.html'
            }
        }
    })


     .state('deals.offers', {
        url: "/offers",
        views: {
            'your-deals': {
                templateUrl: 'templates/offers.html'
            }
        }
    })


     .state('deals.malls', {
        url: "/malls",
        views: {
            'your-deals': {
                templateUrl: 'templates/malls.html'
            }
        }
    })


	

    .state('userProfile', {
        cache: false,
        url: "/profile",
        templateUrl: "templates/userProfile.html",
        controller: "UserProfileController",
        resolve: {
            userDemoData: ["UserProfileService", function(UserProfileService) {
                return UserProfileService.getUserDemoData();

            }],
            userAnalyticsData: ["UserProfileService", function(UserProfileService) {
                return UserProfileService.getUserAnalytics();
            }]
        }
    })

    .state('karmaPoints', {
        url: "/karmaPoints",
        templateUrl: "templates/karmaPoints.html",
        controller: "KarmaPointsController",
        resolve: {
            karmaPointsData: ["KarmaPointsService", function(KarmaPointsService) {
                return KarmaPointsService.getKarmaPoints();
            }]
        }
    })


    .state('leadershipBoard', {
        url: "/leadershipBoard",
        templateUrl: "templates/leadershipBoard.html",
        controller: "LeadershipBoardController",
        resolve: {
            LeadershipBoardData: ["LeadershipBoardService", function(LeadershipBoardService) {
                return LeadershipBoardService.getLeadershipBoard();
            }]
        }
    })

    .state('spotAdeal', {
        url: '/spotAdeal',
        templateUrl: 'templates/spotAdeal.html'
    })
	
	.state('versionIntro', {
        url: "/versionIntro",
        templateUrl: "templates/versionIntro.html"
    })

    .state('merchReg', {
        url: "/merchReg",
        templateUrl: "templates/merchReg.html",
        controller: "MerchRegController",
        resolve: {
            catData: ["CategoryService", function(CategoryService) {
                return CategoryService.getCats();
            }],
            brandsData: ["BusinessService", function(BusinessService) {
                return BusinessService.getBrands();
            }],
            mallsData: ["BusinessService", function(BusinessService) {
                return BusinessService.getMalls();
            }],
            businessSelectedData: ["CategoryService", function(CategoryService) {
                return CategoryService.getSelectedCat();
            }]
        }

    });




    /*if (window.localStorage.getItem('isMerch') === 'true') {

        $urlRouterProvider.otherwise("/merch/merchProfile");

    } else if (window.localStorage.getItem('isUser') === 'true') {

        if (window.localStorage.getItem('introStatus') == 'done') {
            $urlRouterProvider.otherwise("splashDeals");
            //$urlRouterProvider.otherwise("/deals/yourDeals");
        } else if (window.localStorage.getItem('introStatus') == null) {
            $urlRouterProvider.otherwise("/intro")
        }

    } else {
        $urlRouterProvider.otherwise("/intro");
    }*/

}]);

madzz.run(["$ionicPlatform", "$rootScope", "$ionicLoading", "$cordovaPush", "$window", "domainUrl",
    "ConnectionService", "SessionStorageService", "$state", "LocalStorageService", "$cordovaDevice",
    "$http", "$q", 'DealsService', '$stateParams', '$cordovaGeolocation', '$timeout', '$cordovaGoogleAnalytics', '$ionicPopup', 'ToastService', '$cordovaDevice',
    function($ionicPlatform, $rootScope, $ionicLoading, $cordovaPush,
        $window, domainUrl, ConnectionService, SessionStorageService, $state, LocalStorageService,
        $cordovaDevice, $http, $q, DealsService, $stateParams, $cordovaGeolocation, $timeout, $cordovaGoogleAnalytics, $ionicPopup, ToastService, $cordovaDevice) {

        ImgCache.options.debug = true;
        ImgCache.options.localCacheFolder = 'Madzz';

        function randomString(length) {
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        };

        $ionicPlatform.ready(function() {

            ImgCache.init(function() {
                console.log('ImgCache init: success!');
            }, function() {
                console.log('ImgCache init: error! Check the log for errors');
            });
            
            

	    $http.get('http://madzztest1-env.elasticbeanstalk.com/rest/users/n2CYaW6Y8hxmJSR7/userActivityFeed').then(function(data){

				
				//$scope.activity = data.data;
				LocalStorageService.setObject('activity', JSON.stringify(data.data));
				

				},function(err){
				console.log(err);
			})

            var options = {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true
            }

            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

                var lati = position.coords.latitude;
                var lngi = position.coords.longitude;
                $window.sessionStorage.setItem('lat', position.coords.latitude);
                $window.sessionStorage.setItem('lng', position.coords.longitude);
                LocalStorageService.set('dealLat', position.coords.latitude);
                LocalStorageService.set('dealLng', position.coords.longitude);


                //$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lati+','+lngi+'&sensor=false').then(function(city){
                // var cityName = city.data.results[2].address_components[1].long_name; 

                //},function(err){
                //console.log(err);
                //});


            }, function(err) {


            })

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if (ConnectionService.connectionStatus()) {

                window.sessionStorage.setItem('connected', true);
            } else {
                $window.sessionStorage.removeItem('connected');
            }

            /*
              // WARNING: dangerous to unregister (results in loss of tokenID)
              $cordovaPush.unregister(options).then(function(result) {
                // Success!
              }, function(err) {
                // Error
              });*/


            if (!($window.localStorage.deviceUUID)) {

                var uuid;
                if (ionic.Platform.isAndroid()) {
                    uuid = $cordovaDevice.getUUID();

                } else
                    uuid = randomString(16);

                LocalStorageService.set('deviceUUID', uuid);

            }

            var status = LocalStorageService.getObject('isLoggedInSocial');
            $rootScope.logInStatus = status.isLoggedIn;

            if (!($window.localStorage.isLoggedInSocial)) {
                var data = {
                    platform: null,
                    isLoggedIn: false
                }
                LocalStorageService.setObject('isLoggedInSocial', data);
            }

            $rootScope.$on('loading:show', function() {
                /* $ionicLoading.show({noBackdrop : false, 
                   template: '<i class="icon ion-loading-b"></i>' 
                 })*/
            });

            $rootScope.$on('loading:hide', function() {
                /*$ionicLoading.hide()*/
            });


            $rootScope.search = function(searchText) {
                LocalStorageService.set('searchText', searchText);
                if (searchText == "" || searchText == null) {

                } else {
                    var searchQuery = searchText;
                    DealsService.getSearchResult(searchQuery, 0, 10).then(function(data) {
                        data = JSON.stringify(data);
                        $state.go("searchResult", {
                            'key': data
                        }, {
                            inherit: false
                        });

                    })
                    this.searchText = "";

                }

            }


            if (LocalStorageService.get('PNR') == 1) {

            } else {

                $cordovaPush.unregister().then(function(result) {

                    var androidConfig = {
                        "senderID": "237243867601"
                    };
                    $cordovaPush.register(androidConfig).then(function(result) {

                    }, function(err) {

                    });

                }, function(err) {

                });
            }


            // routing changed from urlProvider to state.go
            
            var device = $cordovaDevice.getDevice();

            var version = $cordovaDevice.getVersion();

            
            var checkVersion = version.substring(0,3);
            
            
            if(checkVersion < 4.4) {
                $state.go('versionIntro');
            } else if (window.localStorage.getItem('isMerch') === 'true') {

                //$urlRouterProvider.otherwise("/merch/merchProfile");
                //$state.go('merch.merchProfile');
                $state.go('splashDeals');

            } else if (window.localStorage.getItem('isUser') === 'true') {

                if (window.localStorage.getItem('introStatus') == 'done') {
                    //$urlRouterProvider.otherwise("splashDeals");
                    $state.go('splashDeals');

                    // sending notification
                    $rootScope.$on('pushNotificationReceived', function(event, notification) {
                        console.log('message = ' + notification.message + notification.payload.title + notification.payload.action);
                        switch (notification.event) {

                            case 'registered':
                                if (notification.regid.length > 0) {
                                    var id = LocalStorageService.get('deviceUUID');
                                    $http.post(domainUrl + 'gcm/' + id, notification.regid).success(function() {});
                                }
                                LocalStorageService.set('PNR', 1);
                                break;

                            case 'message':
                                // this is the actual push notification. its format depends on the data model from the push server
                                //alert('message = ' + notification.message  + notification.payload.title + notification.payload.action);
                                // onclick of notification, changing the route
                                var act = notification.payload.action;
                                console.log(act);
                                /*var temp = act.split('/');
                                var mallId = */
                                if (act.indexOf(',') != -1) {
                                    var temp = act.split(',');
                                    $state.go(temp[0], {
                                        'id': temp[1]
                                    });

                                    var id = LocalStorageService.get('deviceUUID');
                                    $http.post(domainUrl + 'pushNotification/' + id + '/viewed', act).success(function() {
                                        console.log('success');
                                    }).error(function() {
                                        console.log('err');
                                    });
                                    /*var alertPopup = $ionicPopup.alert({
             title: 'Dont eat that!',
             template: 'It might taste good'
           });
           alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });*/

                                } else {
                                    $state.go(act);

                                }
                                ToastService.showConnMessage(notification.payload.message);
                                act = '';
                                break;

                            case 'error':
                                /*alert('GCM error = ' + notification.msg);*/
                                break;

                            default:
                                break;
                        }
                    });
                } else if (window.localStorage.getItem('introStatus') == null) {
                    //$urlRouterProvider.otherwise("/intro")
                    var uuid = LocalStorageService.get('deviceUUID');
                    console.log(uuid);

                    $http.post(domainUrl + 'users/' + uuid).success(function(){
                        console.log('success');
                    }).error(function (err) {
                        console.log('err');
                        console.log(err);
                    });
                    $state.go('intro');
                }

            } else {
                //$urlRouterProvider.otherwise("/intro");
                    var uuid = LocalStorageService.get('deviceUUID');
                    console.log(uuid);

                    $http.post(domainUrl + 'users/' + uuid).success(function(){
                        console.log('success');
                    }).error(function (err) {
                        console.log('err');
                        console.log(err);
                    });
                    $state.go('intro');
            }

            $cordovaGoogleAnalytics.debugMode();

            // start tracker
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/

            $cordovaGoogleAnalytics.startTrackerWithId('UA-61767144-1');

            // set user id
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id

            $cordovaGoogleAnalytics.setUserId(LocalStorageService.get('deviceUUID'));

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                //Track State
                $cordovaGoogleAnalytics.trackView(fromState.name);

                //Events
            })




            /*$rootScope.setIntroDone = function(){
              $state.go('interests');
            }*/
        });
    }
])

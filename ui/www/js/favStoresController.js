
var FavBrandsController = angular.module('FavBrandsController', []);

/*FavStoresController.controller("FavStoresController", ['$scope', 'LocalStorageService', 'favStoresData', 'businessData', '$ionicModal',
    'catBrandsMallsService', 'FavStoresService', '$state', '$stateParams', '$http', '$window', 'domainUrl', '$state', '$window',
    function($scope, LocalStorageService, favStoresData, businessData, $ionicModal, catBrandsMallsService, FavStoresService,
        $state, $stateParams, $http, $window, domainUrl, $state, $window) {

        $scope.hasFavStores = false;
        $scope.stores = {};
        $scope.favStores = favStoresData;
        $scope.$on('$ionicView.enter', function(){
            $scope.favStores = {};
            $scope.favStores = favStoresData;
        });

        $scope.showFavStores = false;

        $scope.stores = businessData;
        //var selectedStores = null;
        $ionicModal.fromTemplateUrl('templates/storesModal.html', function(modal) {
            $scope.storesModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        });


        if (favStoresData.length == 0) {
            $scope.hasFavStores = true;
            $scope.showFavStores = false;
        } else {
            $scope.hasFavStores = false;
            $scope.showFavStores = true;

        }

        if (favStoresData.length > 0) {
            $scope.showFavStores = true;
            $scope.hasFavStores = false;
        }


        $scope.stores1 = new Array();

        if ($scope.favStores.length > 0) {
            var tmpMap = new Array();
            
            for (var j = 0; j < $scope.favStores.length; j++) {
                if (!tmpMap[$scope.favStores[j].mid]) {
                    tmpMap[$scope.favStores[j].mid] = $scope.favStores[j].mid;
                    

                }
            }
            $scope.favStoresTmp = tmpMap;
            
            for (var j = 0; j < $scope.stores.length; j++) {
                

                if (tmpMap[$scope.stores[j].mid]) {
                    $scope.stores[j].checked = true;
                    //tmpMap[$scope.stores[j].mid] = 1;
                    
                    $scope.stores1.push($scope.stores[j]);
                    

                }

            }

        } else {
            console.log('Nothing here....');
        }


        $scope.doneStores = function() {

            $scope.storesModal.hide();

            var selectedStores = catBrandsMallsService.checkStores($scope.stores);
            
            var selectedStoresArray = selectedStores.selectedStoreId;
            
            if (selectedStoresArray.length > 0) {
                //FavStoresService.postFavStores1(selectedStoresArray1);
                FavStoresService.postFavStores(selectedStoresArray);
               
            } else {
                console.log("No Stores Selected");
            }
        }

          
        $scope.deselect = function(index, checked) {
            var mid = this.store.mid;
		
            var id = window.localStorage.getItem('deviceUUID');
            if(checked == true) {
                var selectedStoresArray = mid;
            $http.post(domainUrl + 'users/' + id + '/favBusiness/' + mid).success(function() {
                console.log('posted');
               
            }).error(function(err) {
                console.log('not posted');
            })    
            } else {
            $http.delete(domainUrl + 'users/' + id + '/favBusiness/' + mid).success(function() {
                console.log('deleted');
                $state.reload();
                
            }).error(function(err) {
                console.log('not deleted');
            })
            }
        }


        

    }
]);
*/

FavBrandsController.controller("FavBrandsController", ["$scope", function($scope){
   
}])
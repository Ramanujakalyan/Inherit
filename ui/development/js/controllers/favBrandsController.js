
var FavBrandsController = angular.module('FavBrandsController', []);

FavBrandsController.controller("FavBrandsController", function($scope, RemoteDataService, $ionicLoading, $window, FavBrandsService, ConnectionService, ToastService){

    $scope.favBrands = {};
    //$ionicLoading.show();
    $scope.brandFav = true;


$scope.$on('$ionicView.afterEnter', function(){
      if(ConnectionService.connectionStatus() == true) {
        
      } else {
        ToastService.showConnMessage('Please Check Your Internet Connection');
      }

     
    });


    $scope.change = function(favStatus, bid){
        if(favStatus == false){
            FavBrandsService.delBrands(bid).then(function(success){
                ;
            }, function(err){
                ;
            });
        }
        else if(favStatus == true){
            FavBrandsService.favBrand(bid).then(function(success){
                ;
            }, function(err){
                ;
            });
        }
    }
    
    $scope.$on('$ionicView.enter', function(){
        var id = $window.localStorage.deviceUUID;
        var url = 'users/'+id+'/favBrand';
        RemoteDataService.fetchData(url, false).then(function(data){
             $scope.currentFavArray = [];
             $scope.favBrands = data;
			 
			 $scope.hasFavBrands = false; // Binds the saved deals
			$scope.favBrandsList = false;

			if($scope.favBrands.length == 0){
				$scope.hasFavBrands = true;
				$scope.favBrandsList = false;
			}
			else{
				$scope.hasFavBrands = false;
				$scope.favBrandsList = true;
			}
        }, function(err){
            ;
        });
    });
	
})

FavBrandsController.controller("SelectBrandsController", function($scope, brandsData, catBrandsMallsService,
 FavBrandsService, ToastService, $state){
    $scope.brandsList = brandsData;
    $scope.moreDataCanBeLoaded = true;
    
    var startInitial = 0, startEnd = 12;
    var infStart = startEnd;
    var infEnd = infStart + startEnd;


    /*for(brand in selBrandArray){
        for(var i = 0; i < $scope.brandsList.length; i++){
            if(selBrandArray[brand] == $scope.brandsList[i].bid){
                $scope.brandsList[i].checked = true;
                break;
            }
        }
    }*/


    $scope.loadMore = function() {

      FavBrandsService.getAllBrands(true, infStart, startEnd).then(function(data){
        if(data.length == 0){
          $scope.moreDataCanBeLoaded = false;
          return;
        }
        data.forEach(function(ele, index, array){
          $scope.brandsList.push(ele);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      infStart = infEnd;
      infEnd = infStart + startEnd;
      });

    };

    $scope.postFavData = function() {

        var selectedBrands = catBrandsMallsService.checkBrands($scope.brandsList);    
        var selectedBrandsArray = selectedBrands.selectedBrandId;            
        if (selectedBrandsArray.length > 0) {
            console.log(selectedBrandsArray)
            FavBrandsService.postFavBrands(selectedBrandsArray).then(function(success){
                $state.go('deals.favBrands');
                ToastService.showMessage("Your favourites has been updated");
            }, function(fail){
                ToastService.showMessage("Unable to update! Try Again");
            })
        } else {
            $state.go('deals.favBrands');
        }
    }
})

FavBrandsController.controller("BrandLocController", function($scope, brandDetailsData, brandLocData){
    
    $scope.brand = {};
    $scope.brand = brandDetailsData;
    $scope.favBrands = brandLocData;
})

FavBrandsController.controller("BrandDealsController", function($scope, brandDetailsData, brandDealsData, FavBrandsService){
    
    $scope.brand = {};
    $scope.favBrands = {};
    $scope.moreDataCanBeLoaded = true;
    $scope.brand = brandDetailsData;
    $scope.favBrands = brandDealsData;
    var bid = brandDetailsData.bid;
    var startInitial = 0, startEnd = 10;
    var infStart = startEnd;
    var infEnd = infStart + startEnd;

    $scope.loadMore = function() {

      FavBrandsService.getBrandDeals(bid, true, infStart, infEnd).then(function(data){
        if(data.length == 0){
          $scope.moreDataCanBeLoaded = false;
          return;
        }
        data.forEach(function(ele, index, array){
          $scope.favBrands.push(ele);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      infStart = infEnd;
      infEnd = infStart + startEnd;
      });

    };
    $scope.noDeals = false;
	$scope.hasDeal = false;
	if(brandDealsData.length == 0){
	$scope.noDeals = true;
	$scope.hasDeal = false;
	}
    else{
	$scope.noDeals = false;
	$scope.hasDeal = true;
    }
})

var FavBrandsService = angular.module('FavBrandsService', []);

FavBrandsService.service("FavBrandsService", [ 'RemoteDataService', '$window', 'domainUrl',
 						'$http','$window','$state', 'ToastService', 'ConnectionService', '$q', '$ionicLoading', 'LocalStorageService',
    				  	function(RemoteDataService, $window, domainUrl, $http, $window, 
    				  	$state, ToastService, ConnectionService, $q, $ionicLoading, LocalStorageService){
	
	return {
		getUserFavBrands : function(){
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/favBrand';

                return RemoteDataService.fetchData(url, false)
		},

		getAllBrands : function(hasPagination, start, end){
				var id = $window.localStorage.deviceUUID;
				var lat = LocalStorageService.get('dealLat');
                    		var lng = LocalStorageService.get('dealLng');
                    
				var url = 'users/'+id+'/brands?' + 'lat=' + lat + '&lng=' + lng + '&start='+start+'&end='+end;
                return RemoteDataService.fetchData(url, false, hasPagination);
            
		},

		getBrandDetails: function(bid){
			 var id = $window.localStorage.deviceUUID;
			 var url = 'users/'+id+'/favBrand/'+bid;
			 return RemoteDataService.fetchData(url, true);
		},


		/*postFavStores : function(selectedStoresArray){
			if(window.sessionStorage.getItem('connected')){
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/favBusiness';
            
		$http.post(domainUrl+url, selectedStoresArray).success(function(){
					
					$state.reload();
				    //$window.location.reload(true);
            	}).error(function (data, status, headers, config) {
                	console.log("Error In Posting")
            	});
			}
			else{
				alert("no connection")
			}
		}*/

		postFavBrands: function(selectedBrandsArray){
			var q = $q.defer();
			if(ConnectionService.connectionStatus()){
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/favBrand';
				$http.post(domainUrl+url, selectedBrandsArray).then(function(suc){
					q.resolve(suc);
				}, function(fail){
					$ionicLoading.hide();
					q.reject(fail);
				})
			}
			else{
				q.reject()
				ToastService.showMessage("Network Connection Error");
			}
			return q.promise;
		},

		getBrandDeals: function(id, toPaginate, start, end){
			var lat = LocalStorageService.get('dealLat'); 
			var lng = LocalStorageService.get('dealLng');
			var deviceid = $window.localStorage.deviceUUID;
			var url = 'users/'+deviceid+'/favBrand/'+id+'/deals?lat='+lat+'&lng='+lng + '&start=' + start + '&end=' + end;
			console.log(url);
                	return RemoteDataService.fetchData(url, true, toPaginate);
                
		},

		getBrandLoc: function(id){
			var lat = $window.sessionStorage.getItem('lat');
			var lng = $window.sessionStorage.getItem('lng');
			var deviceid = $window.localStorage.deviceUUID;
			if(lat == null || lat == 'null'){
				lat = '';
				lng = '';
			}
			var url = 'users/'+deviceid+'/favBrand/'+id+'/locations?lat='+lat+'&lng='+lng;
			return RemoteDataService.fetchData(url, true);
		},

		delBrands: function(bid){
			if(ConnectionService.connectionStatus()){
				var q = $q.defer();
				var deviceid = $window.localStorage.deviceUUID;
				$http.delete(domainUrl + 'users/' + deviceid + '/favBrand/' + bid).then(function(success){
					q.resolve(success);
				}, function(failure){
					q.reject(failure);
				});
				return q.promise;
			}
			else{
				ToastService.showMessage("Please try again later");
				return;
			}
		},

		favBrand: function(bid){
			if(ConnectionService.connectionStatus()){
				var q = $q.defer();
				var deviceid = $window.localStorage.deviceUUID;
				$http.post(domainUrl + 'users/' + deviceid + '/favBrand/' + bid).then(function(success){
					q.resolve(success);
				}, function(failure){
					q.reject(failure);
				});
				return q.promise;
			}
			else{
				ToastService.showMessage("Please try again later");
				return;
			}
		}
	}
}]);

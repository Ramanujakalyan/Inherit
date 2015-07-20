var StoreViewUserService = angular.module('StoreViewUserService', []);

StoreViewUserService.service("StoreViewUserService", ['RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	return {
		getStore : function(storeId){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/favBusiness/'+storeId;
                return RemoteDataService.fetchData(url, true)
            } else {
                //alert("no connection")
            }
		},

		getDeals : function(storeId){
			if(window.sessionStorage.getItem('connected')){
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/favBusiness/'+storeId+'/deals';
				return RemoteDataService.fetchData(url, true);
			}else{
				//alert("no connection");
			}
		}
	}
}]);

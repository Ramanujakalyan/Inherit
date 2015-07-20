var StoreViewMerchService = angular.module('StoreViewMerchService', []);

StoreViewMerchService.service("StoreViewMerchService", ['RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return {
		getStore : function(){
			//if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'business/'+id;
                return RemoteDataService.fetchData(url, true)
        //      } else {
                
        //    }
		},

		getDeals : function(){
			//if(window.sessionStorage.getItem('connected')){
				var id = $window.localStorage.deviceUUID;
				var url = 'business/'+id+'/deals';
				return RemoteDataService.fetchData(url, true);
			//} else{
				
			//}
		},

		getBusinessAnalytics : function(){
			//if(window.sessionStorage.getItem('connected')){
				var id = $window.localStorage.deviceUUID;
				var url = 'business/'+id+'/businessAnalytics';
				return RemoteDataService.fetchData(url, true);
			//} else{
				
			//}
		}
	}

}]);

var ManageDealsService = angular.module('ManageDealsService', []);

ManageDealsService.service("ManageDealsService", [ 'RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return {
		getDeals : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				
				var url = 'business/'+id+'/deals';
                return RemoteDataService.fetchData(url, true)
            } else {
                alert("no connection")
            }
		}
	}
}]);

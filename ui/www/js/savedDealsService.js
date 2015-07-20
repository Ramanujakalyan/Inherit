var SavedDealsService = angular.module('SavedDealsService', []);

SavedDealsService.service("SavedDealsService", [ 'RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return {
		getSavedDeals : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/savedDeals';
                return RemoteDataService.fetchData(url, false)
            } else {
                //alert("no connection")
            }
		}
	}
}]);

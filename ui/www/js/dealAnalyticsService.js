var DealAnalyticsService = angular.module('DealAnalyticsService', []);

DealAnalyticsService.service("DealAnalyticsService", [ 'RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return{
		getDealAnalytics : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
                return RemoteDataService.fetchData('business/'+id+'/businessDealAnalytics', true)
            } else {
                alert("no connection")
            }
		}
	}
}]);

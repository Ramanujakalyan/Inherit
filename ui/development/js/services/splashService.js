var SplashService = angular.module('SplashService', []);

SplashService.service("SplashService", [ 'RemoteDataService',
    				  function(RemoteDataService){
	
	return {
		getStats : function(){
            return RemoteDataService.fetchData('dealStats', true)
		}
	}
}]);

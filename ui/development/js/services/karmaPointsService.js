var KarmaPointsService = angular.module('KarmaPointsService', []);

KarmaPointsService.service("KarmaPointsService", [ 'RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return {
		getKarmaPoints : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
                return RemoteDataService.fetchData('users/'+id+'/karmaPoints', true)
            } else {
                alert("no connection")
            }
		}
	}
}]);

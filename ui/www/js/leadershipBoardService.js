var LeadershipBoardService = angular.module('LeadershipBoardService', []);

LeadershipBoardService.service("LeadershipBoardService", [ 'RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return {
		getLeadershipBoard : function(){
			if (window.sessionStorage.getItem('connected')) {
                return RemoteDataService.fetchData('users/leaderDashBoard', true)
            } else {
                alert("no connection")
            }
		}
	}
}]);

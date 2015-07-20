var UserProfileService = angular.module('UserProfileService', []);

UserProfileService.service("UserProfileService", [ 'RemoteDataService', '$window',
    				  function(RemoteDataService, $window){
	
	return {
		
		getUserDemoData : function(){
			//if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/userDemoProfile';
                return RemoteDataService.fetchData(url, false)
           // } else {
             //   alert("no connection")
          //  }
		},

		getUserAnalytics : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/userAnalytics';
				
                return RemoteDataService.fetchData(url, false)
            } else {
                alert("no connection")
            }
		}

	}
}]);

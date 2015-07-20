var FavStoresService = angular.module('FavStoresService', []);

FavStoresService.service("FavStoresService", [ 'RemoteDataService', '$window', 'domainUrl', '$http','$window','$state',
    				  function(RemoteDataService, $window, domainUrl, $http, $window, $state){
	
	return {
		getUserFavStores : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/favBusiness';
                return RemoteDataService.fetchData(url, false)
            } else {
                alert("no connection")
            }
		},

		getAllBusiness : function(){
			if (window.sessionStorage.getItem('connected')) {
				var id = $window.localStorage.deviceUUID;
				var url = 'users/'+id+'/business';
                return RemoteDataService.fetchData(url, false);
            } else {
                alert("no connection")
            }
		},


		postFavStores : function(selectedStoresArray){
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
		}
	}
}]);

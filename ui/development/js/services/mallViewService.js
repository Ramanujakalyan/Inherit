var MallViewService = angular.module('MallViewService', []);

MallViewService.service("MallViewService", ['RemoteDataService', '$window', 'domainUrl','$http','$q',
    				  function(RemoteDataService, $window, domainUrl, $http, $q){

function dealsInMalls(getMall, start, end) {
	var deferred = $q.defer();
	var url = domainUrl + 'malls/' + getMall + '/deals/' + '?start='+start+'&end='+end;
	
	$http.get(url).then(function(resp) {
		
		deferred.resolve();
	}, function(err) {
		
		deferred.reject();
	}
	)
	return deferred.promise;
}

function dealsInMallsPagination(getMall, start, end) {
	var deferred = $q.defer();
	var url = domainUrl + 'malls/' + getMall + '/deals/' + '?start='+start+'&end='+end;
	$http.get(url).then(function(resp) {
		
		deferred.resolve();
	}, function(err) {
		
		deferred.reject();
	}
	)
	return deferred.promise;
}

	return {
		getMall : function(getMall){
			if (window.sessionStorage.getItem('connected')) {
				//var id = $window.localStorage.deviceUUID;
				var url = 'malls/'+getMall+'';
                return RemoteDataService.fetchData(url, true)
            } else {
                
            }
		},

		getDeals : function(getMall){
			if(window.sessionStorage.getItem('connected')){
				//var id = $window.localStorage.deviceUUID;
				var url = 'malls/'+getMall+'/deals/';
				return RemoteDataService.fetchData(url, true);
			}else{
				
			}
		},

		getDealsInMall : function(getMall, hasPagination, start, end){
        	if(hasPagination) {
                /*return dealsInMalls(getMall, start, end);*/
                
				var url = 'malls/' + getMall + '/deals/' + '?start='+start+'&end='+end;
				return RemoteDataService.fetchData(url, true);
            	
            }
            else {
               var url = 'malls/' + getMall + '/deals/' + '?start='+start+'&end='+end;
				return RemoteDataService.fetchData(url, true);
            
            }

			           
        }
	}

}]);

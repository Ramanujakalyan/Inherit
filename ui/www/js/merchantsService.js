var MerchantsService = angular.module('MerchantsService', []);

MerchantsService.service("MerchantsService", ['$http', '$scope', '$q', 'RemoteDataService', function($http, $scope, $q, RemoteDataService){
	
	return {

		getBrands : function(){

			if (window.sessionStorage.getItem('connected')) {
                return RemoteDataService.fetchData('categories', true)
            } else {
                    
            }
		}
	}
}]);

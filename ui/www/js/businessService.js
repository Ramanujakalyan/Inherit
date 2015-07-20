var BusinessService = angular.module('BusinessService', []);

BusinessService.service("BusinessService", [ 'RemoteDataService', '$window',
                      function(RemoteDataService, $window){
    
    return {
        getBrands : function(){
            if ($window.sessionStorage.getItem('connected')) {
                return RemoteDataService.fetchData('brands', true)
            } else {
                alert("no connection")
            }
        },

        getMalls : function(){
            if ($window.sessionStorage.getItem('connected')) {
                return RemoteDataService.fetchData('malls', true)
            } else {
                alert("no connection")
            }
        }
    }
}]);

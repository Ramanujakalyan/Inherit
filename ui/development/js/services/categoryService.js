var CategoryService = angular.module('CategoryService', []);

CategoryService.service("CategoryService", [ 'RemoteDataService', '$http', '$state', 'domainUrl', '$window','LocalStorageService',
                      function(RemoteDataService, $http, $state, domainUrl, $window, LocalStorageService){
    
    return {
        getCats : function(){
            if ($window.sessionStorage.getItem('connected')) {
//alert($window.sessionStorage.getItem('connected'));
                return RemoteDataService.fetchData('categories', true)

            } else {
//alert($window.sessionStorage.getItem('connected'));
                
            }
        },
        saveCategories : function(userSelectedCat){
            var deviceId = userSelectedCat.deviceUUID;
            $http.post(domainUrl+'users/'+deviceId+'/userCategories', userSelectedCat).success(function(){
               $state.go('userReg');
            }).error(function (data, status, headers, config) {
                
            });

        },
        
        settingSaveCategories : function(userSelectedCat){
            var deviceId = userSelectedCat.deviceUUID;
            $http.post(domainUrl+'users/'+deviceId+'/userCategories', userSelectedCat).success(function(){
               
               
               
            }).error(function (data, status, headers, config) {
               
            });

        },


	getUserSelectedCategories : function(){
            if ($window.sessionStorage.getItem('connected')) {
		var id = $window.localStorage.deviceUUID;
                var url = 'users/'+id+'/userCategories';
                return RemoteDataService.fetchData(url, true);

            } else {
		                
            }
        },



        getSelectedCat : function(){
            if($window.sessionStorage.getItem('connected')) {
                var id = $window.localStorage.deviceUUID;
                var url = 'business/'+id+'/categories';
                return RemoteDataService.fetchData(url, false);

            } else {
                

            }
            
       }

        

    }
}]);




        



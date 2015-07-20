var TokenService = angular.module('TokenService', []);

TokenService.service("TokenService", ['$http', 'domainUrl', '$window', '$q', 'LocalStorageService', function($http, domainUrl, $window, $q,
    LocalStorageService) {
    return {
        getTokens: function() {
            var deferred = $q.defer();
            var id = $window.localStorage.deviceUUID;
            $http.get(domainUrl + 'authToken/' + id).success(function(resp) {
                LocalStorageService.set('token', resp.token);
                deferred.resolve(resp.data);
            }).error(function(err) {
                deferred.reject(err);
                

            });
            return deferred.promise;
        }
    }
}]);
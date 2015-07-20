var DealDetailService = angular.module('DealDetailService', []);

DealDetailService.service("DealDetailService", [ 'RemoteDataService', '$window', '$http', 'domainUrl', '$timeout', '$q','LocalStorageService', 'ToastService',
    				  function(RemoteDataService, $window, $http, domainUrl, $timeout, $q, LocalStorageService, ToastService){


    	    		var lat = LocalStorageService.get('dealLat'); 
			var lng = LocalStorageService.get('dealLng'); 
			
	
	return {
		saveADeal : function(userId, dealId){
			var deferred = $q.defer();
			$timeout(function(){

				if (window.sessionStorage.getItem('connected')) {

                	$http.post(domainUrl+'users/'+userId+'/saveDeal/'+dealId, {}).success(function(){
                		
               			deferred.resolve();
                	}).error(function (data, status, headers, config) {
                		deferred.reject();
               		});
	            } else {
	                alert("no connection")
	            }

			},1000);

			return deferred.promise;
		},

		checkin : function(userId, dealId, lat, lng){
			var deferred = $q.defer();
			var url = domainUrl+'users/'+userId+'/checkinDeal/'+dealId+'?lat='+lat+'&lng='+lng;
			
			$http({
				url: url,
				method: 'POST',
				transformResponse: function (data, headers) {
                    deferred.resolve(data);
                }
              });
			return deferred.promise;
		},

		purchase : function(userId, dealId){
			var deferred = $q.defer();
			$timeout(function(){
			
			if(window.sessionStorage.getItem('connected')) {
				$http.post(domainUrl+'users/'+userId+'/purchaseDeal/'+dealId, {}).success(function(){
               	
               	deferred.resolve();
               	return true;
               }).error(function (data, status, headers, config) {
                	deferred.reject();
               });
			} else{
				alert("no connection")
			}
		},1000);
			return deferred.promise;
		},

		getDealDesc : function(dealId){
			if(window.sessionStorage.getItem('connected')){
				var id = LocalStorageService.get('deviceUUID');
				return RemoteDataService.fetchData('deals/'+id+'/'+dealId, true)
			}
			else{
				//alert("I Am not connected")
			}
		},

		getDealFilter : function(cid, hasPagination, start, end){
			if(lat == '' || lat == null || lng == '' || lng == null) {
				ToastService.showConnMessage('Turn on Location Services');
				var lati = LocalStorageService.get('yourLat');
				var lngi = LocalStorageService.get('yourLng');
			} else {
				var lati = lat;
				var lngi = lng;
			}

			if(hasPagination){
				return RemoteDataService.fetchData('deals/categories/'+cid + '?lat='+lati+'&lng='+lngi+'&start='+start+'&end='+end, true);
			}
			else{
				return RemoteDataService.fetchData('deals/categories/'+cid + '?lat='+lati+'&lng='+lngi, true);
				//alert("I Am not connected")
			}
		},


		getCarouselFilter : function(cid){
			        var id = LocalStorageService.get('deviceUUID');
				return RemoteDataService.fetchData('deals/categories/'+cid+'/carousel' + '?deviceUUID=' + id + '&lat=' + lat + '&lng=' + lng, true);
			
		},

                getLocation : function(){
			if(window.sessionStorage.getItem('connected')){
				
				return RemoteDataService.fetchData('madzz/locations/', true)
			}
			else{
				//alert("I Am not connected")
			}
		},

		getLocality : function(lid){
			if(window.sessionStorage.getItem('connected')){
				
				return RemoteDataService.fetchData('madzz/locations/' + lid + '/localities', true)
			}
			else{
				//alert("I Am not connected")
			}
		},

		getDealLocality : function(lid, locId, hasPagination, start, end){
			var id = LocalStorageService.get('deviceUUID');
			if(hasPagination){
				
				return RemoteDataService.fetchData('deals/locations/' + lid+ '/localities/' + locId + '?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end, true)
			}
			else{
				return RemoteDataService.fetchData('deals/locations/' + lid+ '/localities/' + locId + '?lat=' + lat + '&lng=' + lng + '&deviceUUID=' + id + '&start=' + start + '&end=' + end, true)

				//alert("I Am not connected")
			}
		}
	}
}]);

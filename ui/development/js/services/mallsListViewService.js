var MallsListViewService = angular.module('MallsListViewService', []);

MallsListViewService.service('MallsListViewService', ['RemoteDataService', '$window', 'LocalStorageService',
    				  function(RemoteDataService, $window, LocalStorageService){

	return {
		getMalls : function(getMall){
			if (window.sessionStorage.getItem('connected')) {
				//var id = $window.localStorage.deviceUUID;
			var lat = LocalStorageService.get('dealLat');
			var lng = LocalStorageService.get('dealLng');

			if(lat == '' || lng == '') {
				var url = 'malls';
				} else {
				var url = 'malls?lat='+lat+'&lng='+lng;
				}

				
                return RemoteDataService.fetchData(url, true)
            } else {
                alert("no connection")
            }
		}
	}
}])

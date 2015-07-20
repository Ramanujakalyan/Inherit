var LeadershipBoardController = angular.module('LeadershipBoardController', []);

LeadershipBoardController.controller("LeadershipBoardController", ['$scope', 'LeadershipBoardData',
						 function($scope, LeadershipBoardData){
			
	$scope.leadershipBoardList = LeadershipBoardData;
	console.log($scope.leadershipBoardList);
	for(var i=0; i<$scope.leadershipBoardList.length; i++) {
		console.log($scope.leadershipBoardList[i].profileImageUrl);
		if($scope.leadershipBoardList[i].profileImageUrl == null) {
			$scope.leadershipBoardList[i].profileImageUrl = 'https://s3-us-west-2.amazonaws.com/madzz-dev-bucket/defaultPic.jpg';
		
		} 
	}

}]);
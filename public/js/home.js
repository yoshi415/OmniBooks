angular.module('omnibooks.home', [])
.controller('homeController', ['$scope', '$stateParams', 'fireBase', 
	function ($scope, $stateParams, fireBase) {

    $scope.profile = fireBase.setUserInfo($scope.userId);
	$scope.findUserDetail = function(user) {
		$stateParams.userId = user.$id;
		$state.go('user', {userId:user.$id, user:JSON.stringify(str)})
	}
}]);
angular.module('app').controller('signaturesCtrl', function ($scope, $http) {
	$scope.signatures = [];

	$scope.refreshSignatures = function () {
		$http.get('/api/signatures').success(function (signatures) {
			$scope.signatures = signatures;
		});
	};
	
	$scope.hasSignatures = function () {
		return $scope.signatures.length > 0;
	};

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
	
	$scope.refreshSignatures();
});
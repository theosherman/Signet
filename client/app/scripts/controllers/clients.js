angular.module('app').controller('ClientsCtrl', function ($scope, $http) {
	$scope.clients = [];

	$scope.refreshClients = function () {
		$http.get('/api/clients').success(function (clients) {
			$scope.clients = clients;
		});
	};
	
	$scope.hasClients = function () {
		return $scope.clients.length > 0;
	};

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
	
	$scope.refreshClients();
});
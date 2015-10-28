'use strict';

angular.module('app').controller('ClientDetailCtrl', function ($scope, $state, $stateParams, $http, ngToast) {

	$scope.client = {};

	if ($stateParams.id === 'new') {
		$scope.isEditMode = true;
	} else {
		$scope.isEditMode = false;
		$http.get('/api/clients/' + $stateParams.id).success(function (client) {
				$scope.client = client;
			}).error(function (err) {
				ngToast.danger('Unable to load client...<br/>' + err.message);
			})
	}

	$scope.edit = function () {
		$scope.name = $scope.client.name;
		$scope.email = $scope.client.email;
		$scope.isEditMode = true;
	};

	$scope.cancel = function () {
		$scope.isEditMode = false;
		$scope.name = '';
		$scope.email = '';
	};

	$scope.delete = function () {
		$http.delete('/api/clients/' + $stateParams.id).success(function() {
			$state.go('clients');
			$scope.refreshClients();
			ngToast.success('Deleted!');
		}).error(function(err) {
			ngToast.danger('Unable to delete client...<br/>' + err.message);
		})
		
	}

	$scope.save = function () {
		$scope.client.name = $scope.name;
		$scope.client.email = $scope.email;

		if ($scope.client.id) {
			$http.put('/api/clients', $scope.client)
				.success(saveSuccess)
				.error(saveError);
		} else {
			$http.post('/api/clients', $scope.client)
				.success(saveSuccess)
				.error(saveError);
		}
	};

	function saveSuccess(client) {
		$scope.client = client;
		$scope.isEditMode = false;
		$scope.name = '';
		$scope.email = '';
		$scope.refreshClients();
		ngToast.success('Client saved!');
	}

	function saveError(err) {
		ngToast.danger('Error saving client...<br/>' + err.message);
	}

});
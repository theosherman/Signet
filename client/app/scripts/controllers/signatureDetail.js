'use strict';

angular.module('app').controller('signatureDetailCtrl', function ($scope, $state, $stateParams, $http, ngToast) {

	$scope.signature = {};

	if ($stateParams.id === 'new') {
		$scope.isEditMode = true;
	} else {
		$scope.isEditMode = false;
		$http.get('/api/signatures/' + $stateParams.id).success(function (signature) {
				$scope.signature = signature;
			}).error(function (err) {
				ngToast.danger('Unable to load signature...<br/>' + err.message);
			})
	}

	$scope.edit = function () {
		$scope.name = $scope.signature.name;
		$scope.email = $scope.signature.email;
		$scope.isEditMode = true;
	};

	$scope.cancel = function () {
		$scope.isEditMode = false;
		$scope.name = '';
		$scope.email = '';
	};

	$scope.delete = function () {
		$http.delete('/api/signatures/' + $stateParams.id).success(function() {
			$state.go('signatures');
			$scope.refreshSignatures();
			ngToast.success('Deleted!');
		}).error(function(err) {
			ngToast.danger('Unable to delete signature...<br/>' + err.message);
		})
		
	}

	$scope.save = function () {
		$scope.signature.name = $scope.name;
		$scope.signature.email = $scope.email;

		if ($scope.signature.id) {
			$http.put('/api/signatures', $scope.signature)
				.success(saveSuccess)
				.error(saveError);
		} else {
			$http.post('/api/signatures', $scope.signature)
				.success(saveSuccess)
				.error(saveError);
		}
	};

	function saveSuccess(signature) {
		$scope.signature = signature;
		$scope.isEditMode = false;
		$scope.name = '';
		$scope.email = '';
		$scope.refreshSignatures();
		ngToast.success('Signature saved!');
	}

	function saveError(err) {
		ngToast.danger('Error saving signature...<br/>' + err.message);
	}

});
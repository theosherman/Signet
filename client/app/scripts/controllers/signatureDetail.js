'use strict';

angular.module('app').controller('signatureDetailCtrl', function ($scope, $state, $stateParams, $http, ngToast) {

	$scope.clients = [];
	$scope.forms = [];
	$scope.signature = {};
	
	$scope.hideClients = true;
	$scope.hideForms = true;

	if ($stateParams.id === 'new') {
		$scope.hideClients = false;
		$scope.hideForms = false;
		$http.get('/api/clients').success(function (clients) {
			$scope.clients = clients;
		}).error(function (err) {
			ngToast.danger('Unable to load clients...<br/>' + err.message);
		});
		$http.get('/api/forms').success(function (forms) {
			$scope.forms = forms;
		}).error(function (err) {
			ngToast.danger('Unable to load forms...<br/>' + err.message);
		});
	} else {
		$scope.id = $stateParams.id;
		$http.get('/api/signatures/' + $stateParams.id).success(function (signature) {
			$scope.signature = signature;
		}).error(function (err) {
			ngToast.danger('Unable to load signature...<br/>' + err.message);
		});
	}

	$scope.selectClient = function (client) {
		$scope.selectedClient = client;
		$scope.signature.clientId = client.id;
		$scope.signature.name = client.name;
		$scope.hideClients = true;
	};

	$scope.selectForm = function (form) {
		$scope.selectedForm = form;
		$scope.signature.formId = form.id;
		$scope.signature.title = form.title;
		$scope.hideForms = true;
	};
	
	$scope.isPersisted = function () {
		return $scope.signature.id !== undefined;
	};
	
	$scope.isPersistedOrSelectionComplete = function () {
		return ($scope.selectedClient !== undefined && $scope.selectedForm !== undefined) || $scope.signature.id !== undefined;
	};
	
	$scope.save = function () {
		var signature = {
			clientId: $scope.selectedClient.id,
			formId: $scope.selectedForm.id
		};

		$http.post('/api/signatures', signature).success(function (signature) {
			$scope.signature = signature;
			$scope.refreshSignatures();
			$state.go('signatures');
			ngToast.success('Saved signature!');
		}).error(function (err) {
			ngToast.danger('Error saving signature...<br/>' + err.message);
		});
	};
	
	$scope.delete = function () {
		$http.delete('/api/signatures/' + $stateParams.id).success(function () {
			$state.go('signatures');
			$scope.refreshSignatures();
			ngToast.success('Deleted!');
		}).error(function (err) {
			ngToast.danger('Error deleting signature...<br/>' + err.message);
		});
	};
	
	$scope.notify = function () {
		console.log('Notify!');	
	};
	
});
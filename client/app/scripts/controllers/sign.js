'use strict';

/* global moment */
angular.module('app').controller('signCtrl', function ($scope, $http, $stateParams, ngToast, $auth) {

	$scope.signature = {};
	$scope.clientPad = {};
	$scope.ownerPad = {};
	$scope.isAuthenticated = $auth.isAuthenticated();

	refreshSignature($stateParams.id);

	$scope.submitClientSignature = function () {
		if (!$scope.clientPad.isEmpty()) {
			$scope.signature.clientSignature = $scope.clientPad.toDataURL();
			submit();
		} else {
			ngToast.danger('Signature is blank!');
		}
	};
	
	$scope.submitOwnerSignature = function () {
		if (!$scope.ownerPad.isEmpty()) {
			$scope.signature.ownerSignature = $scope.ownerPad.toDataURL();
			submit();
		} else {
			ngToast.danger('Signature is blank!');
		}
	};
	
	$scope.rejectClientSignature = function () {
		$http.post('/api/signatures/reject/' + $scope.signature.id).success(function () {
			refreshSignature($scope.signature.id);
		});
	};

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
	
	function refreshSignature(id) {
		$http.get('/api/signatures/' + id).success(function (signature) {
			$scope.signature = signature;
		}).error(function (err) {
			ngToast.danger('Unable to load form!<br/>' + err.message);
		});
	}
	
	function submit() {
		$http.post('/api/sign/', $scope.signature).success(function () {
			ngToast.success('Form submitted!');
		}).error(function (err) {
			ngToast.danger('Unable to submit form!<br/>' + err.message);
		});
	}
});
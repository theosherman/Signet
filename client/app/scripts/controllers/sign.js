'use strict';

/* global moment */
angular.module('app').controller('signCtrl', function ($scope, $http, $stateParams, ngToast, $auth) {

	$scope.signature = {};
	$scope.clientPad = {};
	$scope.ownerPad = {};
	$scope.isAuthenticated = $auth.isAuthenticated();

	$http.get('/api/signatures/' + $stateParams.id).success(function (signature) {
		$scope.signature = signature;
	}).error(function (err) {
		ngToast.danger('Unable to load form!<br/>' + err.message);
	});

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

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
	
	function submit() {
		$http.post('/api/sign/', $scope.signature).success(function () {
			ngToast.success('Form submitted!');
		}).error(function (err) {
			ngToast.danger('Unable to submit form!<br/>' + err.message);
		});
	}
});
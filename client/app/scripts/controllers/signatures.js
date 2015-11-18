'use strict';

/* global moment */
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
	
	$scope.getStatus = function (signature) {
		if (!signature.clientSignature)
			return 'Awaiting client signature';
		else if (!signature.ownerSignature)
			return 'Awaiting owner signature';
		else
			return 'Complete';
	};
	
	$scope.getStatusClass = function (signature) {
		if (!signature.clientSignature)
			return 'text-danger';
		else if (!signature.ownerSignature)
			return '';
		else
			return 'text-success'
	};

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
	
	$scope.refreshSignatures();
});
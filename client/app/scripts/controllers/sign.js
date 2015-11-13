'use strict';

angular.module('app').controller('signCtrl', function ($scope, $http, $stateParams, ngToast, $auth) {

	$scope.signature = {};
	$scope.signaturePad = {};
	$scope.isAuthenticated = $auth.isAuthenticated();

	$http.get('/api/signatures/' + $stateParams.id).success(function (signature) {
		$scope.signature = signature;
	}).error(function (err) {
		ngToast.danger('Unable to load form!<br/>' + err.message);
	});

	$scope.submit = function () {
		if (!$scope.signaturePad.isEmpty()) {
			$scope.signature.clientSignature = $scope.signaturePad.toDataURL();
			
			$http.post('/api/sign/', $scope.signature).success(function () {
				ngToast.success('Form submitted!');
			}).error(function (err) {
				ngToast.danger('Unable to submit form!<br/>' + err.message);
			});
		} else {
			ngToast.danger('Signature is blank!');
		}
	};

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
});
'use strict';

angular.module('app').controller('FormsCtrl', function ($scope, $http) {
	$scope.forms = [];

	$scope.refreshForms = function () {
		$http.get('api/forms').success(function (forms) {
			$scope.forms = forms;
		});
	};

	$scope.hasForms = function () {
		return $scope.forms.length > 0;
	};

	$scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
	
	$scope.refreshForms();
});
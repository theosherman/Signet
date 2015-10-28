'use strict';

angular.module('app').controller('FormDetailCtrl', function ($scope, $state, $stateParams, $http, ngToast) {
	$scope.form = {};
	
	if ($stateParams.id === 'new') {
		$scope.isEditMode = true;
	} else {
		$scope.isEditMode = false;
		$http.get('/api/forms/' + $stateParams.id).success(function (form) {
				$scope.form = form;
			}).error(function (err) {
				ngToast.danger('Unable to load form...<br/>' + err.message);
			})
	}

	$scope.edit = function () {
		$scope.title = $scope.form.title;
		$scope.body = $scope.form.body;
		$scope.isEditMode = true;
	};

	$scope.cancel = function () {
		$scope.isEditMode = false;
		$scope.title = '';
		$scope.body = '';
	};

	$scope.delete = function () {
		$http.delete('/api/forms/' + $stateParams.id).success(function() {
			$state.go('forms');
			$scope.refreshForms();
			ngToast.success('Deleted!');
		}).error(function(err) {
			ngToast.danger('Unable to delete form...<br/>' + err.message);
		})
		
	}

	$scope.save = function () {
		$scope.form.title = $scope.title;
		$scope.form.body = $scope.body;

		if ($scope.form.id) {
			$http.put('/api/forms', $scope.form)
				.success(saveSuccess)
				.error(saveError);
		} else {
			$http.post('/api/forms', $scope.form)
				.success(saveSuccess)
				.error(saveError);
		}
	};

	function saveSuccess(form) {
		$scope.form = form;
		$scope.isEditMode = false;
		$scope.title = '';
		$scope.body = '';
		$scope.refreshForms();
		ngToast.success('Form saved!');
	}

	function saveError(err) {
		ngToast.danger('Error saving form...<br/>' + err.message);
	}

});
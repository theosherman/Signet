angular.module('app').controller('FormsCtrl', function($scope, $http) {
	$http.get('api/forms').success(function(forms) {
		$scope.forms = forms;
	});
});
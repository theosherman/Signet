'use strict';

angular.module('app').controller('NavbarCtrl', function($scope, $auth, $state) {
	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	}
	
	$scope.getName = function() {
		return $auth.isAuthenticated() ? $auth.getPayload().name : "";
	}
	
	$scope.showLogin = function() {
		return $state.current.name !== "sign";
	}
});
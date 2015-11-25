'use strict';

angular.module('app').controller('HomeCtrl', function ($scope, $http, ngToast) {
  $scope.awaitingClientSignatures = {};
  $scope.awaitingOwnerSignatures = {};
  $scope.completedSignatures = {};
  
  $http.get('api/signatures/awaitingClient').success(function (signatures) {
    $scope.awaitingClientSignatures = signatures;
  });
  
  $http.get('api/signatures/awaitingOwner').success(function (signatures) {
    $scope.awaitingOwnerSignatures = signatures;
  });
  
  $http.get('api/signatures/completed').success(function (signatures) {
    $scope.completedSignatures = signatures;
  });
  
  $scope.fromNow = function (date) {
		return moment(date).fromNow();
	};
});

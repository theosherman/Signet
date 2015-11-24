'use strict';

angular.module('app').controller('HomeCtrl', function ($scope, $http, ngToast) {
  $scope.stats = {};
  
  $http.get('api/signatures/stats').success(function (stats) {
    $scope.stats = stats;
  });
});

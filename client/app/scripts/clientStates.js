'use strict';

var app = angular.module('app');

app.config(function ($stateProvider, $authProvider) {
	
	var denyAnonymous = {
    permissions: {
      except: ['anonymous'],
      redirectTo: 'login'
    }
  };
  
  $stateProvider
    .state('clients', {
      url: '/clients',
      templateUrl: 'views/clients.html',
      controller: 'ClientsCtrl',
      data: denyAnonymous
    })
    .state('clients.detail', {
      url: '/:id',
      templateUrl: 'views/clientDetail.html',
      controller: 'ClientDetailCtrl',
      data: denyAnonymous
    });
	
});
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
    .state('signatures', {
      url: '/signatures',
      templateUrl: 'views/signatures.html',
      controller: 'signaturesCtrl',
      data: denyAnonymous
    })
    .state('signatures.detail', {
      url: '/:id',
      templateUrl: 'views/signatureDetail.html',
      controller: 'signatureDetailCtrl',
      data: denyAnonymous
    });
	
});
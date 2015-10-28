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
    .state('forms', {
      url: '/forms',
      templateUrl: 'views/forms.html',
      controller: 'FormsCtrl',
      data: denyAnonymous
    })
    .state('forms.detail', {
      url: '/:id',
      templateUrl: 'views/formDetail.html',
      controller: 'FormDetailCtrl',
      data: denyAnonymous
    });
	
});
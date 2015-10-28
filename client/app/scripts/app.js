'use strict';

/* global moment */
var app = angular.module('app', [
  'ui.bootstrap',
  'ngAnimate',
  'ngSanitize',
  'ngToast',
  'ui.router',
  'permission',
  'satellizer'
]);

app.config(function ($stateProvider, $urlRouterProvider, $authProvider, ngToastProvider) {
  ngToastProvider.configure({
    verticalPosition: 'bottom',
    animation: 'slide'
  });

  $urlRouterProvider.otherwise("/");

  var denyAnonymous = {
    permissions: {
      except: ['anonymous'],
      redirectTo: 'login'
    }
  };

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      data: denyAnonymous
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutCtrl',
      data: denyAnonymous
    });

  $authProvider.httpInterceptor = true;
  $authProvider.withCredentials = true;
  $authProvider.tokenRoot = null;
  $authProvider.cordova = false;
  $authProvider.baseUrl = 'http://localhost:3000/api';
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = 'Bearer';
  $authProvider.storageType = 'localStorage';
});

app.run(function ($auth, Permission) {
  Permission
    .defineRole('anonymous', function () {
      return !$auth.isAuthenticated();
    });
});

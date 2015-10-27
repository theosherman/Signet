'use strict';

angular
  .module('app', [
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngToast',
    'ui.router',
    'permission',
    'satellizer'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $authProvider, ngToastProvider) {
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
        controller: 'HomeCtrl as vm',
        data: denyAnonymous
      })
      .state('formsedit', {
        url: '/forms/:formId',
        templateUrl: 'views/formedit.html',
        controller: 'FormEditCtrl as vm',
        data: denyAnonymous
      })
      .state('formslist', {
        url: '/forms',
        templateUrl: 'views/forms.html',
        controller: 'FormsCtrl as vm',
        data: denyAnonymous
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl as vm'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl as vm'
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
  })
  .run(function ($auth, Permission) {
    Permission
    .defineRole('anonymous', function () {
      return !$auth.isAuthenticated();
    });
    
  });

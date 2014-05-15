'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', [
  'ngRoute',
  'ngAnimate']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
  	templateUrl: 'partials/frontpage.html', 
  	controller: 'homeCtrl'});
  $routeProvider.when('/login', {
  	templateUrl: 'partials/login.html', 
  	controller: 'loginController'});
  $routeProvider.when('/register', {
  	templateUrl: 'partials/register.html', 
  	controller: 'registrationController'});
  $routeProvider.when('/home', {
    templateUrl: 'partials/create.html', 
    controller: 'mainController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).run(['$rootScope', '$window', 'sessionService',
function ($rootScope, $window, sessionService) {
  $rootScope.session = sessionService;
  $window.app = {
    authState: function(state, user) {
      $rootScope.$apply(function() {
        switch (state) {
          case 'success':
          sessionService.authSuccess(user);
          break;
          case 'failure':
          sessionService.authFailed();
          break;
        }

      });
    }
  };

  if ($window.user !== null) {
    sessionService.authSuccess($window.user);
  }
}]);
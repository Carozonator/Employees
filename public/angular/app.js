'use strict';

// Declare app level module which depends on filters, and services

angular.module('employees', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
        
  $routeProvider.when('/', {
  	templateUrl: 'partials/index.html', 
  	controller: 'EmployeesController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

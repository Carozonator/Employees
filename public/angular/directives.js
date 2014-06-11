'use strict';

var app = angular.module('employees');

/* Directives */
app.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

  app.directive("addForm", function() {
    return {
      restrict: 'E',
      templateUrl: "partials/addForm.html"
    };
  });
  app.directive("currentEmployees", function() {
    return {
      restrict: 'E',
      templateUrl: "partials/currentEmployees.html"
    };
  });
'use strict';

/* Controllers */

var appCtrl = angular.module('app');

// Home Controller
appCtrl.controller('homeCtrl', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    $scope.messages = {};

    function loadMessages() {
      $http.get('/api/secured/message').success(function(data) {
        $scope.messages.secured = data.message || data.error;
      });

      $http.get('/api/message').success(function(data) {
        $scope.messages.unsecured = data.message || data.error;
      });
    }

    var deregistration = $rootScope.$on('session-changed', loadMessages);
    $scope.$on('$destroy', deregistration);

    loadMessages();

  }]);

// LOGIN CONTROLLER

appCtrl.controller('loginCtrl', ['$scope','$http',function($scope,$http) {
  $scope.userInfo = {};
}]);

// REGISTRATION CONTROLLER
appCtrl.controller('registrationCtrl', ['$scope','$http', function($scope,$http) {
  $scope.userInfo = {};
}]);

//PARRIAL 3 CONTROLLER
appCtrl.controller('mainController', function($scope) {
});

// Menu Controller
appCtrl.controller('menuController', function($scope) {
  $scope.menu = [
  {
    menuname: "Home",
    menulocation: "/"
  },
  {
    menuname: "Login",
    menulocation: "/#/login"
  }
  ];
});
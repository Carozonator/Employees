'use strict';

/* Controllers */

var app = angular.module('employees');

// Home Controller
app.controller('EmployeesController', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    refreshNewEmployee();
    $scope.getEmployees = function() {
        $http.get('/employees').success(function(res){
            $scope.employees = res;
        }).error(function(err){
            if (err) throw err;
        });
    };
    $scope.getEmployees();
    
     $scope.deleteEmployee = function(iden) {
        $http.post('/delete',{id: iden}).success(function(res){
            $scope.getEmployees();
        }).error(function(err){
            if (err) throw err;
        });
    };
    $scope.addEmployee = function() {
        $http.post('/add',$scope.newEmployee).success(function(res){
            $scope.getEmployees();
        }).error(function(err){
            if (err) throw err;
        });
        refreshNewEmployee();
    };
    function refreshNewEmployee(){
        $scope.newEmployee={
        name:"",
        lastname:"",
        technologies: [{
            technology:"C#",
            status:false
        },
        {
            technology:"JavaScript",
            status:false
        },
        {
            technology:"Angular",
            status:false
        },
        {
            technology:"Node",
            status:false
        },
        {
            technology:"XBox",
            status:false
        },
        {
            technology:"Office",
            status:false
        }]
        }
    }
  }]);
  

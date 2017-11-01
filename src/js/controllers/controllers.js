(function (window, angular) {
    var APP = angular.module('app.controllers', []);
    
    APP.controller("homeController", ["$scope" , function ($scope) {
        $scope.helloWorld = "HELLO WORLD!!";
    }]);
} (window, angular));
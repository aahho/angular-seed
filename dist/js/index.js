(function (window, angular) {

    var TEMPLATE_URL = "./src/views/";

    var APP = angular.module('angularSeed', [
        'ui.router',
        'app.controllers',
        'app.services',
        'app.directives',
        'app.filters'
    ]);

    APP.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state("home", {
            url: "/",
            templateUrl: TEMPLATE_URL + "home.html",
            controller: "homeController"
        });

        $urlRouterProvider.otherwise(function ($inject) {
            var $state = $inject.get("$state");

            $state.go("home");
        });
    }]);

    APP.run(["$rootScope", function ($rootScope) {
        $rootScope.version = "1.0.0";
    }]);

}(window, angular));
(function (window, angular) {
    var APP = angular.module('app.controllers', []);

        APP.controller("homeController", ["$scope" , function ($scope) {
        $scope.helloWorld = "HELLO WORLD!!";
    }]);
} (window, angular));
(function (window, angular) {
    var APP = angular.module('app.directives', []);
} (window, angular));
(function (window, angular) {
    var APP = angular.module('app.filters', []);
} (window, angular));
(function (window, angular) {
    var APP = angular.module('app.services', []);
} (window, angular));
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
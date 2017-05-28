'use strict';
angular
    .module('stagiaireApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/formateur', {
                controller: 'FormateurController',
                templateUrl: 'views/formateur.view.html'
            })
            .otherwise({redirectTo: '/formateur'});
    });
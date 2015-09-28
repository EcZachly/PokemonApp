//(function () {
    
'use strict';

var pokemonApp = angular.module('pokemonApp', [
   'ngRoute',
    'pokeAppController',
    'pokedexAppController',
    'navBarController',
    'moveAppController'
]);



pokemonApp.config(["$routeProvider",
  function($routeProvider) {
      $routeProvider.
        when('/all', {
            templateUrl: "/components/pokemon_list.html",
            controller: "pokeAppController"
        }).
        when('/pokedex/:name', {
            templateUrl: "/components/pokedex_single.html",
            controller: "pokedexAppController"
        }).
        when('/pokedexID/:id', {
          templateUrl: "/components/pokedex_single.html",
          controller: "pokedexAppController"
      }).
      when('/move/:name', {
          templateUrl: "/components/move.html",
          controller: "moveAppController"
      }).
        otherwise({
            redirectTo: "/all"
        });
}]);
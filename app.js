(function () {
    var app = angular.module("pokemon", [ ]);

    var pokedex = [
        {
            "name": "rattata",
            "resource_uri": "api/v1/pokemon/19/",
            "indexnumber": 19,
            "image": "/media/img/19.png"
        },
        {
            "name": "ratticate",
            "resource_uri": "api/v1/pokemon/20/",
            "indexnumber": 20,
            "image": "/media/img/20.png"
        },
        {
            "name": "bulbasaur",
            "resource_uri": "api/v1/pokemon/1/",
            "indexnumber": 1,
            "image": "/media/img/1383571573.78.png"
        }
    ];
    
    app.controller("PokemonController", ["$http", function ($http) {
        this.creatures = pokedex;
        
    }]);
    
    app.directive("pokemonNameImage", function () {
        return {
            restrict: "E",
            templateUrl: "pokemon_image.html",
            controller: function () {
                this.creatures = pokedex;
            },
            controllerAs: "pokedex"
        };
    });
    
    app.directive("pokemonList", function () {
        return {
            restrict: "E",
            templateUrl: "Pokemon_list.html",
            controller: function ($http) {
                var pokedex = this;
                $http({url: "http://pokeapi.co/api/v1/pokedex/1/", method: "GET"}).success(function(data){
                    pokedex.creatures = data.pokemon;
                    pokedex.creatures.forEach(function(v, index){
                        var url = "http://pokeapi.co/" + v.resource_uri
                        $http({url: url, method: "GET"}).success(function(data){
                            v.national_id = data.national_id
                        })
                    })
                })
            }
        }
    })
    
        app.directive("pokemonDatabase", function () {
        return {
            restrict: "E",
            templateUrl: "pokemon_database.html",
            controller: function ($http) {
              var pokedex = this;

                    var temp = [];
                    
                    for (var i = 1; i < 5; i++) {
                        $http({url: "http://pokeapi.co/api/v1/pokemon/" + i + "/", method: "GET"}).success(function(data){
                            console.log(data)
                            temp.push(data)
    //                        pokedex.creatures.national_id = data.national_id;
    //                        pokedex.creatures.sprite = "http://pokeapi.co/media/img/" + data.national_id + ".png";
                            if(temp.length == 4){
                                pokedex.creatures = temp;
                            }
                        });
                    }
                    
                // }
                
//                $http({url: 'http://pokeapi.co/api/v1/pokedex/1/', method: 'GET'}).success(function(data){
////                $http({url: 'https://magicapp.herokuapp.com/mtg/cards?language=en&subtype=goblin&color=white&format=legacy&text=death', method: 'GET'}).success(function(data){
////                    pokedex.creatures = data.pokemon;
//                    
//                    pokedex.creatures.forEach(function(v, index){
//                        if (index < 50) {
////                            console.log(v.resource_uri)
////                            var url = "http://pokeapi.co/" + v.resource_uri
//                            $http({url: url, method: "GET"}).success(function(data){
//    //                            console.log(data)
////                                v.national_id = data.national_id
////                                if (data.types.length = 4) {
////                                    v.types = data.types[0].name
////                                    v.types2 = data.types[1].name
////                                } else {
////                                    v.types = data.types[0].name
////                                    
////                                }
////                                v.types = data.types[0].name
////                                v.types2 = data.types[1].name
////                                v.sprite = "http://pokeapi.co" + data.sprites[0].resource_uri
////                                v.sprite = "http://pokeapi.co/media/img/" + data.national_id + ".png"
//
//                            })
//                        }   
//                    })
//                        
//                })
                
                
//                console.log(typeof pokedex.creatures)
//                console.log(Object.keys(pokedex))
//                console.log(pokedex)
            },
            controllerAs: "pokedex",
            
        };
    });
    
})();


(function () {
    var app = angular.module("pokemon", [ ]);
    

     app.controller("PokeController", ["$scope", "$http", function ($scope, $http) {
        $scope.options = ["All", "Generation 1","Generation 2","Generation 3","Generation 4","Generation 5", "Generation 6"]
        var map = {}
        $scope.creatures = []


        $scope.chosenOption = "All"
        map["All"] = [1, 729]
        map["Generation 1"] = [1, 151]
        map["Generation 2"] = [152, 251]
        map["Generation 3"] = [252, 386]
        map["Generation 4"] = [387, 493]
        map["Generation 5"] = [494, 649]
        map["Generation 6"] = [650, 729]
        $scope.chosenType = null;
          $http({url: "/all", method: "GET"}).success(function(data){
                $scope.creatures = data
           })
        $scope.loadTypes = function(){

        $http({url:"/types", method:"GET"}).success(function(data){
             var arr = ["All"]
              data.forEach(function(v){
                arr.push(v.name)


              })
              console.log(arr)
            $scope.types = arr
          

        });
        }
           $scope.loadTypes()

       
        $scope.hideFunction = function(){
            $scope.creatures.forEach(function(v){
                var typeArr = []
                v.types.forEach(function(type){ 
                    typeArr.push(type.name)
                }) 
                var typeMatches = !(typeArr.indexOf($scope.chosenType) < 0)
                if($scope.chosenType == "All"){
                    typeMatches = true
                }
                var rightGeneration =  v.national_id <= map[$scope.chosenOption][1] && v.national_id >=  map[$scope.chosenOption][0]
                if(typeMatches && rightGeneration){
                    v.show = true
                }        
                else{
                    v.show = false
                }
                
            })
        }
     

        var temp = []
        $scope.onChange = function(newOption){   
                var temp = [];
                
                $scope.chosenOption = newOption
                $scope.hideFunction()



        }
        $scope.changedType = function(newType){
            $scope.chosenType = newType
            $scope.hideFunction()
        }
     }]);


    app.controller("PokemonController", ["$http", function ($http) {
        this.creatures = pokedex;
    
    }]);
    
    app.directive("pokemonNameImage", function () {
        return {
            restrict: "E",
            templateUrl: "components/pokemon_image.html",
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
})();


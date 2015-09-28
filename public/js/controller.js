var pokeAppController = angular.module("pokeAppController", []);
var pokedexAppController = angular.module("pokedexAppController", []);
var navBarController = angular.module("navBarController", []);
var moveAppController = angular.module("moveAppController", []);

navBarController.controller("navBarController", ["$scope", "$location",
    function($scope, $location) {
        $scope.searchEnter = function(keyEvent, val) {
                if (keyEvent.which === 13) {
//                    console.log(arguments)    
                    $location.path("/pokedex/" + val)
//                    console.log(JSON.stringify(keyEvent))
//                    alert(keyEvent);
//                    console.log(Object.keys(keyEvent))
//                    console.log(Object.keys(keyEvent))
                }
            }
    }])

pokeAppController.controller("pokeAppController", ["$scope", "$http", "$routeParams",
    function ($scope, $http, $routeParams) {

        $scope.options = ["All", "1","2","3","4","5", "6"]
        $scope.order = [{name:"Alphabetical", value:"name"}, {name:"Reverse Alphabetical", value:"-name"}, {name:"ID", value:"national_id"}, {name:"Reverse ID", value:"-national_id"}];
        $scope.creatures = []
        $scope.chosenOption = "1"
        $scope.chosenType = "All";

        $http({url: "/pokemon/generation/1", method: "GET"}).success(function(data){
            $scope.creatures = data
            $scope.hideFunction()
        })
        //load data in background
        $http({url: "/all", method: "GET"}).success(function(data){
            data.forEach(function(v){
                if(v.generation != "1"){
                    $scope.creatures.push(v)
                }
            })
        })

        var typesOne = []
        var typesTwo = []
        var tempTypesTwo = []


        $scope.loadTypes = function(){
            $http({url:"/types", method:"GET"}).success(function(data){
                var arr = ["All"]
                var arrTwo = ["Any", "Only"]
                data.forEach(function(v){
                    arr.push(v.name)
                    arrTwo.push(v.name)
                })
                $scope.types = arr
                $scope.secondTypes = arrTwo;
                firstTypes = arr;
                typesTwo = arrTwo;
                tempTypesTwo = arrTwo;
                $scope.orderProp = $scope.order[2].value;
            });
        }


        $scope.updateTypes = function(){
            console.log("brandNewType is equal to: " + brandNewType)
            var index = tempTypesTwo.indexOf(brandNewType);
            if (index > -1) {
                tempTypesTwo.splice(index, 1)
            }
            console.log("tempTypesTwo is equal to: " + tempTypesTwo)
            console.log("typesTwo is equal to: " + typesTwo)
        }


        $scope.loadSecondTypes = function(){
            $scope.secondTypes = $scope.types

        }


        $scope.loadTypes()


        $scope.hideFunction = function(){
            $scope.creatures.forEach(function(v){

//                creates an array with the two types of the current pokemon
                var typeArr = []
                v.types.forEach(function(type){ 
                    typeArr.push(type.name)
                }) 

//                When an option is not found in an array it's output is set equal to -1, so if the type available types don't match what has been set, it will return false
                var typeMatches = !(typeArr.indexOf($scope.chosenType) < 0) || $scope.chosenType == "All"

//                if the type array is less than 2 (meaning only one type) it hides the second type
                if (typeArr.length < 2) {
                    v.hideType = true;
                }

//                this checks to see that the pokemon's national id is within the map for the selected generation
                var rightGeneration =  $scope.chosenOption == v.generation || $scope.chosenOption == "All"

//                if both the type match and the right generation are equal to true, then it sets the show variable to true
                if(typeMatches && rightGeneration){
                    v.show = true
                }   else{
                    v.show = false
                }
            })
        }

        $scope.onChange = function(newOption){   
                $scope.chosenOption = newOption
                $scope.hideFunction()
        }

        var brandNewType

        $scope.changedType = function(newType){
            $scope.chosenType = newType
            brandNewType = newType
            $scope.updateTypes()
            $scope.hideFunction()
        }

        $scope.ChangedSecondType = function(newSecondType){
            $scope.chosenSecondType = newSecondType
            $scope.hideFunction()
        }
}]);

moveAppController.controller("moveAppController", ["$scope", "$http", "$routeParams", "$location",
    function($scope, $http, $routeParams, $location){
        var name = $routeParams.name
        var url = ""
        if (name != undefined) {
            url = "/moves/exactName/" + name
        }
        $http({url: url, method: "GET"}).success(function(data){
            $scope.pokedexMove = data[0]
            console.log(data[0])
        })
    }])

pokedexAppController.controller("pokedexAppController", ["$scope", "$http", "$routeParams", "$location",
    function($scope, $http, $routeParams, $location){
        var id = $routeParams.id
        
        var url = ""
        var name = $routeParams.name
        if (id != undefined) {
            url = "/pokemon/id/" + id
        } else {
            url = "/pokemon/exactName/" + name
        }
        $http({url: url, method: "GET"}).success(function(data){
            $scope.pokedexEntry = data[0]
            if (data.length == 0) {
                $location.path('/all')
            }
            id = data[0].national_id
            
            if (data[0].evolutions != "") {
                var evolutionInfo = data[0].evolutions
//                console.log(evolutionInfo)
                var i = 0
                $scope.pokedexEntry.evolutionData = [];
                $scope.pokedexEntry.evolutionsBool = "Evolutions";
                evolutionInfo.forEach(function(){
                    var tempName = "/pokemon/name/" + evolutionInfo[i].to
//                    console.log(tempName)
                    
                    $http({url: tempName, method: "GET"}).success(function(data){
                            $scope.pokedexEntry.evolutionData.push(data[0])
//                            console.log(evolutionData)
                            
                        })
                    
                    i++
                    
                })
                
            }
            
            var nextID = parseInt(id) + 1
            if (nextID > 718) {
                nextID = 1
            }
            $http({url: "/pokemon/id/" + nextID, method: "GET"}).success(function(data){
                $scope.pokedexEntry.nextID = nextID
                $scope.pokedexEntry.nextPokemon = data[0].name
            })
            var previousID = parseInt(id) - 1
            if (previousID < 1) {
                previousID = 718
            }
            $http({url: "/pokemon/id/" + previousID, method: "GET"}).success(function(data){
                $scope.pokedexEntry.previousID = previousID
                $scope.pokedexEntry.previousPokemon = data[0].name
            })
            $scope.pokedexEntry.cry = "/sounds/" + id + ".wav"
            $http({url:"/moves/pokemon/" + data[0].name, method: "GET"}).success(function(data2){
//                console.log(data2)
                $scope.pokedexEntry.moves = data2

            })
        })
    }]);


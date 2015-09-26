var pokeAppController = angular.module("pokeAppController", []);
var pokedexAppController = angular.module("pokedexAppController", []);

pokeAppController.controller("pokeAppController", ["$scope", "$http", "$routeParams",
    function ($scope, $http, $routeParams) {

        $scope.options = ["All", "1","2","3","4","5", "6"]
        $scope.order = [{name:"Alphabetical", value:"name"}, {name:"Reverse Alphabetical", value:"-name"}, {name:"ID", value:"national_id"}, {name:"Reverse ID", value:"-national_id"}];
        $scope.creatures = []
        $scope.chosenOption = "Generation 1"
        $scope.chosenType = "All";

        $http({url: "/all", method: "GET"}).success(function(data){
            $scope.creatures = data
            $scope.hideFunction()
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

pokedexAppController.controller("pokedexAppController", ["$scope", "$http", "$routeParams",
    function($scope, $http, $routeParams){
        var id = $routeParams.id
        var descriptionLink;
        $http({url: "/id/" + id, method: "GET"}).success(function(data){
            $scope.pokedexEntry = data[0]
            descriptionLink = $scope.pokedexEntry.descriptions[0].resource_uri
            var unadjustedID = $scope.pokedexEntry.national_id
            if (unadjustedID < 10) {
                $scope.pokedexEntry.adjustedID = "00" + unadjustedID
                console.log($scope.pokedexEntry.adjustedID)
            } else if (unadjustedID < 100) {
                $scope.pokedexEntry.adjustedID = "0" + unadjustedID
                console.log($scope.pokedexEntry.adjustedID)
            } else {
                $scope.pokedexEntry.adjustedID = unadjustedID
                console.log($scope.pokedexEntry.adjustedID)
            }
            $http({url: "http://pokeapi.co" + descriptionLink, method: "GET"}).success(function(data){
                $scope.pokedexEntry.officialDescription = data.description
            })
        })
    }]);
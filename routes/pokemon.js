var database = require("./database.js")
var pokemonCollection = database.get("Pokemon")
var say = require('say')
var pokemon = {
	endPoint : function(req, res){
		say.speak('Alex', 'whats up, dog?');
	},
	getByType : function(req, res){
		var type = req.params.type
		var regex = new RegExp('^' + type, 'gi')
		pokemonCollection.find({"types.name":regex}, function(err, data){
			res.json(data)
		})
	},
	getByName : function(req, res){
		var name = req.params.name	
		var regex = new RegExp('^' + name, 'gi')
		pokemonCollection.find({"name":regex}, function(err, data){
			res.json(data)
		})
	},
	getById : function(req, res){
		var id = parseInt(req.params.id)
		pokemonCollection.find({"national_id":id}, function(err, data){
			res.json(data)
		})
	},
	getAll : function(req,res){
		pokemonCollection.find({}, function(err, data){
			res.json(data)
		})
	},
	getByGeneration: function(req, res){
		var gen = req.params.generation
		pokemonCollection.find({"generation": gen}, function(err, data){
			res.json(data)
		})
	},
	getTypes : function(req, res){
		pokemonCollection.distinct("types", function(err, data){
			res.json(data)
		})
	}
}


module.exports = pokemon
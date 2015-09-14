var database = require("./database.js")
var pokemonCollection = database.get("Pokemon")
var pokemon = {
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
		var id = req.params.id
		pokemonCollection.find({"national_id":id}, function(err, data){
			res.json(data)
		})
	},
	getAll : function(req,res){
		pokemonCollection.find({}, function(err, data){
			res.json(data)
		})
	}
}


module.exports = pokemon
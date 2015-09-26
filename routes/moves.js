var database = require("./database.js")
var moveCollection = database.get("Move")
var move = {
	getMovesByPokemon : function(req, res){
		var pokemonName = req.params.pokemon
		var query = {}
		query["pokemon.name"] = pokemonName
		moveCollection.find(query, function(err, data){
			data.forEach(function(v){
				v.pokemon = v.pokemon.map(function(v){ if(v.name == pokemonName){ return v}}).filter(function(n){ return n != null }); 
				v.learn_type = v.pokemon[0].learn_type
				v.level = v.pokemon[0].level
				v.pokemon = null
			})
			res.json(data)
		})
	}
}
module.exports = move
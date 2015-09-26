
database = require("../routes/database.js")
pokemonCollection = database.get("Pokemon")






pokemonCollection.find({}, (err, data)->
	data.forEach((v)->
		v.moves = null
		v.descriptions = null


		pokemonCollection.update({"name":v.name}, v,(err, data)->

		)

	)



)
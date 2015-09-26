database = require("./database.js")
pokemonCollection = database.get("Pokemon")
_ = require('lodash')
map = {}


map["1"] = [1, 151]
map["2"] = [152, 251]
map["3"] = [252, 386]
map["4"] = [387, 493]
map["5"] = [494, 649]
map["6"] = [650, 729]
pokemonCollection.find({}, (err, data)->
	
	_.each(data, (v)->
		console.log v
		# _.each(Object.keys(map), (v1)->
		# 	if(v.national_id <= map[v1][1] && v.national_id >= map[v1][0])
		# 		console.log(v1)
		# 		console.log(v.name)
		# 		v["generation"] = v1
		# 		pokemonCollection.update({"name":v.name}, v, (err, data)->
		# 			console.log("UPDATED"  + v.name)
		# 		)



		# )


	)
)
request = require('request')
fs = require('fs')
database = require('./database.js')
pokemonCollection = database.get("Pokemon")

pokemonArr = []



data = fs.readFileSync("pokemonData.json", "utf-8")


data = data.replace(/[\u2018\u2019]/g, "\"").replace(/[\u201C\u201D]/g, '"')
# data2 = data.split("},{")

newData = JSON.parse(data)



newData.forEach((v)->
	console.log(v.name)
	pokemonCollection.insert(v, (err, data)->
		console.log("INSERTED 1")

	)
)

		


# # request("http://pokeapi.co/api/v1/pokedex/1/", (err, req, data)->

# # 	data2 = JSON.parse data

# # 	data2.pokemon.forEach((v, i)->
# # 		console.log(v)
# # 		console.log(i)
# # 		request("http://pokeapi.co/" + v.resource_uri, (err, req, data)->
# # 			pokemonArr.push(data)
# # 			# console.log(i)
# # 			if(pokemonArr.length == 778)
# # 				fs.writeFileSync("pokemonData.json", pokemonArr)

# # 		)
# # 	)
# # )
# download = (uri, filename, callback)->
# 	console.log(filename)
# 	console.log(uri)
# 	request.head uri, (err, res, body) ->
# 		if(res != undefined)
# 	 	 console.log 'content-type:', res.headers['content-type']
# 	 	 console.log(uri)
# 	 	 console.log 'content-length:', res.headers['content-length']
# 	 	 request(uri).pipe(fs.createWriteStream(filename)).on('close', callback).on("error", ()->console.log("ERR"))
# 	 	 return


# d = ()->
# 	end = 778
# 	start = 720
# 	while(start < end)
# 		download("http://pokeapi.co/media/img/" + start + ".png", start + ".png", ()->
# 			console.log("DONE DOWNLOADING AN IMAGE")
# 		)
# 		start = start + 1

# d()



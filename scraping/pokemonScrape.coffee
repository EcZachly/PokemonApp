cheerio = require('cheerio')
request = require('request')


database = require("../routes/database.js")
pokemonCollection = database.get("Pokemon")

pokemonCollection.find({"name": "Nidoran-f"}, (err, data) ->
	data.forEach((v)->
		
		name = v.name
		name = "Nidoran-Female"
		url = "http://www.pokemon.com/us/pokedex/" + name.toLowerCase()
		request(url, (err, req, data)->
			$ = cheerio.load(data)
		
			v.description = $('p')[0].children[0].data.trim()
			array = $('div[class="column-7"]').children('ul').children('li').children('span').text().trim()
			v.height = array.substring(6, array.indexOf("Weight"))
			v.weight = array.substring(array.indexOf("Weight") + 6, array.indexOf("Gender"))
			v.category = $('div[class="column-7 push-7"]').children('ul').children('li').children('span').text()
			v.category = v.category.substring(8, v.category.indexOf("Abilities"))
			console.log(v)
			v.name = "Nidoran-f"
			pokemonCollection.update({name:"Nidoran-f"}, v, (err, data)->
				console.log("UPDATED " + v.name)

			)

		)
	)




)
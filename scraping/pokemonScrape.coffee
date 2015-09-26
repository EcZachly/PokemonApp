cheerio = require('cheerio')
request = require('request')


database = require("../routes/database.js")
pokemonCollection = database.get("Pokemon")

pokemonCollection.find({}, (err, data) ->
	data.forEach((v)->
		name = v.name
		if(name.indexOf("-") >= 0)
			name = name.substring(0, name.indexOf("-"))

		url = "http://www.pokemon.com/us/pokedex/" + name.toLowerCase()
		request(url, (err, req, data)->

			$ = cheerio.load(data)

			console.log(v.name)
			console.log($('p')[0].children[0].data.trim())
			array = $('div[class="column-7"]').children('ul').children('li').children('span').text().trim()
			v.height = array.substring(6, array.indexOf("Weight"))
			v.weight = array.substring(array.indexOf("Weight") + 6, array.indexOf("Gender"))
			v.category = $('div[class="column-7 push-7"]').children('ul').children('li').children('span').text()
			v.category = v.category.substring(8, v.category.indexOf("Abilities"))
			adjustedID = ""
			unadjustedID = v.national_id
			if (unadjustedID < 10) 
                adjustedID = "00" + unadjustedID
            else if (unadjustedID < 100)
                adjustedID = "0" + unadjustedID
            else
                adjustedID = unadjustedID
			v.profile_image = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/" + adjustedID + ".png"
			console.log(v.height)
			console.log(v.weight)
			console.log(v.category)
			console.log(v.profile_image)

			pokemonCollection.update({name:v.name}, v, (err, data)->
				console.log("UPDATED " + v.name)

			)

		)
	)




)
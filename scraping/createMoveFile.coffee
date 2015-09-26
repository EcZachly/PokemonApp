fs = require('fs')
request = require('request')
database = require("../routes/database.js")
pokemonCollection = database.get("Pokemon")
moveCollection = database.get("Move")

moves = fs.readFileSync("moveFile.json", 'utf-8').split("\n")
moveFile = fs.readFileSync("moveMapping.json", 'utf-8').split("\n")


moveMap = {}
moveFile.forEach((v)->

	mapName = v.split(",")[0]
	mapAdd = v.substring(v.indexOf(",") + 1)
	if(mapName.indexOf("'") == 0)
		mapName = mapName.substring(1, mapName.length - 1)
	if(moveMap[mapName] == undefined)
		moveMap[mapName] = []
		moveMap[mapName].push(JSON.parse(mapAdd))
	else
		moveMap[mapName].push(JSON.parse(mapAdd))


)

console.log(moveMap)
moves.forEach((v)->
	obj = JSON.parse(v)

	obj.pokemon = moveMap[JSON.parse(v).name]
	
	console.log(obj)
	if(obj.pokemon != undefined)
		moveCollection.update({name:obj.name}, obj, (err, data)->


		)


)








# pokemonCollection.find({}, (err, data)->

# 	data.forEach((v)->
# 		v.moves.forEach((move)->
# 				moveMap[move.name] = []
# 				obj = {}
# 				obj["name"] = v.name
# 				obj["learn_type"] = move.learn_type
# 				if(move.learn_type == "level up")
# 					obj["level"] = move.level
# 				output = move.name + "," +  JSON.stringify(obj)
# 				fs.appendFileSync("moveMapping.json", output + "\n")
# 		)
# 	)

# )


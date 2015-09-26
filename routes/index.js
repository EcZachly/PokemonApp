var pokemon = require('./pokemon.js')
var move = require('./moves.js')


var express = require('express')
var router = express.Router()

router.get('/pokemon/type/:type', pokemon.getByType)
router.get('/pokemon/id/:id', pokemon.getById)
router.get('/pokemon/name/:name', pokemon.getByName)
router.get('/pokemon/generation/:generation', pokemon.getByGeneration)
router.get('/moves/pokemon/:pokemon', move.getMovesByPokemon)
router.get('/all', pokemon.getAll)
router.get('/types', pokemon.getTypes)

module.exports = router
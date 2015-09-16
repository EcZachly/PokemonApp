var pokemon = require('./pokemon.js')



var express = require('express')
var router = express.Router()
// var auth = require('./auth.js')


router.get('/type/:type', pokemon.getByType)
router.get('/id/:id', pokemon.getById)
router.get('/name/:name', pokemon.getByName)
router.get('/all', pokemon.getAll)
router.get('/types', pokemon.getTypes)

module.exports = router
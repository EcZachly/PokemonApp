var mongo = require('mongodb');
var monk = require('monk');
var url = "mongodb://Zach:database@ds029638.mongolab.com:29638/heroku_rxhcwlxb"
var db = monk(url);
module.exports = db;
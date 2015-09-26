cheerio = require('cheerio')
request = require('request')
url = "http://www.serebii.net/card/english.shtml"



request(url, (err, req, data)->

	$ = cheerio.load(data)
	console.log($('a').text())
)
var app, bodyParser, express, logger, path, server, fs;

express = require('express');
fs = require('fs')
path = require('path');
request = require('request');
logger = require('morgan');
_ = require('lodash')
// bodyParser = require('body-parser');
app = express();
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');

// app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', require('./routes'));


app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
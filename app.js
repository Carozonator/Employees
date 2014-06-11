/**
 * Module dependencies.
 */
 var mongoose = require("mongoose");
 var http = require('http');
 var fs = require('fs');
 var mongodbURI = 'mongodb://localhost/testapp';

mongoose.connect(mongodbURI);

require('./model/employees.js');

var app = require('./config/express')( mongodbURI);

require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;
/**
 * Module dependencies.
 */
 var mongoose = require("mongoose");
 var http = require('http');
 var fs = require('fs');
 var passport = require('passport');
 var mongodbURI = '##############';
 var facebookAppId = '#############',
     facebookAppSecret = '#####################';

mongoose.connect(mongodbURI);

var models_path = __dirname + '/model';
fs.readdirSync(models_path).forEach(function(file) {
    if (file.substring(-3) === '.js') {
        require(models_path + '/' + file);
    }
});

require('./config/passport')(passport, facebookAppId, facebookAppSecret);

var app = require('./config/express')(passport, mongodbURI);

require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;
var express = require('express'),
    expressValidator = require('express-validator'),
    mongoStore = require('connect-mongo')(express),
    path = require('path');

module.exports = function (passport, db) {
    var app = express();
    app.set('port', process.env.PORT || 5000);
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    app.use(express.favicon(__dirname + '/../public'));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.bodyParser({keepExtensions:true,uploadDir:__dirname+'/public/icons/tmp'}));
    app.use(expressValidator());
    app.use(express.cookieParser());

    app.use(express.static(path.join(__dirname, '/../public')));

    app.use(app.router);

    if ('development' == app.get('env')) {
        app.use(express.errorHandler());

        app.use(function(req, res, next) {
             console.log(req.url);
             next();
        });
    }

    return app;
};
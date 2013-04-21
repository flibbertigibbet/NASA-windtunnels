
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , chart = require('./routes/chart')
  , chart2 = require('./routes/chart2')
  , bar = require('./routes/bar');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chart', function(req, res) {
  res.sendfile(__dirname + '/public/chart.html');
});
app.get('/chart2', function(req, res) {
  res.sendfile(__dirname + '/public/chart2.html');
});
app.get('/bar', function(req, res) {
  res.sendfile(__dirname + '/public/bar.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

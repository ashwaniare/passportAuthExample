var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
//var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var configDB = require('./config/database');

mongoose.connect(configDB.url);
var db = mongoose.connection;
require('./config/passport')(passport); //pass passport object for configuration


app.use(express.static(__dirname+'/client'));



app.use(cookieParser()); //read cookies(needed for auth)
app.use(bodyParser.json());
app.use(morgan('dev')); //log every request to the console

//required for passport
app.use(session({secret:'ilovescotchscotchyscotchscotch'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
//app.use(flash()); //use connect-flash for flash messages stored in sessions

require('./routes/routes')(app, passport);

app.listen(3000, function(){
	console.log('Server Running...');
});
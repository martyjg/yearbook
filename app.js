var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
//var ejs = require('ejs');

var app = express();
var expressHelpers = require('express-helpers')(app);
var router = require('./config/routes');

// Connection to database
var databaseUrl = 'mongodb://localhost/27017/yearbook'
mongoose.connect(databaseUrl);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));

app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Listen
app.listen(3000);
console.log("Express is listening on localhost:3000");

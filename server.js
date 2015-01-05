/**
 * Created by Diego Alisson on 12/14/14.
 */
var express  = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 5000);
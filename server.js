// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// look up the following
app.use(express.static('app/public'))
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Starts the server to begin listening.
// Place at the bottom!
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
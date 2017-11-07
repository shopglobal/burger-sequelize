var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override')
var serveIndex = require('serve-index');
// var apiJs = require('./api/api.js');
var path = require("path");

var PORT = process.env.PORT || 3000;

var app = express();

var db = require("./models");

app.use(express.static(__dirname + "public")); // serves the public files
app.use('/assets', serveIndex('./public/assets')); // serves the assets list
app.use('/assets', express.static('./public/assets')); // serves the assets files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var helpers = require('handlebars-helpers')(['table', 'math', 'raw-helper']);

// Routes
// =============================================================
var routes = require("./controllers/burgerController.js");
// Dependancies -- callback (passed app through *(app) and callback caught it in dependencyRoutes(app)) in dependancyRoutes.js)
// =============================================================
var dependancies = require("./controllers/dependancyRoutes.js")(app);
app.use("/", routes);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

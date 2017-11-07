// callback function taking in app from server.js and serving the elements from app withing this script.
function dependancyRoutes(app) {
    var express = require("express");
    var bodyParser = require("body-parser");
    var path = require("path");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({
        type: "application/vnd.api+json"
    }));
app.use(express.static("assets"));
app.use(express.static("../assets"));
app.get('/api', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
});
//


app.use(express.static(path.join(__dirname, '../js')));

}

module.exports = dependancyRoutes;
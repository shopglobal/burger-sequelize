var express = require("express");

var router = express.Router();

var db = require("../models");

 router.get('/', function(req, res) {
    db.burger.findAll({}).then(function(data) {
        var burgerObject = { burgers: data }
        console.log(burgerObject);
        res.render('index', burgerObject);
    });
});

 router.get('/burgers', function(req, res) {
    db.burger.findAll({}).then(function(data) {
        var burgerObject = { burgers: data }
        res.redirect('/')
    });
});

router.post("/burgers/create", function(req, res) {
    db.burger.create({ burger_name: req.body.burger_name }).then(function(data) {
        res.redirect('/burgers')
    })
});

router.put("/burgers/update/:id", function(req, res) {
    return db.burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

module.exports = router;

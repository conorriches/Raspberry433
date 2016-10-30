var express = require('express');

module.exports = function(io){
    var router = express.Router();


    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    /* GET admin page. */
    router.get('/admin', function (req, res, next) {
        res.render('admin', {title: 'Express'});
    });

    /* GET pilot page. */
    router.get('/pilot', function (req, res, next) {
        res.render('pilot', {title: 'Express'});
    });


    return router;

};



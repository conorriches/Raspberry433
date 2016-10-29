var express = require('express');

module.exports = function(io){
    var router = express.Router();


    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    /* GET home page. */
    router.get('/admin', function (req, res, next) {
        res.render('admin', {title: 'Express'});
    });


    return router;

};



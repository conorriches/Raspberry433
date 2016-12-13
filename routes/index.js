var express = require('express');
var api = require('../api/api.js');

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


    router.get('/internet/on', function (req, res, next) {

       api.internetOn(function(response){
           res.send(response);
       });

    });

    router.get('/internet/off', function (req, res, next) {

        api.internetOff(function(response){
            res.send(response);
        });
    });



    return router;

};



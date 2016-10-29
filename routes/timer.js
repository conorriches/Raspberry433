var express = require('express');
var timerAPI = require('../api/timerAPI.js');


module.exports = function(io){
    var router = express.Router();

    router.post('/check', function(req, res, next){

        var day = req.body.day;
        var hour = req.body.hours;
        var min = req.body.minute;

        timerAPI.timerCheck(day, hour, min, function(returned){
            res.send(returned);
        });

    });

    return router;

};





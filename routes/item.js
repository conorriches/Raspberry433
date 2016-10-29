var express = require('express');
var api = require('../api/api.js');

module.exports = function(io){
    var router = express.Router();


    router.post('/item/new', function (req, res, next) {

        api.newItem(req, res, function (response) {
            res.send(response)
        });

    });

    router.post('/item/update', function (req, res, next) {

        api.updateItem(req, res, function (response) {
            res.send(response)
        });

    });


    router.post('/item/delete', function (req, res, next) {

        api.deleteItem(req, res, function (response) {
            res.send(response)
        });

    });


    router.post('/model', function (req, res, next) {

        api.switch(req, res, function (response) {
            res.send(response)
        });

    });

    router.post('/switch/:channelNo/:switchNo', function (req, res, next) {

        api.switch(req, res, function (response) {
            res.send(response)
        });

    });


    router.get('/hotswitch/:channelNo/:switchNo/', function (req, res, next) {

        api.hotswitch(req, res, function (response) {
            res.send(response)
        });

    });




    router.get('/list', function (req, res, next) {

        api.list(req, res, function (response) {
            res.send(response)
        });

    });


    router.post('/update/:id/', function (req, res, next) {

        var channelNo = req.params.channel,
            switchNo = req.params.switch,
            name = req.body.name;
        res.send({
            "channel": channelNo,
            "switch": switchNo,
            "name": name,
            "list": api.list()
        });

    });





    return router;

};



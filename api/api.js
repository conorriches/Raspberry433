var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');
// or more concisely
var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }


/**
 * GET ALL
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    db.all("SELECT * FROM ITEMS", function(err, row) {
        res.send(row)
    });
};


/**
 * Changes the state
 * @param req
 * @param res
 * @param callback
 */
exports.switch = function(req, res, callback){
    var status = req.body.status?1:0;

    db.run(
        "UPDATE items SET status = ? WHERE channelNo = ? AND switchNo = ?",
        [status, req.params.channelNo, req.params.switchNo],
        function(){
            console.log("SENT");
            exec("sudo send " + req.params.channelNo + " " + req.params.switchNo + " " + status, puts);
            callback({status:1});
        }
    );
};

/**
 * Changes the state
 * @param req
 * @param res
 * @param callback
 */
exports.hotswitch = function(req, res, callback){

    db.all(
        "SELECT status FROM items WHERE channelNo = ? AND switchNo = ?",
        [ req.params.channelNo, req.params.switchNo],
        function(e,r){

            r.forEach(function(row){
                console.log("Current status is " + row.status);
                var status = (row.status ==1)? 0:1;
                console.log("New status is " + status);

                console.log("err");
                console.log(e);
                db.run(
                    "UPDATE items SET status = ? WHERE channelNo = ? AND switchNo = ?",
                    [status, req.params.channelNo, req.params.switchNo],
                    function(){
                        console.log("SENT");
                        console.log(req.params.channelNo + " " + req.params.switchNo + " " + status);
                        exec("sudo send " + req.params.channelNo + " " + req.params.switchNo + " " + status, puts);

                    }
                );
            });

            callback("<script>window.close()</script>");

        }
    );


   /* db.run(
        "UPDATE items SET status = ? WHERE channelNo = ? AND switchNo = ?",
        [status, req.params.channelNo, req.params.switchNo],
        function(){
            console.log("SENT");
            console.log(req.params.channelNo + " " + req.params.switchNo + " " + status);
            exec("sudo send " + req.params.channelNo + " " + req.params.switchNo + " " + status, puts);
            callback({status:1});
        }
    );*/
};


/**
 * Updates the DB with the model provided by the client.
 * @param req
 * @param res
 * @param callback
 */
exports.updateModel = function(req,res,callback){


    db.run(
        "UPDATE items SET status = ? WHERE channelNo = ? AND switchNo = ?",
        [status, req.params.channelNo, req.params.switchNo],
        function(){
            exec("sudo send " + req.params.channelNo + " " + req.params.switchNo + " " + status, puts);
            callback({status:1});
        }
    );

};


/**
 * POST NEW
 * @param req
 * @param res
 * @param callback
 */
exports.newItem = function(req, res, callback) {

    db.run(
        "INSERT INTO items (name, status, channelNo, switchNo, category, room) VALUES (?,?,?,?,?,?)",
        [
            req.body.obj.name,
            0,
            req.body.obj.channelNo,
            req.body.obj.switchNo,
            req.body.obj.category,
            req.body.obj.room
        ],
        function(){
            callback({status:1});
        }
    );

};


exports.updateItem = function(req, res, callback) {

    db.run(
        "UPDATE items SET name = ?, channelNo=?, switchNo = ?, room = ?, category = ? WHERE ID = ?",
        [
            req.body.obj.name,
            req.body.obj.channelNo,
            req.body.obj.switchNo,
            req.body.obj.room,
            req.body.obj.category,
            req.body.obj.id
        ],
        function(){
            callback({status:1});
        }
    );


};


exports.deleteItem = function(req, res, callback) {

    db.run(
        "DELETE FROM items WHERE ID = ?",
        [
            req.body.obj.id
        ],
        function(){
            callback({status:1});
        }
    );


};


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db');

/**
 * Get all timers
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    db.all("SELECT * FROM TIMERS", function(err, row) {
        res.send(row)
    });
};


/**
 * Changes the state of a given timer provided an ID and status
 * @param req
 * @param res
 * @param callback
 */
exports.setActive = function(req, res, callback){
    var status = req.body.status?1:0;

    db.run(
        "UPDATE timers SET status = ? WHERE id = ?",
        [status, req.params.id],
        function(){
            console.log("Timer update active");
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
exports.newTimer = function(req, res, callback) {

    db.run(
        "INSERT INTO timers (name,status,monday,tuesday,wednesday,thursday,friday,saturday,sunday,hours,minutes) VALUES (?,?,?,?,?,?)",
        [
            req.body.obj.name,
            1,
            req.body.obj.monday,
            req.body.obj.tuesday,
            req.body.obj.wednesday,
            req.body.obj.thursday,
            req.body.obj.friday,
            req.body.obj.saturday,
            req.body.obj.sunday,
            req.body.obj.hours,
            req.body.obj.minutes
        ],
        function(){
            callback({status:1});
        }
    );

};


/**
 * Updates a timer given the timer ID
 * @param req
 * @param res
 * @param callback
 */
exports.updateTimer = function(req, res, callback) {

    db.run(
        "UPDATE timers SET name = ?, " +
        "status = ?," +
        "monday = ?," +
        "tuesday = ?," +
        "wednesday = ?," +
        "thursday = ?," +
        "friday = ?," +
        "saturday = ?," +
        "sunday = ?," +
        "hours = ?," +
        "minutes = ?" +
        " WHERE ID = ?",
        [
            req.body.obj.name,
            req.body.obj.status,
            req.body.obj.monday,
            req.body.obj.tuesday,
            req.body.obj.wednesday,
            req.body.obj.thursday,
            req.body.obj.friday,
            req.body.obj.saturday,
            req.body.obj.sunday,
            req.body.obj.hours,
            req.body.obj.minutes
        ],
        function(){
            callback({status:1});
        }
    );


};


exports.deleteTimer = function(req, res, callback) {

    db.run(
        "DELETE FROM timers WHERE ID = ?",
        [
            req.body.obj.id
        ],
        function(){
            callback({status:1});
        }
    );

};






exports.timerCheck = function(day, hour, minute, callback){

    db.run(
        "SELECT * FROM timers WHERE ? = 1 AND hour = ? AND minute = ?",
        [
            day,
            hour,
            minute
        ],
        function(e, r){

            if(e){

                callback({
                    status:0,
                    error: e
                });
            }else{
                callback({
                    status:1,
                    result:42
                });
            }

            /*
            r.forEach(function(timer){
               return("Got a timer!");
            });*/

        }
    );


   // return {"result":"no"};

};

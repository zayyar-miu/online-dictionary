var mysql = require('mysql');
var config = require('./config/config');

exports.lookup = function (vals, callback) {
    var con = mysql.createConnection(config.databaseOptions);
    con.connect(function(err) {
        if (err) {
            return callback({success: false, message: err});
        }
        con.query("SELECT * FROM entries WHERE word = '" + vals.term + "'", function (err, result, fields) {
            if (err) {
                return callback({success: false, message: err});
            }
            return callback({success: true, data: result});
        });
    });
};
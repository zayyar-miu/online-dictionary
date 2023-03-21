var mysql = require('mysql');
var config = require('./config/config');

exports.lookup = function (vals) {
    var connection = mysql.createConnection(config.databaseOptions);
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM entries WHERE word = '" + vals.term + "'", function (err, rows, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject({success: false, message: err});
            }
            resolve({success: true, data: rows});
        });
    });
};
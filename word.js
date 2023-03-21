var mysql = require('mysql');
var config = require('./config/config');

exports.lookup = function (req,res,vals) {
    var headers = {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'application/json',
    };
    res.writeHead(200, headers);
    var con = mysql.createConnection(config.databaseOptions);
    con.connect(function(err) {
        if (err) {
            res.write(JSON.stringify({success: false, message: err}));
            return res.end();
        }
        con.query("SELECT * FROM entries WHERE word = '" + vals.term + "'", function (err, result, fields) {
            if (err) {
                res.write(JSON.stringify({success: false, message: err}));
            } else {
                res.write(JSON.stringify({success: true, data: result}));    
            }
            return res.end();
        });
    });
};
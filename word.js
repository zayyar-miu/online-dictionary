var mysql = require('mysql');
var config = require('./config/config');

exports.lookup = function (req,res,vals) {
    var headers = {
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'application/json',
    };
    res.writeHead(200, headers);
    var con = mysql.createConnection(config.databaseOptions);
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM entries WHERE word LIKE '%" + vals.term + "%'", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.write(JSON.stringify(result));
          return res.end();
        });
    });
    // return res.end();
};
var http = require('http');
var url = require('url');
var wordmod = require('./word');

http.createServer(function (req, res) {
    const headers = {
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'application/json',
    };
    var q = url.parse(req.url, true);
    if (q.pathname=="/lookup") {
        wordmod.lookup(req, res, q.query)
    } else {
        res.writeHead(404, headers);
        res.write(JSON.stringify({success: false, message: "404 Not Found"}));
        return res.end();
    }
}).listen(8081);


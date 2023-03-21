var http = require('http');
var url = require('url');
var wordmod = require('./word');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    if (q.pathname == "/lookup") {
        wordmod.lookup(q.query, (response) => {
            const headers = {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'application/json',
            };
            res.writeHead(200, headers);
            res.end(JSON.stringify(response));
        });
    }
}).listen(8081);


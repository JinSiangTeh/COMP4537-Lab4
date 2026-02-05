const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) { res.writeHead(500); return res.end("Error loading HTML"); }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}).listen(8080, () => console.log("Client UI running on http://localhost:8080"));

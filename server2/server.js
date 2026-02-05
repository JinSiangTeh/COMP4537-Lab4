const http = require('http');
const url = require('url');
const PatientDB = require('./database');

const adminCfg = { host: 'localhost', user: 'lab5_admin', password: 'admin_password', database: 'lab5_db' };
const readCfg = { host: 'localhost', user: 'lab5_reader', password: 'read_password', database: 'lab5_db' };

const db = new PatientDB(adminCfg, readCfg);

const server = http.createServer(async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    try {
        if (path === '/lab5/api/v1/sql' && req.method === 'POST') {
            const result = await db.insertDefaultData();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Success", inserted: result.affectedRows }));
        } 
        else if (path.includes('/lab5/api/v1/sql/') && req.method === 'GET') {
            const sqlQuery = decodeURIComponent(path.split('/v1/sql/')[1]);
            const data = await db.secureRead(sqlQuery);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.writeHead(404);
            res.end("Not Found");
        }
    } catch (err) {
        res.writeHead(403); 
        res.end(JSON.stringify({ error: err.message }));
    }
});

server.listen(3000, () => console.log("API Server running on port 3000"));

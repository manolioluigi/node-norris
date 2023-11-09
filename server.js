require('dotenv').config();

const http = require('http');
const https = require('https');
const fs = require('fs').promises;
const { join } = require('path');
const fetchJoke = require("./fetchJoke");

const port = process.env.PORT || 3300;
const norrisDbPath = join(__dirname, 'norrisDb.json');

function htmlResponse(res, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
}

const host = process.env.HOST || "localhost";

const server = http.createServer(async (req, res) => {

    const joke = await fetchJoke();

    let norrisDb = [];
    const fileData = await fs.readFile(norrisDbPath, 'utf8');
    norrisDb = JSON.parse(fileData);

    norrisDb.push(joke);
    await fs.writeFile(norrisDbPath, JSON.stringify(norrisDb, null, 2));

    htmlResponse(res, "<h1>" + joke + "</h1>");

});

server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});

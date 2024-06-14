// libraries: ws, express, cookie-parser, neo4j-driver
const express = require('express');
const cookieParser = require('cookie-parser');
// new socket server
var WebSocketServer = require('ws').Server
	,wss = new WebSocketServer({ port: 8000 });

const cookie_api = require('./routes/cookie_api');
const signin_api = require('./routes/signin_api');
const search_api = require('./routes/search_api');
const profile_api = require('./routes/profile');

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// Use the api router
app.use('', cookie_api);
app.use('', signin_api);
app.use('', search_api);
app.use('', profile_api);

wss.on('connection', function connection(ws) {
    console.log('New client connected');

    ws.on('message', function incoming(message) {
        const buffer = Buffer.from(message);
        counsole.log(buffer.toString());
        console.log('received: %s', message);
        ws.send('${message}');
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
// libraries: ws, express, cookie-parser, neo4j-driver
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// new socket server
var WebSocketServer = require('ws').Server
	,wss = new WebSocketServer({ port: 8000 });

const cookie_api = require('./routes/cookie_api');
const signin_api = require('./routes/signin_api');
const search_api = require('./routes/search_api');
const profile_fetch_api = require('./routes/profile_fetch_api');
const api_profile_update = require('./routes/profile_update_api');
const calenda_api = require('./routes/calendar_api');
const posts_api = require('./routes/posts_api');

const port = 3000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Use the api router
app.use('', cookie_api);
app.use('', signin_api);
app.use('', search_api);
app.use('', profile_fetch_api);
app.use('', api_profile_update);
app.use('', calenda_api);
app.use('', posts_api);

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

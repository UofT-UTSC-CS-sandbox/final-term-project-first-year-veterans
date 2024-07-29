// libraries: ws, express, cookie-parser, neo4j-driver
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

const port = 3000;
const app = express();
app.use(cors({
    origin: '*',  // accept requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Use the api router
routes(app);

const http = require('http');
const fs = require('fs');
const { Server } = require("socket.io");
// const eiows = require("eiows");

const server = http.createServer(app);

const io = new Server(server, {
//    wsEngine: eiows.Server,  // Use the eiows server, not the default ws server
    cors: {
        origin: '*',  // accept requests from all origins
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (uid) => {
        console.log('create a room for user: ', uid);
        socket.join(uid);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log(msg.sender, ' sent a message to ', msg.receiver);
        io.to(msg.receiver).emit('chat message', msg);
        io.to(msg.sender).emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { Server } = require("socket.io");

const port = 3000;
const app = express();

// CORS configuration for Express.js
// CORS configuration for Express.js
app.use(cors({
    origin: ["http://localhost", "http://54.167.41.40"], // Allow any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));


app.use(express.json());
app.use(cookieParser());

// Use the api router
routes(app);

const server = http.createServer(app);

// CORS configuration for Socket.IO
const io = new Server(server, {
    cors: {
        origin: true, // Replace with your frontend URL
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

// libraries: ws, express, cookie-parser 

const express = require('express');
const cookieParser = require('cookie-parser');
// new socket server
var WebSocketServer = require('ws').Server
	,wss = new WebSocketServer({ port: 8000 });

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());

// set cookie
app.get('/api/cookie',function(req, res){ 
	res.cookie('cookie_name', 'cookie_value', { maxAge: 60 * 1000, httpOnly: true, secure: true });
	return res.send('cookie has been set!');
});

// check cookie
app.get('/api/check-auth', function (req, res) {
    if (checkAuth(req)) {
        res.status(200).json({ loggedIn: true });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// delete cookie
app.get('/api/deletecookie', function(req,res){
	res.clearCookie('cookie_name');
	res.send('Cookie deleted');
});

app.post('/api/search', function (req, res) {
    console.log('Server received: POST /api/search');
    // An example of a search result
    const user = {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com'
    };
    res.status(200);
    res.json(user);
});

app.post('/api/signin', function (req, res) {
    console.log('Server received: POST /api/signin');

    // An example of matching email and password
    const email = 'email';
    const password = 'password';

    if (checkAuth(req)) {
        res.status(200);
        res.json({ signinCorrect: true });
        return;
    }

    if (req.body.email === email && req.body.password === password) {
        res.cookie('cookie_name', 'cookie_value', { maxAge: 60 * 1000, httpOnly: true, secure: true });
        res.status(200);
        res.json({ signinCorrect: true});
    } else {
        res.status(401);
        res.json({ signinCorrect: false});
    }
});

function checkAuth(req) {
    const token = req.cookies['cookie_name'];
    if (token && token === 'cookie_value') {
        return true;
    }
    return false;
}

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
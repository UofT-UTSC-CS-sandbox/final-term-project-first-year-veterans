const express = require('express');
const router = express.Router();
const { getSession } = require('../neo4j');
const { checkAuth } = require('../helper_functions/auth');

router.post('/api/signin', async function (req, res) {
    console.log('Server received: POST /api/signin');

    // An example of matching email and password
    const email = 'email';
    const password = 'password';

    if (checkAuth(req)) {
        res.status(200);
        res.json({ signinCorrect: true });
        return;
    }

    // const session = getSession();
    // const { email, password } = req.body;
    // const query = 'MATCH (u:User {email: $email, password: $password}) RETURN u';
    // const params = { email, password };

    // try{
    //     const result = await session.run(query, params);
    //     if (result.records.length === 0) {
    //         res.status(401);
    //         res.json({ signinCorrect: false });
    //     }
    //     else {
    //         res.cookie('cookie_name', 'cookie_value', { maxAge: 60 * 1000, httpOnly: true, secure: true });
    //         res.status(200);
    //         res.json({ signinCorrect: true });
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(500);
    //     res.json({ signinCorrect: false });
    // } finally {
    //     session.close();
    // }

    if (req.body.email === email && req.body.password === password) {
        res.cookie('cookie_name', 'cookie_value', { maxAge: 60 * 1000, httpOnly: true, secure: true });
        res.status(200);
        res.json({ signinCorrect: true});
    } else {
        res.status(401);
        res.json({ signinCorrect: false});
    }
});

module.exports = router;
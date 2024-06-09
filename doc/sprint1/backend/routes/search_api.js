const express = require('express');
const router = express.Router();

router.post('/api/search', function (req, res) {
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

module.exports = router;
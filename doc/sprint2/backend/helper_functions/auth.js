function checkAuth(req) {
    const token = req.cookies['cookie_name'];
    if (token && token === 'cookie_value') {
        return true;
    }
    return false;
}

module.exports = { checkAuth };
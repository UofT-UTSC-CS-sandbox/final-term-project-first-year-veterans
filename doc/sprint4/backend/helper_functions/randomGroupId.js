const crypto = require('crypto');

function generateRandomID(length) {
  return crypto.randomBytes(length).toString('base64').slice(0, length).replace(/\+/g, '0').replace(/\//g, '0');
}

module.exports = { generateRandomID };
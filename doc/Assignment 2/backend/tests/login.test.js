// tests/login.test.js
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
routes(app); 

describe('POST /api/signin', () => {
  it('should return 200 and set a cookie for valid login', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({ email: 'email', password: 'password' });

    console.log('Response:', response.status, response.body); 
    expect(response.status).toBe(200);
    expect(response.body.signinCorrect).toBe(true);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should return 401 for invalid login', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({ email: 'invalid', password: 'invalid' });

    console.log('Response:', response.status, response.body); 

    expect(response.status).toBe(401);
    expect(response.body.signinCorrect).toBe(false);
    expect(response.headers['set-cookie']).toBeUndefined();
  });
});


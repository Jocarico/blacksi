const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server'); // Replace with the path to your server file

describe('Server Tests 1', () => {
  it('should respond with 200 OK for /login', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.statusCode).to.equal(200);
    assert(response.status === 200);
    // Add more assertions as needed
  }); 
});

describe('Server Tests 2', () => {
  it('should respond with 401 Unauthorized for invalid login', async () => {
    const response = await request(app).post('/login').send({
      email: 'invalid@example.com',
      password: 'invalidpassword',
    });

    expect(response.statusCode).to.equal(500 || 401);
    assert(response.status === 500 || 401);
    // Add more assertions as needed
  });

  // Add more server tests as needed
});
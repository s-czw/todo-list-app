const request = require('supertest');
const app = require('../app');

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

describe('Auth API', () => {

  beforeAll(async () => {
    const config = require('./utils/config.json');
    process.env = Object.assign(process.env, config);
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  let token = '';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        role: 'User'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Save token for future requests
  });

  it('should fail to login with incorrect password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Invalid email or password!');
  });
});

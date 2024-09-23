const request = require('supertest');
const app = require('../app');
const { generateToken } = require('../utils/authUtils');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

describe('Todo API', () => {
  let token = '';
  let todoId = '';
  let testUserId;

  beforeAll(async () => {
    const config = require('./utils/config.json');
    process.env = Object.assign(process.env, config);
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create a test user and generate token
    testUserId = new mongoose.Types.ObjectId();
    token = generateToken({ _id: testUserId, role: 'Admin' });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Todo',
        description: 'This is a test',
        dueDate: '2024-09-30',
        priority: 'High'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    todoId = res.body._id;
  });

  it('should get all todos for the authenticated user', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Todo',
        status: 'InProgress'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated Todo');
    expect(res.body).toHaveProperty('status', 'InProgress');
  });

  it('should delete a todo', async () => {
    const res = await request(app)
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Todo deleted');
  });
});

const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { generateToken } = require('../utils/authUtils');

describe('Auth Middleware', () => {
  beforeAll(async () => {
    const config = require('./utils/config.json');
    process.env = Object.assign(process.env, config);
  });

  it('should authenticate and decode the JWT token', () => {
    const token = generateToken({ _id: 'testId', role: 'Admin' });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authenticate(req, res, next);
    expect(req.user).toHaveProperty('userId', 'testId');
    expect(req.user).toHaveProperty('role', 'Admin');
    expect(next).toHaveBeenCalled();
  });

  it('should authorize user with correct role', () => {
    const req = { user: { role: 'Admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authorize(['Admin'])(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should deny access for unauthorized roles', () => {
    const req = { user: { role: 'User' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authorize(['Admin'])(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
  });
});

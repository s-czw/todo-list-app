const { verifyToken, generateToken } = require('../utils/authUtils');
const { findUserById } = require('../repositories/userRepository');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.body.refreshToken || req.header('x-refresh-token');
      if (!refreshToken) {
        return res.status(403).json({ error: 'No refresh token provided' });
      }
      try {
        // Verify refresh token
        const decodedRefresh = verifyToken(refreshToken);
        const user = findUserById(decodedRefresh.userId);

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({ error: 'Relogin', message: 'Invalid refresh token, Please re-login!' });
        }

        // Generate a new access token
        const newAccessToken = generateToken(user);

        // Send new access token
        res.status(200).json({ accessToken: newAccessToken });
      } catch (refreshErr) {
        return res.status(403).json({ error: 'Relogin', message: 'Invalid or expired refresh token, Please re-login!' });
      }
    }
    return res.status(401).json({ error: 'Invalid Token' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };

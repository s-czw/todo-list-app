const { registerUser, loginUser } = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const token = await registerUser(req.body);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const tokens = await loginUser(req.body);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

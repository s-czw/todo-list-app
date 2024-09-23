const { generateToken, generateRefreshToken } = require("../utils/authUtils");
const { findUser, createUser, refreshUser, updateUser } = require("../repositories/userRepository");

exports.registerUser = async (userBody) => {
  const { email, password, role } = userBody;

  // Check if the email is already registered
  const existingUser = await findUser(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const newUser = createUser(email, password, role);
  return generateToken(newUser);
}

exports.loginUser = async (userBody) => {
  const { email, password } = userBody;
  const user = await findUser(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password!');
  }

  const token = generateToken(user);
  // Generate and store user refreshToken
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  user.save();

  return { token: token, refreshToken: refreshToken }
}
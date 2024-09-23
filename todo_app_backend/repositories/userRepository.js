const { generateRefreshToken } = require("../utils/authUtils");
const User = require("../models/User");

exports.findUser = async (email) => {
  return await User.findOne({ email: email });
}

exports.findUserById = async (userId) => {
  return await User.findById(userId);
}

exports.createUser = async (email, password, role) => {
  const createdAt = new Date();
  const newUser = new User({ email, password, role, createdAt });
  return await newUser.save();
}

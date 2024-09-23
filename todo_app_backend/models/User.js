const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  refreshToken: { type: String },
  createdAt: { type: Date, required: true, default: new Date() }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

const User = require("../models/User");
const { createActivity, getAllActivity } = require("../repositories/activityRepository")

exports.getAllActivity = async (reqQuery) => {
  const { todoId, userId, action } = reqQuery;
  const query = {};
  if (todoId) query.todoId = todoId;
  if (userId) query.userId = userId;
  if (action) query.action = action;
  const sort = { timestamp: -1 };
  return getAllActivity(query, sort);
}

exports.logActivity = async (action, todoId, userId) => {
  const user = await User.findById(userId);
  return await createActivity(action, todoId, userId, user ? user.email : null);
}
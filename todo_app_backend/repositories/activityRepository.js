const Activity = require("../models/Activity")

exports.getAllActivity = async (query, sort) => {
  return await Activity.find(query).sort(sort);
}

exports.createActivity = async (action, todoId, userId, userEmail) => {
  const newActivity = new Activity({
    action, todoId, userId, userEmail
  });
  return await newActivity.save();
}
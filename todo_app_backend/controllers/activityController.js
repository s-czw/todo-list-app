const { getAllActivity } = require("../services/activityService");

exports.getAllActivity = async (req, res) => {
  try {
    res.status(200).json(await getAllActivity(req.query));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
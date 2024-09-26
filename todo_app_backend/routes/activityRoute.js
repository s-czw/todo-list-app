const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { getAllActivity } = require('../controllers/activityController');

const router = express.Router();

router.get('/', authenticate, getAllActivity);

module.exports = router;

const express = require('express');
const {
  getTodayData,
  getWeekData,
  getMonthData,
  getYearData
} = require('../controllers/employeeUserController');
const router = express.Router();
router.get('/:id/today', getTodayData);
router.get('/:id/week', getWeekData);
router.get('/:id/month', getMonthData);
router.get('/:id/year', getYearData);

module.exports = router;

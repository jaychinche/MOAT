const express = require('express');
const {
  getTodayData,
  getWeekData,
  getMonthData,
  getYearData
} = require('../controllers/employeeAdminController');
const router = express.Router();
router.get('/:email/today', getTodayData);
router.get('/:email/week', getWeekData);
router.get('/:email/month', getMonthData);
router.get('/:email/year', getYearData);

module.exports = router;

const EmployeeActivity = require('../models/EmployeeActivity');
const EmployeeActivityWeek = require('../models/EmployeeActivityWeek');
const EmployeeActivityYear =require("../models/EmployeeActivityYear");
const EmployeeActivityMonth =require("../models/EmployeeActivityMonth");



// Controller for fetching today's data
const getTodayData = async (req, res) => {
  
  try {
    const { email } = req.params;

    const employee = await EmployeeActivity.findOne({ email });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller for fetching week's data
const getWeekData = async (req, res) => {
  try {
    const { email } = req.params;
    const employee = await EmployeeActivityWeek.findOne({ email });

    if (!employee) return res.status(404).json({ error: "Week data not found" });

    res.json(employee);
  } catch (error) {
    console.error("Error fetching week data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getMonthData=async(req,res)=>{
    try {
        const { email } = req.params;
        const employee = await EmployeeActivityMonth.findOne({ email });
    
        if (!employee) return res.status(404).json({ error: "Month data not found" });
    
        res.json(employee);
      } catch (error) {
        console.error("Error fetching month data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
const getYearData=async(req,res)=>{
    try {
        const { email } = req.params;
        const employee = await EmployeeActivityYear.findOne({ email });
    
        if (!employee) return res.status(404).json({ error: "Year data not found" });
    
        res.json(employee);
      } catch (error) {
        console.error("Error fetching year data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}

module.exports = {
  getTodayData,
  getWeekData,
  getMonthData,
  getYearData,

};

const EmployeeActivity = require('../models/EmployeeActivity');
const EmployeeActivityWeek = require('../models/EmployeeActivityWeek');
const EmployeeActivityYear =require("../models/EmployeeActivityYear");
const EmployeeActivityMonth =require("../models/EmployeeActivityMonth");
const User=require("../models/User")

// Controller for fetching today's data
const getTodayData = async (req, res) => {

    try {
        const { id } = req.params;
        // Step 1: Find the user by ID to get their email
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Step 2: Use the user's email to fetch activity data
        const employeeActivity = await EmployeeActivity.findOne({ email: user.email });
        if (!employeeActivity) {
          return res.status(404).json({ error: "Employee activity not found" });
        }
    
        // Step 3: Send the activity data to the frontend
        res.json(employeeActivity);
      } catch (error) {
        console.error("Error fetching employee activity:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};
// Controller for fetching week's data
const getWeekData = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const employee = await EmployeeActivityWeek.findOne({ email:user.email });
    
        if (!employee) return res.status(404).json({ error: "Week data not found" });
    
        res.json(employee);
      } catch (error) {
        console.error("Error fetching week data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};
const getMonthData=async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
    
        const employee = await EmployeeActivityMonth.findOne({ email:user.email });
    
        if (!employee) return res.status(404).json({ error: "Month data not found" });
    
        res.json(employee);
      } catch (error) {
        console.error("Error fetching month data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
const getYearData=async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const employee = await EmployeeActivityYear.findOne({ email:user.email });
    
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

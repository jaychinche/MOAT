const mongoose = require("mongoose");

const EmployeeActivityYearSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  activeTime: { type: String, required: true },
  workTime: { type: String, required: true },
  idleTime: { type: String, required: true },
  privateTime: { type: String, required: true },
  applications: [
    {
      name: { type: String, required: true },
      time: { type: String, required: true },
      percentage: { type: Number, required: true },
    },
  ],
});

// Create and export the model
const EmployeeActivityYear = mongoose.model("EmployeeActivityYear", EmployeeActivityYearSchema);
module.exports = EmployeeActivityYear; 

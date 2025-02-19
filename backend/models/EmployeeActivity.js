const mongoose = require("mongoose");

const EmployeeActivitySchema = new mongoose.Schema({
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


const EmployeeActivity = mongoose.model("EmployeeActivity", EmployeeActivitySchema);
module.exports = EmployeeActivity; 

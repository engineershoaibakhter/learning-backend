const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  emp_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  onsite: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);

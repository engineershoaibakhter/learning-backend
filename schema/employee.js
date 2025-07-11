const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  emp_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: false,
  },
  salary: {
    type: Number,
    required: false,
  },
  age:{
    type:Number,
    required:false,
  },
  onsite: {
    type: Boolean,
    required: false,
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("employees", employeeSchema);

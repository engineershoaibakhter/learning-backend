require('dotenv').config({path:'./config/.env'})
const mongoose = require("mongoose");
const Employee = require("./schema/employee");

const uri =process.env.MONGODB_URI;

mongoose.connect(uri)
.then(()=>{
  console.log("Connected to Mongodb Successfully");

  insertSampleData();
})
.catch((error)=>{
  console.error("Mongodb Connection Error: ",error)
})


async function insertSampleData() {
  try {
    // Sample employee data
    const employees = [
      {
        emp_name: "John Doe",
        department: "Engineering",
        salary: 75000,
        onsite: true
      },
      {
        emp_name: "Jane Smith",
        department: "Marketing",
        salary: 65000,
        onsite: false
      },
      {
        emp_name: "Mike Johnson",
        department: "HR",
        salary: 55000,
        onsite: true
      }
    ];

    // Insert multiple documents
    const result = await Employee.insertMany(employees);
    console.log('Sample data inserted successfully:', result);
    
    // Close the connection after insertion
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
}


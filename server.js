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
    // const updateOneEmployee ={
    //   {emp_name:"Shoaib Akhter"},
    //   {emp_name: "Shoaib Qadri", age: 25, location: "Houston", email: "matta@somewhere.com"} 
    // }


    // Insert multiple documents
    await Employee.deleteMany(      
      {age:{$lte:25}}
    );
    const result= await Employee.find()
    console.log('Sample data inserted successfully:', result);
    
    // Close the connection after insertion
    mongoose.connection.close();
    
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
}


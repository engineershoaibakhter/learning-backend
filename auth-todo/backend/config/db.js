const mongoose=require('mongoose');

const connectDB=async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
    console.log("MongoDB connected successfully");

    })
    .catch((error)=>{
      console.log("error: ",error)
    })
  } catch (error) {
    console.error("MongoDB is not connected because of ",error)
  }
}

module.exports = connectDB;
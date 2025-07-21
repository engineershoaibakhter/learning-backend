const Todo=require('../models/Todo');
const connectDB = require("../config/db");

const createTodo=async (req,res)=>{
  try {
    // Ensure database connection for serverless
    await connectDB();
    
    console.log("req.shoaib: ",req.shoaib)
    const todo=await Todo.create({
      ...req.body,
      user:req.user._id
    })

    res.status(201).json(todo)
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({ message: "Server error during todo creation" });
  }
}

const getTodos=async (req,res)=>{
  try {
    // Ensure database connection for serverless
    await connectDB();
    
    const todos=await Todo.find({user:req.user._id})
    res.status(200).json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "Server error during fetching todos" });
  }
}

const updateTodo=async (req,res)=>{
  try {
    // Ensure database connection for serverless
    await connectDB();
    
    console.log("req: ",req.params)
    console.log("req: ",req.user)
    const todo=await Todo.findOneAndUpdate(
      {_id:req.params.id,user:req.user._id},
      req.body,
      {new:true}
    );
    res.status(200).json(todo)
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ message: "Server error during todo update" });
  }
}

const deleteTodo=async (req,res)=>{
  try {
    // Ensure database connection for serverless
    await connectDB();
    
    if(req.user.role !== 'admin' && req.user.role !== 'sub-admin') {
      return res.status(403).json({message:'Not authorized'});
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'Todo Deleted'})
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ message: "Server error during todo deletion" });
  }
}

module.exports={createTodo,getTodos,updateTodo,deleteTodo}
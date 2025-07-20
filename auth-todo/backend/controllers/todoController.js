const Todo=require('../models/Todo');

const createTodo=async (req,res)=>{
  const todo=await Todo.create({
    ...req.body,
    user:req.user._id
  })

  res.status(201).json(todo)
}

const getTodos=async (req,res)=>{
  const todos=await Todo.find({user:req.user._id})
  res.status(200).json(todos);
}

const updateTodo=async (req,res)=>{
  const todo=await Todo.findOneAndUpdate(
    {_id:req.params.id,user:req.user._id},
    req.body,
    {new:true}
  );
  res.status(200).json(todo)
}

const deleteTodo=async (req,res)=>{
  if(req.user.role !=='admin') return res.status(403).json({message:'Not authorized'});

  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({message:'Todo Deleted'})
}

module.exports={createTodo,getTodos,updateTodo,deleteTodo}
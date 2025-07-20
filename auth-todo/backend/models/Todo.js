const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{
  timeStamps:true
}
)

module.exports=mongoose.model('Todo',todoSchema);
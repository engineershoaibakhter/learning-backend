const role=(requiredRole)=>(req,res,next)=>{
  if(!req.user){
    return res.status(403).json({message:"Forbidden: Insufficient role"});
  }
  next();
}

module.exports=role;
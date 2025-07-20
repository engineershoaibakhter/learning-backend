const jwt=require('jsonwebtoken');
const User=require('../models/User');

const protect=async (req,res,next)=>{
  try {
    let token=
    req.cookie.token 
    || req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:'Not authenticated'});

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log("decoded Token: ",decoded)
    req.user=await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports=protect;
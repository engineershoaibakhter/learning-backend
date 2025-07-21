const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require('crypto')
const sendEmail=require('../utils/sendEmail')
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(`name ${name} and email ${email} and password ${password} and role ${role} `)

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("user: ",user)
    const token = generateToken(user._id);
    console.log("token from register page: ",token)

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    res.status(200).json({ user,token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

const logout=(req,res)=>{
  res.clearCookie('token');
  res.status(200).json({message:"Logged out"})
}

const forgotPassword=async (req,res)=>{
  const {email}=req.body;
  try {
    const user=await User.findOne({email});
    console.log("user: ",user)
    if(!user) return res.status(400).json({message:"User not found"});

    const resetToken=crypto.randomBytes(32).toString('hex');
    console.log("resetToken: ",resetToken)

    user.resetToken=resetToken;
    user.resetTokenExpires=Date.now() + 15 * 60 *1000;
    await user.save();

    const resetUrl=`${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail(email,"Password Reset",`Reset here: ${resetUrl}`);

    res.json({message:"Reset Link sent to your email"})
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({message:"Server error occurred while sending reset email"})
  }
}

const resetPassword=async (req,res)=>{
  const {token,password}=req.body;
    //   let token=
    // req.cookie.token 
    // || req.headers.authorization?.split(" ")[1];

  console.log("token: ",token);

  try {
    const user=await User.findOne({
      resetToken:token,
      resetTokenExpires:{$gt:Date.now()},
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    const hashedPassword=await bcrypt.hash(password,10);
    user.password=hashedPassword;
    user.resetToken=undefined;
    user.resetTokenExpires=undefined;
    await user.save()
    
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error during password reset" });
  }

}


module.exports={register,login,logout,forgotPassword,resetPassword}
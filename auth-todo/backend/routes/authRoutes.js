const express=require('express');
const router=express.Router();
const {register,login,logout,resetPassword,forgotPassword}=require('../controllers/authController');

router.post('/register',register);
router.post('/login',login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get('/logout',logout);

module.exports=router;
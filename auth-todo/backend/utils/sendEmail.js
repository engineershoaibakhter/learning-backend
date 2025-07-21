const nodemailer=require('nodemailer');

const sendEmail=async (to,subject,text)=>{
  const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    }
  });

  await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to,
    subject,
    text
  })
}

module.exports=sendEmail;
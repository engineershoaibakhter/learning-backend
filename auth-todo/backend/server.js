const express=require('express');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const connectDB=require('./config/db');
const authRoute=require('./routes/authRoutes')
const todoRoute=require('./routes/todoRoutes')

dotenv.config();
connectDB();

const app=express();
const PORT=process.env.PORT || 5000

const corsOptions={
  origin:process.env.CLIENT_URL,
  credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Root route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Auth Todo API is running on Vercel!' });
});

app.use('/api/auth',authRoute);
app.use('/api/todos',todoRoute);

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
});
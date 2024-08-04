import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js';
import cors from 'cors';
import Path from 'path';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'https://zaki-chat-app-xc5g.vercel.app',
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);


// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname,"../frontend/build")));

// app.get("*", (req,res)=>{
//      res.sendFile(path.join(__dirname,"../frontend/build/index.html"));
// })






server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

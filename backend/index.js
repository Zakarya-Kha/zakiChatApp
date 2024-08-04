import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js';
import cors from 'cors';
import path from 'path';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'https://zaki-chat-app-xc5g.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes


// API routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

server.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
});

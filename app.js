import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js'
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use user routes
app.use('/api/user', userRoutes);

export default app;


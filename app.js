import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js'
import cors from 'cors';
import menuRoutes from './routes/MenuRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());



// Use user routes
app.use('/api/user', userRoutes);
app.use('/api/user/order', orderRoutes);
app.use('/api/admin',menuRoutes);

export default app;


import express from 'express';
import router from './routes/User-auth.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// User Routes
app.use('/api/auth', router);

// Testing connectivity
app.get('/', (req, res) => {
  res.send('Anas here');
});

// Export the app instance for server.js to use
export default app;

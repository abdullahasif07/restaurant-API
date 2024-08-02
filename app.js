// app.js
import express from 'express';
import UserAuth from './routes/User-auth.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

//user Routes
app.use('/api/auth', UserAuth);

////////////////////testing connectivity./////////////////
app.get('/',(req,res) =>{
    res.send('Anas here');
  })
////////////////////testing connectivity./////////////////


// Export the app instance for server.js to use
export default app;


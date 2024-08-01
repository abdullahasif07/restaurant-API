// app.js
import express from 'express';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Export the app instance for server.js to use
export default app;


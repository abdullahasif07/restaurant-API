// server.js
import app from './app.js'; // Import the configured app
import connectDB from './config/dbConfig.js'; // Import DB connection function

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




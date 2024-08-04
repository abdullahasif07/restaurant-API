import app from './app.js';
import connectDB from './config/dbConfig.js';

//const app = express();

// Enable CORS for all routes


connectDB();

//app.use(cors());

// app.post('/api/auth/login', (req, res) => {
//   // Handle login
//   res.json({ token: 'yourAuthToken' });
// });

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

import express from 'express';
import { createUser, loginUser, getUser } from '../controllers/userController.js';
import fetchUser from '../middleware/Fetchuser.js'
import { body } from 'express-validator';

const router = express.Router();

// Route for creating a user
router.post('/createuser', [
  body('email', 'Enter a valid Email').isEmail(),
  body('name', 'Name should be at least 5 characters').isLength({ min: 5 }),
  body('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
  body('role', 'Role must be either admin or customer').optional().isIn(['admin', 'customer']),
], createUser);

// Route for user login
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be empty').exists()
], loginUser);

// Route to get user details
router.get('/getuser', fetchUser, getUser);

export default router;

// controllers/userController.js

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'practice';

// Controller for creating a user
export const createUser = async (req, res) => {
    console.log("Received payload:", req.body); // Log the request payload

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("Email already exists");
            return res.status(400).json({ success: false, error: "Email already exists, enter a new one" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            name: req.body.name, // Make sure name is correctly used
            email: req.body.email,
            password: hash,
            role: req.body.role || 'customer',
        });

        await newUser.save();
        console.log("User saved successfully");

        const token = jwt.sign({ user: { id: newUser.id, role: newUser.role } }, JWT_SECRET);
        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};



// Controller for user login
// controllers/userController.js

export const loginUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success, errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ success, error: 'Incorrect credentials' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            const token = jwt.sign({ user: { id: user.id, role: user.role } }, JWT_SECRET);
            success = true;
            return res.status(200).json({ success, message: 'User authenticated successfully', token, role: user.role });
        } else {
            return res.status(401).json({ success, error: 'Incorrect credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success, error: 'Internal Server Error' });
    }
};


// Controller to get user details
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error during fetching user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

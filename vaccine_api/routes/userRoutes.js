const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST request - Register a person for a vaccine
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET request - Get all the registered people
router.get('/registrations', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Find user by phone number
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If successful, send back user data (excluding sensitive info)
        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                phoneNumber: user.phoneNumber,
                age: user.age,
                pincode: user.pincode,
                aadharNo: user.aadharNo
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;




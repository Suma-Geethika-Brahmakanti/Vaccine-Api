const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const User = require('../models/User'); // Import User model
const Slot = require('../models/Slot'); // Import Slot model

// Admin Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful', admin: { username: admin.username } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get total users with optional filters
router.get('/users', async (req, res) => {
    const { age, pincode, vaccineStatus } = req.query;

    let filter = {};

    if (age) filter.age = age;
    if (pincode) filter.pincode = pincode;
    if (vaccineStatus) filter.vaccineStatus = vaccineStatus;

    try {
        const users = await User.find(filter);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get slots registered on a given day
router.get('/slots', async (req, res) => {
    const { date, dose } = req.query;

    try {
        const selectedDate = new Date(date);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);

        let filter = { time: { $gte: selectedDate, $lt: nextDay } };

        if (dose) {
            filter.vaccineStatus = dose === 'first' ? 'First dose completed' : 'Fully vaccinated';
        }

        const slots = await Slot.find(filter).populate('userId');
        res.json(slots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
 
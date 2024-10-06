// routes/vaccineRoutes.js
const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const User = require('../models/User');

// View available time slots
router.get('/slots', async (req, res) => {
    try {
        const slots = await Slot.find({ isBooked: false });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register a slot for the vaccine
router.post('/register-slot', async (req, res) => {
    const { userId, slotId, dose } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already booked a slot for the same dose
        if (dose === 'first' && user.vaccineStatus === 'First dose completed') {
            return res.status(400).json({ message: 'You have already registered for the first dose.' });
        } else if (dose === 'second' && user.vaccineStatus === 'Fully vaccinated') {
            return res.status(400).json({ message: 'You have already registered for the second dose.' });
        }

        // Ensure that the user completes the first dose before registering for the second dose
        if (dose === 'second' && user.vaccineStatus !== 'First dose completed') {
            return res.status(400).json({ message: 'You must complete the first dose first.' });
        }

        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        // if (slot.isBooked) {
        //     return res.status(400).json({ message: 'This slot is already booked.' });
        // }
        // if (slot.remainingDoses <= 0) {
        //     return res.status(400).json({ message: 'No doses available in this slot.' });
        // }

        // Check if the slot is booked or has no remaining doses
        if (slot.isBooked || slot.remainingDoses <= 0) {
            return res.status(400).json({ message: 'No doses available in this slot.' });
        }

        // Book the slot for the user and decrease the remaining doses
        slot.remainingDoses -= 1;
        slot.userId = userId;

        // If no doses are left, mark the slot as fully booked
        if (slot.remainingDoses === 0) {
            slot.isBooked = true;
        }

        // slot.isBooked = true;
        // slot.userId = userId;
        user.vaccineStatus = dose === 'first' ? 'First dose completed' : 'Fully vaccinated';

        await slot.save();
        await user.save();

        res.json({ message: 'Slot registered successfully', user, slot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update/Change registered slot
router.put('/update-slot', async (req, res) => {
    const { userId, oldSlotId, newSlotId } = req.body;
    try {
        const oldSlot = await Slot.findById(oldSlotId);
        const newSlot = await Slot.findById(newSlotId);

        if (new Date(oldSlot.time) - new Date() < 24 * 60 * 60 * 1000) {
            return res.status(400).json({ message: 'Cannot change slot within 24 hours of the scheduled time.' });
        }

        oldSlot.isBooked = false;
        newSlot.isBooked = true;
        newSlot.userId = userId;

        await oldSlot.save();
        await newSlot.save();

        res.json({ message: 'Slot updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

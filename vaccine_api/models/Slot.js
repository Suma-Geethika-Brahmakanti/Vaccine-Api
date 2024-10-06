// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    time: { type: Date, required: true },
    remainingDoses: {
        type: Number,
        default: 10, // Start with 10 doses for each slot
    },
    isBooked: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Slot', slotSchema);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Slot = require('./models/Slot'); // Adjust the path based on your folder structure

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        return Slot.deleteMany({}); // Clear existing slots
    })
    .then(() => {
        const slots = [];
        const startDate = new Date('2024-11-01T10:00:00');
        const endDate = new Date('2024-11-30T17:00:00');
        const slotDuration = 30 * 60 * 1000; // 30 minutes in milliseconds


        // Generate slots for each day in the date range
        for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
            for (let hour = 10; hour < 17; hour++) { // From 10 AM to 5 PM
                for (let minute = 0; minute < 60; minute += 30) { // Every 30 minutes
                    const slotTime = new Date(day); 
                    slotTime.setHours(hour, minute, 0, 0);  // Ensure precise time setting

                    // Push slot with initialized remaining doses
                    slots.push({ time: slotTime, remainingDoses: 10 });
                }
            }
        }

        
        // // Generate slots for each day in the date range
        // for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
        //     for (let hour = 10; hour < 17; hour++) { // From 10 AM to 5 PM
        //         for (let minute = 0; minute < 60; minute += 30) { // Every 30 minutes
        //             const slotTime = new Date(day);
        //             slotTime.setHours(hour, minute, 0);
        //             // slots.push({ time: slotTime });
        //             slots.push({ time: slotTime, remainingDoses: 10 }); // Initialize with 10 doses
        //         }
        //     }
        // }

        // Insert the generated slots into the database
        return Slot.insertMany(slots);
    })
    .then(() => {
        console.log('Slots populated successfully');
        mongoose.disconnect(); // Close the connection
    })
    .catch(error => {
        console.error('Error populating slots:', error.message);
        mongoose.disconnect(); // Close the connection in case of error
    });

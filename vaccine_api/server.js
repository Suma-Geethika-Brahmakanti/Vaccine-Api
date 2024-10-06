// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();



// Initialize Express app
const app = express();

// Middleware to parse JSON data in request bodies
app.use(express.json());

// // Use the admin routes
// const adminRoutes = require('./routes/adminRoutes');
// app.use('/admin', adminRoutes);

// // Add error handling middleware (optional)
// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Route not found' });
// });

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });


// Define a basic route to test server
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const userRoutes = require('./routes/UserRoutes');

// Use the user routes for handling requests
app.use('/api/users', userRoutes);


const vaccineRoutes = require('./routes/vaccineRoutes');
app.use('/api/vaccines', vaccineRoutes);   // Vaccine routes (slots, register slot)

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);


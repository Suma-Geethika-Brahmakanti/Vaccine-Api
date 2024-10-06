const express = require('express');
const User = require('../models/User'); // Correctly import User model
const router = express.Router();

// POST request - Register a person for a vaccine
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body); // Use User instead of Vaccine
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET request - Get all registered people
router.get('/registrations', async (req, res) => {
    try {
        const users = await User.find(); // Use User instead of Vaccine
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




// const express = require('express');
// const Vaccine = require('../models/User');
// const router = express.Router();

// // POST request - Register a person for a vaccine
// router.post('/register', async (req, res) => {
//     try {
//         const newRegistration = new Vaccine(req.body);
//         const savedRegistration = await newRegistration.save();
//         res.status(201).json(savedRegistration);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // GET request - Get all registered people
// router.get('/registrations', async (req, res) => {
//     try {
//         const registrations = await Vaccine.find();
//         res.json(registrations);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // User Login
// // router.post('/login', async (req, res) => {
// //     const { phoneNumber, password } = req.body;
// //     try {
// //         const user = await User.findOne({ phoneNumber });
// //         if (!user || user.password !== password) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }
// //         res.json({ message: 'Login successful', user });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// router.post('/login', async (req, res) => {
//     try {
//       const { phoneNumber, password } = req.body;
  
//       // Find user by phone number
//       const user = await User.findOne({ phoneNumber });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Check if password matches
//       if (user.password !== password) {
//         return res.status(401).json({ message: 'Incorrect password' });
//       }
  
//       // If successful, send back user data (excluding sensitive info)
//       res.status(200).json({
//         message: 'Login successful',
//         user: {
//           name: user.name,
//           phoneNumber: user.phoneNumber,
//           age: user.age,
//           pincode: user.pincode,
//           aadharNo: user.aadharNo
//         }
//       });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

// module.exports = router;

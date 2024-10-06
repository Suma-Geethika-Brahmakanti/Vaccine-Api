const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,  // Ensures the phone number is unique
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be at least 18 years']
    },
    pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
    },
    aadharNo: {
        type: String,
        required: true,
        unique: true,  // Ensures Aadhar is unique
        match: [/^\d{4}-\d{4}-\d{4}$/, 'Please enter a valid Aadhar number in XXXX-XXXX-XXXX format']
    },
    password: {
        type: String,
        required: true
    }
    // vaccineType: {
    //     type: String,
    //     required: true
    // },
    // registrationDate: {
    //     type: Date,
    //     default: Date.now
    // },
    // vaccinated: {
    //     type: Boolean,
    //     default: false  // Can track vaccination status (true/false)
    // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// Define schema for Vaccine registration
// const vaccineSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     age: {
//         type: Number,
//         required: true,
//     },
//     vaccineType: {
//         type: String,
//         required: true,
//     },
//     registrationDate: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('Vaccine', vaccineSchema);

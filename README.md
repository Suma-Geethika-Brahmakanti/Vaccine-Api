# Vaccine Registration API

This project is a backend service for a vaccine registration application developed using **Node.js** and **MongoDB**. The API allows users to register for vaccination slots, manage their appointments, and allows administrators to manage the system.

## Features

### User Functionality
- **User Registration**: Register users with details like name, phone number, age, Aadhar number, and password.
- **User Login**: Users can log in using their phone number and password.
- **View Available Slots**: Fetch available vaccination slots that have not yet been fully booked.
- **Slot Registration**: Register for a vaccination slot (first or second dose).
- **Update Slot**: Change a previously booked slot (subject to conditions like time constraints).

### Admin Functionality
- **Admin Login**: Admins log in using pre-created credentials (no registration API for admins).
- **View and Filter Users**: Admins can view the list of registered users and filter them by age, pincode, and vaccination status (none, first dose completed, fully vaccinated).
- **View Registered Slots**: Admins can check registered slots for both the first and second doses, and get an overview of total registrations.

## Technologies Used
- **Node.js**: Backend framework.
- **Express.js**: Used to build APIs.
- **MongoDB**: Database to store user data and vaccination slots.
- **Mongoose**: MongoDB ODM for schema definitions and database operations.

## Installation

1. Clone the repository:
   
2. Install the dependencies:
   
3. Create a `.env` file for your environment variables (like MongoDB URI):
    ```env
    MONGO_URI=mongodb://localhost:27017/vaccine-registration
    PORT=3000
    ```

4. Start the server:
    
5. The API will be running on `http://localhost:3000`.

## API Endpoints

### User Endpoints
- `POST /api/users/register`: Register a new user.
- `GET /api/users/registrations`: Get all registered people.
- `POST /api/users/login`: Login as a user.
- `GET /api/vaccines/slots`: View available slots.
- `POST /api/vaccines/register-slot`: Register for a vaccination slot.
- `PUT /api/vaccines/update-slot`: Change the previously booked slot.

### Admin Endpoints
- `POST /admin/login`: Admin login.
- `GET /admin/users`: View and filter registered users.
- `GET /admin/slots`: View registered vaccination slots for the day.

## Models

### User Schema
- **name**: String (required)
- **phoneNumber**: String (required, unique, 10 digits)
- **age**: Number (required, must be 18+)
- **pincode**: String (required, 6 digits)
- **aadharNo**: String (required, unique, formatted as XXXX-XXXX-XXXX)
- **password**: String (required)
- **vaccineStatus**: String (none, first dose completed, fully vaccinated)

### Slot Schema
- **time**: Date (required)
- **remainingDoses**: Number (default: 10)
- **isBooked**: Boolean (default: false)
- **userId**: Reference to User (if booked)


Atlas mongodb credentials: 
- username: sumageethikabrahmakanti
- password: 1mkkJYmbC56vqEtH


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    failedLoginAttempts: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    unlockToken: { type: String, default: null }, // Random number token
    profileImage: { type: String, default: null } // Path to uploaded image
});

module.exports = mongoose.model('User', UserSchema);

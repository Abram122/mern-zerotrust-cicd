const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const { fullName, email, password } = req.body;
    
    const profileFields = {};
    if (fullName) profileFields.fullName = fullName;
    if (email) profileFields.email = email;
    
    try {
        if (password) {
            const salt = await bcrypt.genSalt(10);
            profileFields.password = await bcrypt.hash(password, salt);
        }

        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'Please upload a file' });
    }

    try {
        const imagePath = '/uploads/' + req.file.filename;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: imagePath },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

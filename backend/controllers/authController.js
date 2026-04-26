const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const { fullName, address, country, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ fullName, address, country, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const { email, password, unlockToken } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        if (user.isBlocked) {
            return res.status(403).json({ msg: 'You are blocked, contact the administrative support', isBlocked: true });
        }

        // Check if unlocking
        if (user.unlockToken) {
            if (!unlockToken) {
                return res.status(400).json({ msg: 'Please enter the unlock code sent to your email', requireUnlockToken: true });
            }
            if (unlockToken !== user.unlockToken) {
                user.isBlocked = true;
                user.unlockToken = null;
                await user.save();
                return res.status(403).json({ msg: 'You are blocked, contact the administrative support', isBlocked: true });
            }
            // Unlock successful
            user.failedLoginAttempts = 0;
            user.unlockToken = null;
            await user.save();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            user.failedLoginAttempts += 1;
            
            if (user.failedLoginAttempts === 3) {
                const randomToken = Math.floor(100000 + Math.random() * 900000).toString();
                user.unlockToken = randomToken;
                await user.save();

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Security Alert: Account Locked',
                    text: `You have had 3 failed login attempts. Please enter this code on your next login to unlock your account: ${randomToken}`
                };
                
                try {
                    await transporter.sendMail(mailOptions);
                    console.log(`Email sent with token ${randomToken} to ${user.email}`);
                } catch (emailErr) {
                    console.error('Error sending email:', emailErr);
                }

                return res.status(403).json({ msg: 'Account locked due to 3 failed attempts. An email with an unlock code has been sent.', requireUnlockToken: true });
            } else if (user.failedLoginAttempts > 3) {
                 user.isBlocked = true;
                 await user.save();
                 return res.status(403).json({ msg: 'You are blocked, contact the administrative support', isBlocked: true });
            }
            
            await user.save();
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        user.failedLoginAttempts = 0;
        user.unlockToken = null;
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, fullName: user.fullName, email: user.email } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

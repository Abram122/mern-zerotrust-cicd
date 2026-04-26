const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a user
router.post('/register', [
    check('fullName', 'Full name is required and must be at least 2 characters').trim().isLength({ min: 2 }),
    check('address', 'Address is required').trim().not().isEmpty(),
    check('country', 'Country is required').trim().not().isEmpty(),
    check('email', 'Please include a valid email address with a domain (e.g. @gmail.com)').isEmail().matches(/\.[a-zA-Z]{2,}$/).normalizeEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], authController.registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', [
    check('email', 'Please include a valid email address with a domain (e.g. @gmail.com)').isEmail().matches(/\.[a-zA-Z]{2,}$/).normalizeEmail(),
    check('password', 'Password is required').exists()
], authController.loginUser);

module.exports = router;

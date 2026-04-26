const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, req.user.id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG format is allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

// @route   GET api/user/profile
// @desc    Get user profile
router.get('/profile', auth, userController.getProfile);

// @route   PUT api/user/profile
// @desc    Update user profile
router.put('/profile', [
    auth,
    [
        check('fullName', 'Full name must be at least 2 characters').optional().trim().isLength({ min: 2 }),
        check('email', 'Please include a valid email address with a domain (e.g. @gmail.com)').optional().isEmail().matches(/\.[a-zA-Z]{2,}$/).normalizeEmail(),
        check('password', 'Please enter a password with 6 or more characters').optional({ checkFalsy: true }).isLength({ min: 6 })
    ]
], userController.updateProfile);

// @route   POST api/user/profile/image
// @desc    Upload profile image
router.post('/profile/image', auth, (req, res, next) => {
    const uploadSingle = upload.single('profileImage');
    uploadSingle(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: err.message });
        } else if (err) {
            return res.status(400).json({ msg: err.message });
        }
        next();
    });
}, userController.uploadImage);

module.exports = router;

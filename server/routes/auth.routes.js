const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/update-profile', authController.protect, authController.updateProfile);
router.get('/me', authController.protect, authController.getMe);

module.exports = router; 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');

// Login route
router.post('/login', authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // TODO: Add your user validation logic here
        // For development purposes, we'll accept any email/password
        const user = {
            id: '123',
            email: email,
            role: 'user'
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({
            status: 'success',
            token,
            user
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        res.json({
            status: 'success',
            data: {
                user: req.user
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Verify token
router.post('/verify-token', authLimiter, auth, async (req, res) => {
    res.json({
        status: 'success',
        message: 'Token is valid',
        user: req.user
    });
});

module.exports = router;
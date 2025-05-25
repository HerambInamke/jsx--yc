const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');

// Protect all routes after this middleware
router.use(protect);

// Current user routes
router.get('/me', authController.getMe);
router.patch('/updateMe', authController.updateProfile);
router.patch('/updateMyPassword', authController.updatePassword);

// Admin only routes
router.use(restrictTo('admin'));
router.route('/')
    .get(authController.getAllUsers);

router.route('/:id')
    .get(authController.getUser)
    .patch(authController.updateUser)
    .delete(authController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package.controller');
const { protect, restrictTo } = require('../middleware/auth');

// Public
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackage);

// Protected/Admin
router.post('/', protect, restrictTo('admin'), packageController.createPackage);
router.patch('/:id', protect, restrictTo('admin'), packageController.updatePackage);
router.delete('/:id', protect, restrictTo('admin'), packageController.deletePackage);

module.exports = router; 
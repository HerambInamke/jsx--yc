const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage,
    checkAvailability
} = require('../controllers/packageController');

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackage);
router.post('/check-availability', checkAvailability);

// Protected routes
router.post('/', auth, createPackage);
router.put('/:id', auth, updatePackage);
router.delete('/:id', auth, deletePackage);

module.exports = router;
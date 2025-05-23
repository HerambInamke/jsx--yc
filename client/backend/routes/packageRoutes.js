const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { protect, restrictTo } = require('../middleware/auth');

router
    .route('/')
    .get(packageController.getAllPackages)
    .post(protect, restrictTo('admin'), packageController.createPackage);

router
    .route('/:id')
    .get(packageController.getPackage)
    .patch(protect, restrictTo('admin'), packageController.updatePackage)
    .delete(protect, restrictTo('admin'), packageController.deletePackage);

router.get('/search/date-range', packageController.getPackagesByDateRange);
router.get('/search/price-range', packageController.getPackagesByPriceRange);
router.get('/featured', packageController.getFeaturedPackages);
router.get('/availability/:id', packageController.checkPackageAvailability);

module.exports = router;

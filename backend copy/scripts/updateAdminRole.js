const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');

const updateAdminRole = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to database');

        const admin = await User.findOneAndUpdate(
            { email: 'admin@example.com' },
            { role: 'admin' },
            { new: true }
        );

        console.log('Admin user updated:', admin);
        process.exit(0);
    } catch (error) {
        console.error('Error updating admin:', error);
        process.exit(1);
    }
};

updateAdminRole();

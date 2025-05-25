const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to database');

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            phoneNumber: '9999999999',
            role: 'admin'
        });

        console.log('Admin user created:', admin);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();

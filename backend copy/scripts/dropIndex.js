const mongoose = require('mongoose');
const config = require('../config/config');

const dropIndex = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to database');

        const db = mongoose.connection;
        await db.collection('users').dropIndex('username_1');
        console.log('Successfully dropped username index');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

dropIndex();

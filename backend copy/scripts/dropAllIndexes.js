const mongoose = require('mongoose');
const config = require('../config/config');

const dropAllIndexes = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to database');

        const db = mongoose.connection;
        await db.collection('users').dropIndexes();
        console.log('Successfully dropped all indexes from users collection');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

dropAllIndexes();

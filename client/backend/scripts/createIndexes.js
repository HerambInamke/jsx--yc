const mongoose = require('mongoose');
const config = require('../config/config');

const createIndexes = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to database');

        const db = mongoose.connection;
        await db.collection('users').createIndex(
            { email: 1 }, 
            { unique: true, background: true }
        );
        console.log('Successfully created email index');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createIndexes();

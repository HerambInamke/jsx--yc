const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB using the same connection string as the server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function createAdmin() {
  try {
    console.log('🔧 Creating admin user...');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@yc.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   ID: ${existingAdmin._id}`);
      console.log(`   Name: ${existingAdmin.name}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      
      // Update role to admin if not already admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Updated existing user to admin role');
      }
      
      return;
    }
    
    // Create new admin user
    const adminUser = await User.create({
      name: 'YC_ADMIN',
      email: 'admin@yc.com',
      password: 'admin123', // You can change this password
      phoneNumber: '9999999999',
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log(`   ID: ${adminUser._id}`);
    console.log(`   Name: ${adminUser.name}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log('\n🔑 Login Credentials:');
    console.log(`   Email: admin@yc.com`);
    console.log(`   Password: admin123`);
    console.log('\n📝 Use these credentials to login and get JWT token for admin endpoints');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin(); 
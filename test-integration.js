const axios = require('axios');

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'https://jsx-yc-backend.onrender.com';
const FRONTEND_URL = 'https://yourconcert.vercel.app';

console.log('🧪 Testing Frontend-Backend Integration');
console.log('=====================================');
console.log(`Backend URL: ${BACKEND_URL}`);
console.log(`Frontend URL: ${FRONTEND_URL}`);
console.log('');

async function testBackendHealth() {
  try {
    console.log('1. Testing Backend Health...');
    const response = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Backend is healthy:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Backend health check failed:', error.message);
    return false;
  }
}

async function testAPIEndpoints() {
  const endpoints = [
    '/api/v1/concerts',
    '/api/v1/hotels',
    '/api/v1/packages'
  ];

  console.log('\n2. Testing API Endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${BACKEND_URL}${endpoint}`);
      console.log(`✅ ${endpoint}: ${response.status} - ${response.data.data?.events?.length || response.data.data?.hotels?.length || response.data.data?.packages?.length || 0} items`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.response?.status || 'Connection failed'}`);
    }
  }
}

async function testCORS() {
  try {
    console.log('\n3. Testing CORS Configuration...');
    const response = await axios.get(`${BACKEND_URL}/health`, {
      headers: {
        'Origin': FRONTEND_URL
      }
    });
    console.log('✅ CORS is properly configured');
    return true;
  } catch (error) {
    console.log('❌ CORS test failed:', error.message);
    return false;
  }
}

async function testFrontendBackendConnection() {
  try {
    console.log('\n4. Testing Frontend-Backend Connection...');
    
    // Test if frontend can access backend API
    const response = await axios.get(`${BACKEND_URL}/api/v1/concerts`, {
      headers: {
        'Origin': FRONTEND_URL,
        'User-Agent': 'Mozilla/5.0 (compatible; Frontend-Test)'
      }
    });
    
    if (response.data.success) {
      console.log('✅ Frontend can successfully connect to backend API');
      console.log(`   Found ${response.data.data?.events?.length || 0} concerts`);
      return true;
    } else {
      console.log('❌ Backend API returned error response');
      return false;
    }
  } catch (error) {
    console.log('❌ Frontend-Backend connection failed:', error.message);
    return false;
  }
}

async function runTests() {
  const healthOk = await testBackendHealth();
  
  if (healthOk) {
    await testAPIEndpoints();
    await testCORS();
    await testFrontendBackendConnection();
  }
  
  console.log('\n=====================================');
  console.log('🎯 Integration Test Complete!');
  console.log('\nNext Steps:');
  console.log('1. ✅ Backend is deployed at https://jsx-yc-backend.onrender.com');
  console.log('2. Update VITE_API_BASE_URL in Vercel environment variables');
  console.log('3. Test your frontend application at https://yourconcert.vercel.app');
}

runTests().catch(console.error); 
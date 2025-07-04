# Frontend-Backend Integration Guide

## Overview
This guide will help you integrate your frontend (deployed on Vercel) with your backend server.

## Current Setup
- **Frontend**: https://yourconcert.vercel.app/ (Vercel)
- **Backend**: Currently localhost:3000 (needs deployment)

## Step 1: Deploy Backend

### Option A: Deploy to Railway (Recommended)
1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Create a new project
4. Connect your GitHub repository
5. Set the following environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
6. Deploy the project

### Option B: Deploy to Render
1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub
3. Create a new Web Service
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables as above

## Step 2: Update Frontend Environment Variables

Once your backend is deployed, you'll get a URL like:
- Railway: `https://your-app-name.railway.app`
- Render: `https://your-app-name.onrender.com`

### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api/v1
   ```

### For Local Development:
Create a `.env` file in the `client` directory:
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Step 3: Test the Integration

1. Test the health endpoint: `https://your-backend-url.com/health`
2. Test API endpoints: `https://your-backend-url.com/api/v1/concerts`
3. Check frontend functionality

## Step 4: Update CORS (if needed)

If you encounter CORS issues, update the `corsOptions` in `server/server.js` to include your frontend URL.

## Environment Variables Required

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
```

### Frontend (.env)
```
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure your frontend URL is in the CORS origins list
2. **MongoDB Connection**: Verify your MongoDB URI is correct
3. **Environment Variables**: Make sure all required variables are set
4. **Port Issues**: Ensure the PORT environment variable is set correctly

### Testing Commands:
```bash
# Test backend health
curl https://your-backend-url.com/health

# Test API endpoint
curl https://your-backend-url.com/api/v1/concerts
```

## Security Notes
- Never commit `.env` files to version control
- Use strong JWT secrets
- Enable HTTPS in production
- Regularly update dependencies 
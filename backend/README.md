# Your Concert Backend

Backend server for the Your Concert application, handling concerts, hotels, bookings, and payments.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env`
- Fill in your configuration values

3. Firebase Setup:
- Create a Firebase project
- Download your service account key
- Place it in `config/firebase-service-account.json`

4. MongoDB Setup:
- Install MongoDB locally or use MongoDB Atlas
- Update the MONGODB_URI in your .env file

5. Stripe Setup:
- Create a Stripe account
- Get your API keys from the Stripe Dashboard
- Update the Stripe configuration in your .env file

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Concerts
- GET /api/concerts - List all concerts
- GET /api/concerts/:id - Get concert details
- POST /api/concerts/check-availability - Check ticket availability
- POST /api/concerts - Create concert (protected)
- PUT /api/concerts/:id - Update concert (protected)
- DELETE /api/concerts/:id - Delete concert (protected)

### Hotels
- GET /api/hotels - List all hotels
- GET /api/hotels/:id - Get hotel details
- POST /api/hotels/check-availability - Check room availability
- POST /api/hotels - Create hotel (protected)
- PUT /api/hotels/:id - Update hotel (protected)

### Bookings
- POST /api/bookings - Create booking (protected)
- GET /api/bookings/user/:userId - Get user's bookings (protected)
- GET /api/bookings/:id - Get booking details (protected)
- PUT /api/bookings/:id/status - Update booking status (protected)
- PUT /api/bookings/:id/cancel - Cancel booking (protected)

### Payments
- POST /api/payments/create-payment-intent - Create payment intent (protected)
- POST /api/payments/:bookingId/refund - Process refund (protected)
- POST /api/payments/webhook - Handle Stripe webhooks

## Authentication

The API uses Firebase Authentication. Include the Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase_id_token>
```
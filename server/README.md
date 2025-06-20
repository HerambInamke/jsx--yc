# Server API Documentation

## Base URL

    http://localhost:3000/api/v1

---

## Example IDs

> **Note:** These are actual MongoDB ObjectIds from your database for testing. These IDs are valid and can be used for testing the API endpoints.

- **User ID:** `68307376239f07107f386bfb` (John Smith)
- **Hotel IDs:** 
  - `683076d7abdd2c206fb0755c` (Grand Luxury Hotel)
  - `683076d7abdd2c206fb0755f` (Business Elite Hotel)
  - `68307eacd471dcd356388bee` (Taj Palace Hotel)
  - `68307fd1d471dcd356388bf7` (Taj Lands End)
  - `6832f4fbf9995e21d3a62a51` (Grand Plaza)
- **Concert/Event IDs:**
  - `68558db4e4a89ffa2da014a3` (Coldplay Music of the Spheres World Tour)
  - `68558db4e4a89ffa2da014a7` (Summer Music Festival 2025)
  - `68558db4e4a89ffa2da014ab` (Rock Weekend Extravaganza)
  - `68558db4e4a89ffa2da014af` (Ed Sheeran Live in Mumbai)
- **Package IDs:**
  - `683076d7abdd2c206fb0756e` (Rock Weekend Package)
  - `683076d7abdd2c206fb0756d` (Summer Festival Luxury Package)
  - `6830800dd471dcd356388c02` (Coldplay VIP Experience)
  - `6832f519f9995e21d3a62a64` (Premium Experience)
- **Booking ID:** `664a1b2c3d4e5f6789012349` (No bookings created yet - use this for testing "not found")

---

## Seeded Dummy Concert Data

The following concerts have been seeded into the database for testing. All package entries now reference these real concerts.

| Concert Name                          | Artist            | Concert ID                       |
|---------------------------------------|-------------------|----------------------------------|
| Coldplay Music of the Spheres World Tour | Coldplay        | 68558db4e4a89ffa2da014a3         |
| Summer Music Festival 2025            | Various Artists   | 68558db4e4a89ffa2da014a7         |
| Rock Weekend Extravaganza             | Multiple Rock Bands | 68558db4e4a89ffa2da014ab      |
| Ed Sheeran Live in Mumbai             | Ed Sheeran        | 68558db4e4a89ffa2da014af         |

> **Note:** All packages in the database now reference these real concerts, so you can test package and booking endpoints with valid concert references.

---

## JWT Token for Testing

> **Note:** This token is from a test user login. It will expire and you should replace it with your own token from login.

**Current Test Token:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs
```

---

## Admin Credentials

**Admin Login Credentials:**
- **Email:** `admin@yc.com`
- **Password:** `admin123`
- **Admin ID:** `68558fb685a3923d46982b3f`

**Admin JWT Token:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw
```

> **Note:** Use this admin token for all admin-protected endpoints (creating/updating/deleting concerts, hotels, packages, and managing bookings).

---

## Authentication Endpoints

- **Register**
  - `POST http://localhost:3000/api/v1/auth/register`
  - Register a new user
- **Login**
  - `POST http://localhost:3000/api/v1/auth/login`
  - Login and receive JWT
- **Get My Profile**
  - `GET http://localhost:3000/api/v1/auth/me`
  - Get current user's profile (requires JWT)
- **Update Profile**
  - `PATCH http://localhost:3000/api/v1/auth/update-profile`
  - Update name, phone, addresses, or profile picture (requires JWT)

---

## Hotel Endpoints

- **Get All Hotels**
  - `GET http://localhost:3000/api/v1/hotels`
- **Get Single Hotel**
  - `GET http://localhost:3000/api/v1/hotels/683076d7abdd2c206fb0755c`
- **Create Hotel** (Admin only)
  - `POST http://localhost:3000/api/v1/hotels`
- **Update Hotel** (Admin only)
  - `PATCH http://localhost:3000/api/v1/hotels/683076d7abdd2c206fb0755c`
- **Delete Hotel** (Admin only)
  - `DELETE http://localhost:3000/api/v1/hotels/683076d7abdd2c206fb0755c`

---

## Concert (Event) Endpoints

- **Get All Concerts**
  - `GET http://localhost:3000/api/v1/concerts`
- **Get Single Concert**
  - `GET http://localhost:3000/api/v1/concerts/68558db4e4a89ffa2da014a3`
- **Search Concerts**
  - `GET http://localhost:3000/api/v1/concerts/search?keyword=music`
- **Create Concert** (Admin only)
  - `POST http://localhost:3000/api/v1/concerts`
- **Update Concert** (Admin only)
  - `PATCH http://localhost:3000/api/v1/concerts/68558db4e4a89ffa2da014a3`
- **Delete Concert** (Admin only)
  - `DELETE http://localhost:3000/api/v1/concerts/68558db4e4a89ffa2da014a3`

---

## Package Endpoints

- **Get All Packages**
  - `GET http://localhost:3000/api/v1/packages`
- **Get Single Package**
  - `GET http://localhost:3000/api/v1/packages/683076d7abdd2c206fb0756e`
- **Create Package** (Admin only)
  - `POST http://localhost:3000/api/v1/packages`
- **Update Package** (Admin only)
  - `PATCH http://localhost:3000/api/v1/packages/683076d7abdd2c206fb0756e`
- **Delete Package** (Admin only)
  - `DELETE http://localhost:3000/api/v1/packages/683076d7abdd2c206fb0756e`

---

## Booking Endpoints

- **Create Booking (Package)**
  - `POST http://localhost:3000/api/v1/bookings`
  - Body:
```json
{
  "packageId": "683076d7abdd2c206fb0756e",
  "startDate": "2025-06-14T12:00:00.000Z",
  "endDate": "2025-06-16T12:00:00.000Z",
  "numberOfPeople": 2,
  "paymentInfo": { "method": "credit_card" },
  "specialRequests": "Early check-in requested"
}
```
- **Create Booking (Event)**
  - `POST http://localhost:3000/api/v1/bookings`
  - Body:
```json
{
  "eventId": "68558db4e4a89ffa2da014a3",
  "tickets": [
    { "ticketType": "VIP", "quantity": 2 }
  ],
  "paymentInfo": { "method": "credit_card" },
  "specialRequests": "Front row seats"
}
```
- **Get My Bookings**
  - `GET http://localhost:3000/api/v1/bookings/my-bookings`
- **Get Single Booking**
  - `GET http://localhost:3000/api/v1/bookings/booking/664a1b2c3d4e5f6789012349`
- **Cancel Booking**
  - `PATCH http://localhost:3000/api/v1/bookings/cancel/664a1b2c3d4e5f6789012349`
  - Body:
```json
{
  "reason": "Change of plans"
}
```

---

## Admin Booking Endpoints

- **Get All Bookings**
  - `GET http://localhost:3000/api/v1/bookings/all`
- **Update Booking Status**
  - `PATCH http://localhost:3000/api/v1/bookings/update-status/664a1b2c3d4e5f6789012349`
  - Body:
```json
{
  "status": "confirmed"
}
```
- **Get Booking Statistics**
  - `GET http://localhost:3000/api/v1/bookings/stats`

---

## Notes
- All endpoints (except register/login) require a JWT in the `Authorization: Bearer <your_jwt_token>` header.
- Admin endpoints require the user to have the `admin` role.
- All dates are in ISO format.
- The hotel, package, and concert IDs above are real and can be used for testing.
- Booking IDs are placeholders since no bookings exist yet.

---

## cURL API Testing

You can use cURL to test these endpoints. Here are example commands using the above IDs and the current test token:

### Authentication

#### Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "1234567890"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login Admin
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yc.com",
    "password": "admin123"
  }'
```

#### Get My Profile
```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Update Profile
```bash
curl -X PATCH http://localhost:3000/api/v1/auth/update-profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "phoneNumber": "9876543210",
    "addresses": [
      {
        "street": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001",
        "country": "India"
      }
    ]
  }'
```

### Hotels

#### Get All Hotels
```bash
curl -X GET http://localhost:3000/api/v1/hotels \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Get Single Hotel
```bash
curl -X GET http://localhost:3000/api/v1/hotels/683076d7abdd2c206fb0755c \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Create Hotel (Admin)
```bash
curl -X POST http://localhost:3000/api/v1/hotels \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grand Hotel",
    "description": "A luxury 5-star hotel in the heart of the city",
    "address": {
      "street": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India"
    },
    "location": {
      "type": "Point",
      "coordinates": [72.8208, 18.9256]
    },
    "rating": 4.5,
    "images": ["image_url_1", "image_url_2"],
    "amenities": ["WiFi", "Pool", "Spa", "Gym"],
    "rooms": [
      {
        "type": "Deluxe",
        "price": 5000,
        "capacity": 2,
        "amenities": ["King Bed", "Mini Bar", "Ocean View"]
      }
    ],
    "priceRange": {
      "min": 5000,
      "max": 8000
    },
    "contactInfo": {
      "phone": "+91-123-456-7890",
      "email": "contact@grandhotel.com",
      "website": "www.grandhotel.com"
    }
  }'
```

#### Update Hotel (Admin)
```bash
curl -X PATCH http://localhost:3000/api/v1/hotels/683076d7abdd2c206fb0755c \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4.8
  }'
```

#### Delete Hotel (Admin)
```bash
curl -X DELETE http://localhost:3000/api/v1/hotels/683076d7abdd2c206fb0755c \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw"
```

### Concerts

#### Get All Concerts
```bash
curl -X GET http://localhost:3000/api/v1/concerts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Get Single Concert
```bash
curl -X GET http://localhost:3000/api/v1/concerts/68558db4e4a89ffa2da014a3 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Search Concerts
```bash
curl -X GET "http://localhost:3000/api/v1/concerts/search?keyword=music" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Create Concert (Admin)
```bash
curl -X POST http://localhost:3000/api/v1/concerts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Concert Name",
    "artist": "Artist Name",
    "description": "Concert description...",
    "date": "2025-12-31T19:00:00.000Z",
    "time": "19:00",
    "venue": {
      "name": "Venue Name",
      "location": "Venue Location",
      "capacity": 10000
    },
    "image": "https://example.com/concert.jpg",
    "categories": ["concert"],
    "ticketTypes": [
      { "name": "General", "price": 2000, "quantity": 5000 },
      { "name": "VIP", "price": 5000, "quantity": 1000 }
    ]
  }'
```

#### Update Concert (Admin)
```bash
curl -X PATCH http://localhost:3000/api/v1/concerts/68558db4e4a89ffa2da014a3 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

#### Delete Concert (Admin)
```bash
curl -X DELETE http://localhost:3000/api/v1/concerts/68558db4e4a89ffa2da014a3 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw"
```

### Packages

#### Get All Packages
```bash
curl -X GET http://localhost:3000/api/v1/packages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Get Single Package
```bash
curl -X GET http://localhost:3000/api/v1/packages/683076d7abdd2c206fb0756e \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Create Package (Admin)
```bash
curl -X POST http://localhost:3000/api/v1/packages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Festival Luxury Package",
    "description": "Experience the Summer Music Festival with luxury stay",
    "concert": "68558db4e4a89ffa2da014a7",
    "hotel": "683076d7abdd2c206fb0755c",
    "duration": 3,
    "price": 25000,
    "inclusions": [
      "VIP Concert Tickets",
      "3 Nights Luxury Hotel Stay"
    ],
    "maxParticipants": 50,
    "availableSpots": 50,
    "startDate": "2025-06-14T12:00:00.000Z",
    "endDate": "2025-06-17T12:00:00.000Z",
    "highlights": [
      "VIP Concert Experience",
      "Luxury Hotel Accommodation"
    ],
    "terms": [
      "Non-refundable",
      "Valid ID required"
    ],
    "status": "active"
  }'
```

### Bookings

#### Create Booking (Package)
```bash
curl -X POST http://localhost:3000/api/v1/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "683076d7abdd2c206fb0756e",
    "startDate": "2025-06-14T12:00:00.000Z",
    "endDate": "2025-06-16T12:00:00.000Z",
    "numberOfPeople": 2,
    "paymentInfo": { "method": "credit_card" },
    "specialRequests": "Early check-in requested"
  }'
```

#### Create Booking (Event)
```bash
curl -X POST http://localhost:3000/api/v1/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "68558db4e4a89ffa2da014a3",
    "tickets": [
      { "ticketType": "VIP", "quantity": 2 }
    ],
    "paymentInfo": { "method": "credit_card" },
    "specialRequests": "Front row seats"
  }'
```

#### Get My Bookings
```bash
curl -X GET http://localhost:3000/api/v1/bookings/my-bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Get Single Booking
```bash
curl -X GET http://localhost:3000/api/v1/bookings/booking/664a1b2c3d4e5f6789012349 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
```

#### Cancel Booking
```bash
curl -X PATCH http://localhost:3000/api/v1/bookings/cancel/664a1b2c3d4e5f6789012349 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Change of plans"
  }'
```

### Admin Endpoints

#### Get All Bookings (Admin)
```bash
curl -X GET http://localhost:3000/api/v1/bookings/all \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw"
```

#### Update Booking Status (Admin)
```bash
curl -X PATCH http://localhost:3000/api/v1/bookings/update-status/664a1b2c3d4e5f6789012349 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

#### Get Booking Statistics (Admin)
```bash
curl -X GET http://localhost:3000/api/v1/bookings/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTU4ZmI2ODVhMzkyM2Q0Njk4MmIzZiIsImlhdCI6MTc1MDQzODE1OCwiZXhwIjoxNzUxMDQyOTU4fQ.pySoITyDm8CLZhMCwvgOjJZLDR0Ti0fm4_y-oK-3sHw"
```

---

## Tips for cURL Testing

1. **Current Test Token** is already included in the examples above
2. **Admin JWT Token** is included in all admin endpoint examples
3. **Use the real IDs above** for testing specific resources (hotels, packages, and concerts)
4. **Use `-v` flag** for verbose output to see request/response details:
   ```bash
   curl -v -X GET http://localhost:3000/api/v1/hotels
   ```
5. **Save JWT token to a variable** for easier testing:
   ```bash
   TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzA3Mzc2MjM5ZjA3MTA3ZjM4NmJmYiIsImlhdCI6MTc1MDQzNjM2OSwiZXhwIjoxNzUxMDQxMTY5fQ.qOrR9yBIGTwj4noip07tD16GQot5GwZoN5EmMg9qhNs"
   curl -X GET http://localhost:3000/api/v1/hotels \
     -H "Authorization: Bearer $TOKEN"
   ``` 
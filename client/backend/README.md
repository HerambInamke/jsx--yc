# Client Backend API Documentation

## API Endpoints with Full URLs

## Authentication Endpoints

### Base URL: `http://localhost:5000/api/v1`

All endpoints below should be prefixed with the base URL.

### Register User
```http
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "1234567890"
}
```

### Login User
```http
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

### Update Profile
```http
PATCH http://localhost:5000/api/v1/auth/update-profile
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
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
}
```

## Hotel Endpoints

### Get All Hotels
```http
GET http://localhost:5000/api/v1/hotels
Authorization: Bearer <your_jwt_token>
```

### Get Single Hotel
```http
GET http://localhost:5000/api/v1/hotels/:id
Authorization: Bearer <your_jwt_token>
```

### Create Hotel (Admin Only)
```http
POST http://localhost:5000/api/v1/hotels
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
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
        "coordinates": [72.8208, 18.9256]  // [longitude, latitude]
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
        },
        {
            "type": "Suite",
            "price": 8000,
            "capacity": 4,
            "amenities": ["King Bed", "Living Room", "Kitchen", "City View"]
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
}
```

## Concert Endpoints

### Get All Concerts
```http
GET http://localhost:5000/api/v1/concerts
Authorization: Bearer <your_jwt_token>
```

### Get Single Concert
```http
GET http://localhost:5000/api/v1/concerts/:id
Authorization: Bearer <your_jwt_token>
```

### Create Concert (Admin Only)
```http
POST http://localhost:5000/api/v1/concerts
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "title": "Summer Music Festival 2025",
    "artist": "Various Artists",
    "description": "The biggest music festival featuring top international artists",
    "date": "2025-06-15T18:00:00.000Z",
    "venue": {
        "name": "DY Patil Stadium",
        "address": {
            "street": "Sector 7",
            "city": "Navi Mumbai",
            "state": "Maharashtra",
            "zipCode": "400614",
            "country": "India"
        },
        "capacity": 55000
    },
    "image": "https://example.com/concert1.jpg",
    "duration": "6 hours",
    "genre": ["Pop", "Rock", "Hip Hop"],
    "pricing": [
        {
            "category": "General",
            "price": 2000,
            "totalSeats": 35000,
            "remainingSeats": 35000
        },
        {
            "category": "VIP",
            "price": 5000,
            "totalSeats": 10000,
            "remainingSeats": 10000
        },
        {
            "category": "VVIP",
            "price": 10000,
            "totalSeats": 5000,
            "remainingSeats": 5000
        }
    ],
    "additionalInfo": {
        "ageRestriction": "16+",
        "doorOpeningTime": "16:00",
        "guidelines": [
            "No outside food and beverages",
            "Valid ID required",
            "No professional cameras"
        ]
    },
    "status": "upcoming",
    "featured": true
}
```

## Package Endpoints

### Get All Packages
```http
GET http://localhost:5000/api/v1/packages
Authorization: Bearer <your_jwt_token>
```

### Get Single Package
```http
GET http://localhost:5000/api/v1/packages/:id
Authorization: Bearer <your_jwt_token>
```

### Create Package (Admin Only)
```http
POST http://localhost:5000/api/v1/packages
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "name": "Summer Festival Luxury Package",
    "description": "Experience the Summer Music Festival with luxury stay",
    "concert": "concert_id",  // MongoDB ObjectId of the concert
    "hotel": "hotel_id",      // MongoDB ObjectId of the hotel
    "duration": 3,
    "price": 25000,
    "inclusions": [
        "VIP Concert Tickets",
        "3 Nights Luxury Hotel Stay",
        "Breakfast and Dinner",
        "Airport Transfer",
        "Backstage Pass"
    ],
    "maxParticipants": 50,
    "availableSpots": 50,
    "startDate": "2025-06-14T12:00:00.000Z",
    "endDate": "2025-06-17T12:00:00.000Z",
    "highlights": [
        "VIP Concert Experience",
        "Luxury Hotel Accommodation",
        "Meet & Greet with Artists",
        "Exclusive After Party"
    ],
    "terms": [
        "Non-refundable",
        "Valid ID required",
        "Check-in time: 2 PM",
        "Check-out time: 11 AM"
    ],
    "status": "active"
}
```

## Booking Endpoints

### Create Booking
```http
POST http://localhost:5000/api/v1/bookings
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "packageId": "package_id",
    "startDate": "2025-06-14T12:00:00.000Z",
    "endDate": "2025-06-16T12:00:00.000Z",
    "numberOfPeople": 2,
    "paymentMethod": "credit_card",
    "specialRequests": "Early check-in requested"
}
```

### Get My Bookings
```http
GET http://localhost:5000/api/v1/bookings/my-bookings
Authorization: Bearer <your_jwt_token>
```

### Get Single Booking
```http
GET http://localhost:5000/api/v1/bookings/booking/:id
Authorization: Bearer <your_jwt_token>
```

### Cancel Booking
```http
PATCH http://localhost:5000/api/v1/bookings/cancel/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "reason": "Change of plans"
}
```

## Admin Only Endpoints

### Get All Bookings (Admin)
```http
GET http://localhost:5000/api/v1/bookings/all
Authorization: Bearer <your_jwt_token>
```

### Update Booking Status (Admin)
```http
PATCH http://localhost:5000/api/v1/bookings/update-status/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "status": "confirmed"
}
```

### Get Booking Statistics (Admin)
```http
GET http://localhost:5000/api/v1/bookings/stats
Authorization: Bearer <your_jwt_token>
```

## Important Notes

1. Replace `<your_jwt_token>` with the actual JWT token received after login
2. All dates are in ISO format
3. IDs (like `hotel_id`, `concert_id`, etc.) should be replaced with actual MongoDB ObjectIds
4. Admin endpoints require user role to be 'admin'
5. All requests except login and register require JWT token in Authorization header

## Error Responses

The API returns consistent error responses in the following format:

```json
{
    "status": "fail",
    "message": "Error message here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Example Responses

### Successful Registration Response
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
        "user": {
            "id": "6473eb1ec1234567890abcde",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "user",
            "profilePicture": "default.jpg"
        }
    }
}
```

### Successful Login Response
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
        "user": {
            "id": "6473eb1ec1234567890abcde",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "user",
            "profilePicture": "default.jpg"
        }
    }
}
```

### Hotel List Response
```json
{
    "status": "success",
    "results": 2,
    "data": {
        "hotels": [
            {
                "id": "683076d7abdd2c206fb0755c",
                "name": "Grand Luxury Hotel",
                "description": "A 5-star luxury hotel in the heart of Mumbai",
                "rating": 4.8,
                "address": {
                    "street": "123 Marine Drive",
                    "city": "Mumbai",
                    "state": "Maharashtra",
                    "zipCode": "400001",
                    "country": "India"
                },
                "location": {
                    "type": "Point",
                    "coordinates": [72.8208, 18.9256]
                },
                "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Room Service"],
                "rooms": [
                    {
                        "type": "Deluxe",
                        "price": 8000,
                        "capacity": 2,
                        "amenities": ["King Bed", "Ocean View", "Mini Bar", "Smart TV"]
                    }
                ],
                "priceRange": {
                    "min": 8000,
                    "max": 15000
                }
            }
        ]
    }
}
```

### Concert List Response
```json
{
    "status": "success",
    "results": 2,
    "data": {
        "concerts": [
            {
                "id": "683076d7abdd2c206fb07564",
                "title": "Summer Music Festival 2025",
                "artist": "Various Artists",
                "description": "The biggest music festival featuring top international artists",
                "date": "2025-06-15T18:00:00.000Z",
                "venue": {
                    "name": "DY Patil Stadium",
                    "capacity": 55000,
                    "address": {
                        "street": "Sector 7",
                        "city": "Navi Mumbai",
                        "state": "Maharashtra",
                        "zipCode": "400614",
                        "country": "India"
                    }
                },
                "duration": "6 hours",
                "genre": ["Pop", "Rock", "Hip Hop"],
                "status": "upcoming",
                "featured": true
            }
        ]
    }
}
```

### Package List Response
```json
{
    "status": "success",
    "results": 2,
    "data": {
        "packages": [
            {
                "id": "683076d7abdd2c206fb0756d",
                "name": "Summer Festival Luxury Package",
                "description": "Experience the Summer Music Festival with luxury stay",
                "price": 25000,
                "duration": 3,
                "availableSpots": 50,
                "concert": {
                    "title": "Summer Music Festival 2025",
                    "artist": "Various Artists",
                    "date": "2025-06-15T18:00:00.000Z",
                    "venue": {
                        "name": "DY Patil Stadium"
                    }
                },
                "hotel": {
                    "name": "Grand Luxury Hotel",
                    "rating": 4.8,
                    "address": {
                        "street": "123 Marine Drive",
                        "city": "Mumbai"
                    }
                },
                "startDate": "2025-06-14T12:00:00.000Z",
                "endDate": "2025-06-17T12:00:00.000Z",
                "status": "active"
            }
        ]
    }
}
```

### Booking Creation Response
```json
{
    "status": "success",
    "data": {
        "booking": {
            "id": "6473eb1ec1234567890abcde",
            "user": "6473eb1ec1234567890abcdf",
            "package": "6473eb1ec1234567890abcdg",
            "startDate": "2025-06-14T12:00:00.000Z",
            "endDate": "2025-06-16T12:00:00.000Z",
            "numberOfPeople": 2,
            "totalAmount": 30000,
            "status": "confirmed",
            "paymentStatus": "completed"
        }
    }
}
```

### Error Response Example
```json
{
    "status": "fail",
    "message": "Invalid credentials"
}
```

### Validation Error Example
```json
{
    "status": "fail",
    "message": "Invalid input data",
    "errors": [
        {
            "field": "email",
            "message": "Please provide a valid email"
        },
        {
            "field": "password",
            "message": "Password must be at least 8 characters long"
        }
    ]
}
```

# Your Concert API Documentation

## Base URL
The base URL for all API endpoints is:
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## API Endpoints

### Authentication
| Method | URL | Description | Access |
|--------|----------|-------------|---------|
| POST | `http://localhost:5000/api/auth/register` | Register new user | Public |
| POST | `http://localhost:5000/api/auth/login` | Login user | Public |

#### Validation Requirements
```
Username:
- Required
- Minimum 3 characters
- Maximum 30 characters
- Can contain letters, numbers, and underscores

Email:
- Required
- Must be a valid email format
- Maximum 50 characters
- Must be unique in the system

Password:
- Required
- Minimum 8 characters
- Maximum 30 characters
- Must contain at least:
  - One uppercase letter
  - One lowercase letter
  - One number
  - One special character

Phone Number:
- Required
- Must be a valid phone number format
- Example formats: +1234567890, 1234567890
```

#### Example Credentials

##### Register Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Test@123",
  "phoneNumber": "+1234567890"
}
```

##### Login Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "Test@123"
}
```

### Events
| Method | URL | Description | Access |
|--------|----------|-------------|---------|
| GET | `http://localhost:5000/api/events` | Get all events | Public |
| GET | `http://localhost:5000/api/events/search` | Search events | Public |
| GET | `http://localhost:5000/api/events/:id` | Get single event | Public |
| POST | `http://localhost:5000/api/events` | Create new event | Admin |
| PATCH | `http://localhost:5000/api/events/:id` | Update event | Admin |
| DELETE | `http://localhost:5000/api/events/:id` | Delete event | Admin |

#### Create Event Request Body
```json
{
  "name": "string",
  "artist": "string",
  "date": "string",
  "time": "string",
  "venue": "string",
  "description": "string",
  "image": "string",
  "ticketTypes": [
    {
      "name": "string",
      "price": "number",
      "quantity": "number"
    }
  ]
}
```

### Bookings
| Method | URL | Description | Access |
|--------|----------|-------------|---------|
| POST | `http://localhost:5000/api/bookings` | Create new booking | Protected |
| GET | `http://localhost:5000/api/bookings/my-bookings` | Get user's bookings | Protected |
| GET | `http://localhost:5000/api/bookings/:id` | Get booking details | Protected |
| PATCH | `http://localhost:5000/api/bookings/:id/cancel` | Cancel booking | Protected |

#### Create Booking Request Body
```json
{
  "eventId": "string",
  "tickets": [
    {
      "ticketType": "string",
      "quantity": "number"
    }
  ],
  "paymentInfo": {
    "method": "credit_card|debit_card|upi|net_banking",
    "transactionId": "string"
  }
}
```

### Clients
| Method | URL | Description | Access |
|--------|----------|-------------|---------|
| GET | `http://localhost:5000/api/clients` | Get all clients | Protected |
| GET | `http://localhost:5000/api/clients/:id` | Get single client | Protected |
| POST | `http://localhost:5000/api/clients` | Create new client | Protected |
| PUT | `http://localhost:5000/api/clients/:id` | Update client | Protected |
| DELETE | `http://localhost:5000/api/clients/:id` | Delete client | Protected |

## Response Format
All endpoints return responses in the following format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## Status Codes
- 200: OK (successful request)
- 201: Created (successful creation)
- 400: Bad Request (validation error)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Example Usage

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Events
```bash
curl http://localhost:5000/api/events
```

### Create a Booking (Protected Route)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "eventId": "event_id_here",
    "tickets": [
      {
        "ticketType": "VIP",
        "quantity": 2
      }
    ],
    "paymentInfo": {
      "method": "credit_card",
      "transactionId": "tx_123456"
    }
  }'
```

## Real Example Data

### 1. Register New User
```json
{
  "name": "Aditya Raut",
  "email": "aditya.raut@example.com",
  "password": "SecurePass@2025",
  "phoneNumber": "+919876543210"
}
```

### 2. Create Event
```json
{
  "name": "Arijit Singh Live in Concert",
  "artist": "Arijit Singh",
  "date": "2025-04-15",
  "time": "19:00",
  "venue": {
    "name": "Jawaharlal Nehru Stadium",
    "location": "New Delhi, India",
    "capacity": 60000
  },
  "description": "Experience the magical voice of Arijit Singh live in concert. An evening filled with soulful melodies and unforgettable moments.",
  "image": "/images/concerts/arijit-singh-live.jpg",
  "categories": ["concert", "live-music"],
  "ticketTypes": [
    {
      "name": "VIP",
      "price": 9999,
      "quantity": 1000,
      "description": "Premium seating with meet & greet"
    },
    {
      "name": "Gold",
      "price": 5999,
      "quantity": 3000,
      "description": "Front section seating"
    },
    {
      "name": "Silver",
      "price": 2999,
      "quantity": 5000,
      "description": "Regular seating"
    }
  ]
}
```

### 3. Create Booking
```json
{
  "eventId": "6507eb9c12345678deadbeef",
  "tickets": [
    {
      "ticketType": "VIP",
      "quantity": 2,
      "price": 9999,
      "seats": [
        {
          "section": "VIP-A",
          "row": "1",
          "seatNumber": "15"
        },
        {
          "section": "VIP-A",
          "row": "1",
          "seatNumber": "16"
        }
      ]
    }
  ],
  "totalAmount": 19998,
  "paymentInfo": {
    "method": "credit_card",
    "transactionId": "txn_123456789"
  }
}
```

### 4. Event Search Example
GET `http://localhost:5000/api/events/search?keyword=Arijit&category=concert&date=2025-04-15&minPrice=1000&maxPrice=10000`

### 5. Client Creation
```json
{
  "name": "Event Management Corp",
  "email": "contact@eventmanagement.com",
  "phoneNumber": "+919898989898",
  "address": {
    "street": "123 Business Avenue",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "pincode": "400001"
  }
}
```

## Sample Success Responses

### Event Details Response
```json
{
  "success": true,
  "data": {
    "event": {
      "id": "6507eb9c12345678deadbeef",
      "name": "Arijit Singh Live in Concert",
      "artist": "Arijit Singh",
      "date": "2025-04-15T19:00:00.000Z",
      "venue": {
        "name": "Jawaharlal Nehru Stadium",
        "location": "New Delhi, India",
        "capacity": 60000
      },
      "ticketTypes": [
        {
          "name": "VIP",
          "price": 9999,
          "quantity": 1000,
          "description": "Premium seating with meet & greet"
        }
      ],
      "status": "upcoming",
      "isSoldOut": false
    }
  }
}
```

### Booking Confirmation Response
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "6507eb9c87654321beefcafe",
      "event": "Arijit Singh Live in Concert",
      "user": {
        "name": "Aditya Raut",
        "email": "aditya.raut@example.com"
      },
      "tickets": [
        {
          "ticketType": "VIP",
          "quantity": 2,
          "seats": [
            {
              "section": "VIP-A",
              "row": "1",
              "seatNumber": "15"
            },
            {
              "section": "VIP-A",
              "row": "1",
              "seatNumber": "16"
            }
          ]
        }
      ],
      "totalAmount": 19998,
      "status": "confirmed",
      "bookingDate": "2025-04-01T10:30:00.000Z"
    }
  }
}
```
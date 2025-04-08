require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Add CORS middleware
const cors = require('cors');
app.use(cors());

// Sample hotel data
const hotelData = [
  {
    name: "The Westin Pune Koregaon Park",
    location: "36/3-B, Koregaon Park Annexe, Mundhwa Road, Ghorpadi, Pune, Maharashtra 411001",
    rating: 4.5,
    price: 7999,
    coverImg: "/HotelImages/image_1.png",
    inRadius: 2
  },
  {
    name: "Taj Mahal Palace",
    location: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
    rating: 4,
    price: 12999,
    coverImg: "/HotelImages/image_2.png",
    inRadius: 3
  },
  {
    name: "ITC Grand Chola",
    location: "No. 63, Mount Road, Guindy, Chennai, Tamil Nadu 600032",
    rating: 3.2,
    price: 10499,
    coverImg: "/HotelImages/image_3.png",
    inRadius: 3
  },
  {
    name: "The Oberoi Udaivilas",
    location: "Haridasji Ki Magri, Mulla Talai, Udaipur, Rajasthan 313001",
    rating: 2,
    price: 15999,
    coverImg: "/HotelImages/image_4.png",
    inRadius: 5
  }
];

// Sample concert data
const concertData = [
  {
    id: 1,
    date: "15 Apr 2025",
    time: "7:00 PM",
    name: "Arijit Singh Live",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    date: "02 May 2025",
    time: "6:30 PM",
    name: "DIVINE India Tour",
    location: "Delhi"
  },
  {
    id: 3,
    date: "20 Apr 2025",
    time: "8:00 PM",
    name: "Shreya Ghoshal Musical Night",
    location: "Bengaluru, Karnataka"
  },
  {
    id: 4,
    date: "25 Apr 2025",
    time: "7:30 PM",
    name: "Anuv Jain - Live in Concert",
    location: "Pune, Maharashtra"
  },
  {
    id: 5,
    date: "28 Apr 2025",
    time: "7:00 PM",
    name: "The Local Train - India Tour",
    location: "Chandigarh"
  },
  {
    id: 6,
    date: "10 May 2025",
    time: "6:45 PM",
    name: "Neha Kakkar & Tony Kakkar Live",
    location: "Hyderabad, Telangana"
  }
];

// Sample package data (as expected by PackageDetail.jsx)
const packageDetails = {
  '1': {
    title: 'Persona Concert Package',
    image: '/YC (IMG)/cold.webp',
    price: '₹1,999',
    date: 'December 20, 2024',
    time: '1 PM - 6:30 PM',
    location: '123 Festival Ave, Music City',
    description: 'Experience the ultimate concert package with premium seating and exclusive amenities.',
    features: [
      'VIP seating in premium section',
      'Exclusive meet & greet opportunity',
      'Commemorative concert merchandise',
      'Priority entrance and parking',
      'Access to VIP lounge',
    ],
    hotel: {
      name: 'Grand Hotel Luxury',
      image: '/YC (IMG)/Arena-End-Stage-Concert-7b19ab95da.jpg',
      amenities: [
        'Luxury accommodation',
        'Complimentary breakfast',
        'Festival shuttle service',
        'Spa access',
      ],
    },
  },
};

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/api/hotels', (req, res) => {
  res.json(hotelData);
});

app.get('/api/concerts', (req, res) => {
  res.json(concertData);
});

// Endpoint to get list of packages as an array
app.get('/api/packages', (req, res) => {
  const packages = Object.keys(packageDetails).map(key => ({ id: key, ...packageDetails[key] }));
  res.json(packages);
});

// Endpoint to get package details by id
app.get('/api/packages/:id', (req, res) => {
  const id = req.params.id;
  const pkg = packageDetails[id];
  if (pkg) {
    res.json({ id, ...pkg });
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
});

// New endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Process the submission here (e.g. save to DB, send email, etc.)
  console.log("Contact form submission:", { name, email, message });
  res.json({ success: true, message: 'Thank you for contacting us' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

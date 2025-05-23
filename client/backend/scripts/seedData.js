const mongoose = require('mongoose');
const config = require('../config/config');
const Hotel = require('../models/Hotel');
const Concert = require('../models/Concert');
const Package = require('../models/Package');

const hotels = [
    {
        name: "Grand Luxury Hotel",
        description: "A 5-star luxury hotel in the heart of Mumbai",
        address: {
            street: "123 Marine Drive",
            city: "Mumbai",
            state: "Maharashtra",
            zipCode: "400001",
            country: "India"
        },
        rating: 4.8,
        images: [
            "https://example.com/hotel1-1.jpg",
            "https://example.com/hotel1-2.jpg"
        ],
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Room Service"],
        rooms: [
            {
                type: "Deluxe",
                price: 8000,
                capacity: 2,
                amenities: ["King Bed", "Ocean View", "Mini Bar", "Smart TV"]
            },
            {
                type: "Suite",
                price: 15000,
                capacity: 4,
                amenities: ["2 King Beds", "Living Room", "Ocean View", "Jacuzzi", "Kitchen"]
            }
        ],
        priceRange: {
            min: 8000,
            max: 15000
        },
        location: {
            type: "Point",
            coordinates: [72.8208, 18.9256]  // Mumbai Marine Drive coordinates
        },
        contactInfo: {
            phone: "+91-22-12345678",
            email: "contact@grandluxury.com",
            website: "www.grandluxury.com"
        }
    },
    {
        name: "Business Elite Hotel",
        description: "Perfect for business travelers in the commercial district",
        address: {
            street: "456 Bandra Kurla Complex",
            city: "Mumbai",
            state: "Maharashtra",
            zipCode: "400051",
            country: "India"
        },
        rating: 4.5,
        images: [
            "https://example.com/hotel2-1.jpg",
            "https://example.com/hotel2-2.jpg"
        ],
        amenities: ["WiFi", "Business Center", "Conference Rooms", "Gym", "Restaurant"],
        rooms: [
            {
                type: "Business Room",
                price: 6000,
                capacity: 2,
                amenities: ["Work Desk", "High-Speed Internet", "Coffee Maker"]
            },
            {
                type: "Executive Suite",
                price: 12000,
                capacity: 2,
                amenities: ["Living Room", "Work Station", "Mini Bar", "City View"]
            }
        ],
        priceRange: {
            min: 6000,
            max: 12000
        },
        location: {
            type: "Point",
            coordinates: [72.8556, 19.0596]  // BKC Mumbai coordinates
        },
        contactInfo: {
            phone: "+91-22-87654321",
            email: "contact@businesselite.com",
            website: "www.businesselite.com"
        }
    }
];

const concerts = [
    {
        title: "Summer Music Festival 2025",
        artist: "Various Artists",
        description: "The biggest music festival featuring top international artists",
        date: "2025-06-15T18:00:00.000Z",
        venue: {
            name: "DY Patil Stadium",
            address: {
                street: "Sector 7",
                city: "Navi Mumbai",
                state: "Maharashtra",
                zipCode: "400614",
                country: "India"
            },
            capacity: 55000
        },
        image: "https://example.com/concert1.jpg",
        duration: "6 hours",
        genre: ["Pop", "Rock", "Hip Hop"],
        pricing: [
            {
                category: "General",
                price: 2000,
                totalSeats: 35000,
                remainingSeats: 35000
            },
            {
                category: "VIP",
                price: 5000,
                totalSeats: 10000,
                remainingSeats: 10000
            },
            {
                category: "VVIP",
                price: 10000,
                totalSeats: 5000,
                remainingSeats: 5000
            }
        ],
        additionalInfo: {
            ageRestriction: "16+",
            doorOpeningTime: "16:00",
            guidelines: [
                "No outside food and beverages",
                "Valid ID required",
                "No professional cameras"
            ]
        },
        featured: true
    },
    {
        title: "Rock Revolution 2025",
        artist: "Global Rock Bands",
        description: "A night of pure rock music with international rock bands",
        date: "2025-07-20T19:00:00.000Z",
        venue: {
            name: "Mahalaxmi Race Course",
            address: {
                street: "Mahalaxmi",
                city: "Mumbai",
                state: "Maharashtra",
                zipCode: "400034",
                country: "India"
            },
            capacity: 25000
        },
        image: "https://example.com/concert2.jpg",
        duration: "4 hours",
        genre: ["Rock", "Metal"],
        pricing: [
            {
                category: "General",
                price: 2500,
                totalSeats: 15000,
                remainingSeats: 15000
            },
            {
                category: "Premium",
                price: 5000,
                totalSeats: 8000,
                remainingSeats: 8000
            }
        ],
        additionalInfo: {
            ageRestriction: "18+",
            doorOpeningTime: "17:00",
            guidelines: [
                "No outside food and beverages",
                "Valid ID required",
                "No professional cameras"
            ]
        },
        featured: true
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to database');

        // Clear existing data
        await Hotel.deleteMany({});
        await Concert.deleteMany({});
        await Package.deleteMany({});
        console.log('Cleared existing data');

        // Insert hotels
        const createdHotels = await Hotel.create(hotels);
        console.log('Hotels seeded');

        // Insert concerts
        const createdConcerts = await Concert.create(concerts);
        console.log('Concerts seeded');

        // Create packages using the created hotels and concerts
        const packages = [
            {
                name: "Summer Festival Luxury Package",
                description: "Experience the Summer Music Festival with luxury stay",
                concert: createdConcerts[0]._id,
                hotel: createdHotels[0]._id,
                duration: 3,
                price: 25000,
                inclusions: [
                    "VIP Concert Tickets",
                    "3 Nights Luxury Hotel Stay",
                    "Breakfast and Dinner",
                    "Airport Transfer",
                    "Backstage Pass"
                ],
                maxParticipants: 50,
                availableSpots: 50,
                startDate: "2025-06-14T12:00:00.000Z",
                endDate: "2025-06-17T12:00:00.000Z",
                highlights: [
                    "VIP Concert Experience",
                    "Luxury Hotel Accommodation",
                    "Meet & Greet with Artists",
                    "Exclusive After Party"
                ],
                terms: [
                    "Non-refundable",
                    "Valid ID required",
                    "Check-in time: 2 PM",
                    "Check-out time: 11 AM"
                ]
            },
            {
                name: "Rock Weekend Package",
                description: "Ultimate rock music weekend with comfortable stay",
                concert: createdConcerts[1]._id,
                hotel: createdHotels[1]._id,
                duration: 2,
                price: 15000,
                inclusions: [
                    "Premium Concert Tickets",
                    "2 Nights Hotel Stay",
                    "Breakfast",
                    "Concert Shuttle Service"
                ],
                maxParticipants: 100,
                availableSpots: 100,
                startDate: "2025-07-19T12:00:00.000Z",
                endDate: "2025-07-21T12:00:00.000Z",
                highlights: [
                    "Premium Concert Experience",
                    "Comfortable Stay",
                    "Rock Memorabilia Gift"
                ],
                terms: [
                    "50% refundable until 1 week before event",
                    "Valid ID required",
                    "Check-in time: 3 PM",
                    "Check-out time: 12 PM"
                ]
            }
        ];

        await Package.create(packages);
        console.log('Packages seeded');

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

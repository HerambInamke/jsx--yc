const mongoose = require('mongoose');
const Event = require('../models/Event');
const Package = require('../models/Package');
require('dotenv').config();

// Connect to MongoDB using the same connection string as the server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const concerts = [
  {
    name: "Coldplay Music of the Spheres World Tour",
    artist: "Coldplay",
    date: new Date('2025-12-15T19:00:00.000Z'),
    time: "19:00",
    venue: {
      name: "DY Patil Stadium",
      location: "Navi Mumbai, Maharashtra",
      capacity: 55000
    },
    description: "Experience the magical Music of the Spheres World Tour with Coldplay. A spectacular show featuring their greatest hits and latest album.",
    image: "https://example.com/coldplay-concert.jpg",
    categories: ["concert", "live-music"],
    status: "upcoming",
    ticketTypes: [
      {
        name: "General Admission",
        price: 3000,
        quantity: 35000,
        description: "Standard standing area tickets"
      },
      {
        name: "VIP",
        price: 8000,
        quantity: 10000,
        description: "Premium seating with early access"
      },
      {
        name: "Platinum",
        price: 15000,
        quantity: 5000,
        description: "Front row seats with meet & greet"
      }
    ]
  },
  {
    name: "Summer Music Festival 2025",
    artist: "Various Artists",
    date: new Date('2025-06-15T18:00:00.000Z'),
    time: "18:00",
    venue: {
      name: "Mumbai Racecourse",
      location: "Mumbai, Maharashtra",
      capacity: 25000
    },
    description: "The biggest music festival featuring top international and Indian artists across multiple stages.",
    image: "https://example.com/summer-festival.jpg",
    categories: ["festival", "concert"],
    status: "upcoming",
    ticketTypes: [
      {
        name: "General",
        price: 2000,
        quantity: 15000,
        description: "Access to all stages"
      },
      {
        name: "VIP",
        price: 5000,
        quantity: 8000,
        description: "Premium viewing areas and exclusive lounges"
      },
      {
        name: "Backstage Pass",
        price: 12000,
        quantity: 2000,
        description: "Backstage access and artist meet & greet"
      }
    ]
  },
  {
    name: "Rock Weekend Extravaganza",
    artist: "Multiple Rock Bands",
    date: new Date('2025-07-20T20:00:00.000Z'),
    time: "20:00",
    venue: {
      name: "Andheri Sports Complex",
      location: "Andheri, Mumbai",
      capacity: 12000
    },
    description: "A weekend dedicated to rock music featuring the best rock bands from around the world.",
    image: "https://example.com/rock-weekend.jpg",
    categories: ["concert", "live-music"],
    status: "upcoming",
    ticketTypes: [
      {
        name: "General",
        price: 1500,
        quantity: 8000,
        description: "General admission standing"
      },
      {
        name: "Premium",
        price: 3500,
        quantity: 3000,
        description: "Reserved seating with better view"
      },
      {
        name: "VIP",
        price: 7000,
        quantity: 1000,
        description: "Front row access with exclusive amenities"
      }
    ]
  },
  {
    name: "Ed Sheeran Live in Mumbai",
    artist: "Ed Sheeran",
    date: new Date('2025-11-10T19:30:00.000Z'),
    time: "19:30",
    venue: {
      name: "BKC Ground",
      location: "Bandra Kurla Complex, Mumbai",
      capacity: 30000
    },
    description: "Ed Sheeran brings his Mathematics Tour to Mumbai for an unforgettable acoustic experience.",
    image: "https://example.com/ed-sheeran.jpg",
    categories: ["concert", "live-music"],
    status: "upcoming",
    ticketTypes: [
      {
        name: "General",
        price: 4000,
        quantity: 20000,
        description: "General admission standing area"
      },
      {
        name: "Premium",
        price: 8000,
        quantity: 8000,
        description: "Premium seating with better acoustics"
      },
      {
        name: "VIP",
        price: 12000,
        quantity: 2000,
        description: "Front row seats with exclusive merchandise"
      }
    ]
  }
];

async function seedConcerts() {
  try {
    console.log('🌱 Seeding concerts...');
    
    // Clear existing concerts
    await Event.deleteMany({});
    console.log('✅ Cleared existing concerts');
    
    // Insert new concerts
    const createdConcerts = await Event.insertMany(concerts);
    console.log(`✅ Created ${createdConcerts.length} concerts`);
    
    // Display created concerts
    createdConcerts.forEach(concert => {
      console.log(`🎵 ${concert.name} - ID: ${concert._id}`);
    });
    
    // Update packages to reference the new concerts
    console.log('\n🔄 Updating packages with concert references...');
    
    const packages = await Package.find({});
    const concertIds = createdConcerts.map(c => c._id);
    
    for (let i = 0; i < packages.length && i < concertIds.length; i++) {
      await Package.findByIdAndUpdate(packages[i]._id, {
        concert: concertIds[i]
      });
      console.log(`✅ Updated package: ${packages[i].name} with concert: ${createdConcerts[i].name}`);
    }
    
    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📋 Available Concert IDs for testing:');
    createdConcerts.forEach(concert => {
      console.log(`   ${concert.name}: ${concert._id}`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding concerts:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedConcerts(); 
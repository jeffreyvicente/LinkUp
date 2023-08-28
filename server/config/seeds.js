const db = require('./connection');
const { User, Event } = require('../models');

db.once('open', async () => {
    await Event.deleteMany();

    const events = await Event.insertMany([
        {
            title: 'Music Fest 2023',
            description: 'A grand music fest with top artists.',
            location: 'Central Park, NY',
            date: new Date("2023-10-15"),
            type: 'music',
            organizer: users[0]._id
        },
        {   
            title: 'Food Expo',
            description: 'Taste food from around the world.',
            location: 'Convention Center, LA',
            date: new Date("2023-11-1"),
            type: 'food',
            organizer: users[1]._id
        },
        {
            title: 'Lollapalooza',
            description: 'Join us for this amazing music festival.',
            location: "Chicago, Illinois",
            date: new Date("2023-9-28"),
            type: 'music',
            organizer: users[2]._id
        },
        {
            title: "Burning Man",
            description: "This is an iconic counterculture event.",
            location: "Black Rock Desert, Nevada",
            date: new Date("2023-9-4"),
            type: "others",
            organizer: users[3]._id
        },
        {
            title: "New Years Eve Party",
            description: "Amazing party to bring in the new year.",
            location: "Times Square, NY",
            date: new Date("2023-12-31"),
            type: "party",
            organizer: users[4]._id
        },
        {
            title: "Halloween Party",
            description: "Get groovy with all the other ghouls and goblins.",
            location: "Austin, TX",
            date: new Date("2023-10-31"),
            type: "party",
            organizer: users[5]._id
        },
        {
            title: "Art Exhibit",
            description: "Rembrandt, Monet, Picasso, and many more.",
            location: "Los Angeles, CA",
            date: new Date("2023-11-5"),
            type: "others",
            organizer: users[6]._id
        },
        {
            title: "Food Fight",
            description: "Join us for the biggest food fight ever.",
            location: "Austin, TX",
            date: new Date("2023-10-21"),
            type: "others",
            organizer: users[7]._id
        },
        {
            title: "Tech Conference 2023",
            description: "Join us for the biggest tech conference of the year.",
            location: "TechExpo Center, San Francisco",
            date: new Date("2023-10-15"),
            type: "others",
            organizer: users[8]._id
        },
        {
            title: "MusicFest 2023",
            description: "Enjoy a weekend of live music performances.",
            location: "Harmony Park, Austin",
            date: new Date("2023-11-8"),
            type: "music",
            organizer: users[9]._id
        },
        {
            title: "Fitness & Wellness Expo",
            description: "Explore the latest trends in fitness.",
            location: "FitZone Arena, Los Angeles",
            date: new Date("2023-9-2"),
            type: "others",
            organizer: users[2]._id
        },
        {
            title: "Indie Music Showcase",
            description: "Discover emerging indie bands and artists.",
            location: "Underground SoundBar, Boston",
            date: new Date("2023-05-19"),
            type: "music",
            organizer: users[5]._id
        },
        {
            title: "Chocolate Lovers' Expo",
            description: "Calling all chocolate enthusiasts!",
            location: "Sweet Factory, Dallas",
            date: new Date("2023-3-8"),
            type: "food",
            organizer: users[8]._id
        },
        {
            title: "Neon Glow Party",
            description: "Experience a night of vibrant neon colors.",
            location: "Eclipse Nightclub, Houston",
            date: new Date("2022-10-18"),
            type: "party",
            organizer: users[4]._id
        },
        {
            title: "Jazz Night at the Park",
            description: "Relax to the smooth sounds of jazz music in the park.",
            location: "City Park Amphitheater, Buda, TX",
            date: new Date("2022-12-1"),
            type: "music",
            organizer: users[1]._id
        },
        {
            title: "Enchanted Garden Soirée",
            description: "Step into an enchanted garden for an evening of magical experiences.",
            location: "Secret Garden Estate, San Francisco, CA",
            date: new Date("2023-6-27"),
            type: "party",
            organizer: users[1]._id
        },
    ]);

    console.log('events seeded');

    await User.deleteMany();

    await User.insertMany([
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            birthday: new Date("1990-0-1"),
            events:  [events[0]._id]
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: 'password123',
            birthday: new Date("1992-1-15"),
            events: [events[1]._id, events[15]._id, events[16]._id]
        },
        {
            name: "Andrew Alexander",
            email: "andrew.a@example.com",
            password: "password123",
            birthday: new Date("1991-8-15"),
            events: [events[2]._id, events[11]._id]
        },
        {
            name: "Brad Bailey",
            email: "brad.b@example.com",
            password: "password1234",
            birthday: new Date("1988-10-21"),
            events: [events[3]._id]
        },
        {
            name: "Carl Carlyle",
            email: "carl.c@example.com",
            password: "pass12345",
            birthday: new Date("1994-10-31"),
            events: [events[4]._id, events[14]._id]
        },
        {
            name: "David Davidson",
            email: "david.d@example.com",
            password: "pass123456",
            birthday: new Date("1986, 9, 15"),
            events: [events[5]._id, events[12]._id]
        },
        {
            name: "Erica Edwards",
            email: "erica.e@example.com",
            password: "pass1234567",
            birthday: new Date("1977-12-21"),
            events: [events[6]._id]
    
        },
        {
            name: "Frank Franklin",
            email: "frank.f@example.com",
            password: "pass12345678",
            birthday: new Date("1984-11-7"),
            events: [events[7]._id]
        },
        {
            name: "Greg Grant",
            email: "greg.g@example.com",
            password: "pass123456789",
            birthday: new Date("1979-5-27"),
            events: [events[8]._id, events[13]._id]
        },
        {
            name: "Heather Hamilton",
            email: "heather.h@example.com",
            password: "pass1234567890",
            birthday: new Date(1988-1-11),
            events: [events[9]._id]
        }
    ]);
   
    console.log('users seeded');

    process.exit();
});
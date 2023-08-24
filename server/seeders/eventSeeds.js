const mongoose = require('mongoose');
const db = require('./config/connection');
const User = require('./models/User');
const Event = require('./models/Event');

const seedEvents = async () => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            console.log('No users found! Make sure you seed users first.');
            process.exit(1);
        }

        const eventData = [
            {
                title: 'Music Fest 2023',
                description: 'A grand music fest with top artists.',
                location: 'Central Park, NY',
                date: new Date(2023, 10, 15),
                type: 'music',
                organizer: users[0]._id
            },
            {
                title: 'Food Expo',
                description: 'Taste food from around the world.',
                location: 'Convention Center, LA',
                date: new Date(2023, 11, 1),
                type: 'food',
                organizer: users[1]._id
            }
        ];

        await Event.deleteMany({});
        await Event.insertMany(eventData);
        console.log('Events seeded!');
        process.exit(0);
    } catch (err) {
        throw new Error(err);
    }
};

db.once('open', seedEvents);

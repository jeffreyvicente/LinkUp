const mongoose = require('mongoose');
const db = require('./config/connection');
const User = require('./models/User');

const userData = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        birthday: new Date(1990, 0, 1)
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        birthday: new Date(1992, 1, 15)
    }
];

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(userData);
        console.log('Users seeded!');
        process.exit(0);
    } catch (err) {
        throw new Error(err);
    }
});

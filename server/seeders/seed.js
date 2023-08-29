const db = require('../config/connection');
const { User, Event } = require('../models');

const eventSeeds = require('./eventSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Event.deleteMany({});

    const users = await User.insertMany(userSeeds);
    const events = await Event.insertMany(eventSeeds);

    console.log('all done!');
    process.exit(0);
});

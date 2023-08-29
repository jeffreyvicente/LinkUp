const db = require('../config/connection');
const { User, Event } = require('../models');

const eventSeeds = require('./eventSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    try {
        await Event.deleteMany({});
        await User.deleteMany({});
    
        await User.create(userSeeds);
    
        for (let i = 0; i < eventSeeds.length; i++) {
          const { _id, organizer } = await Event.create(eventSeeds[i]);
          const user = await User.findOneAndUpdate(
            { username: organizer },
            {
              $addToSet: {
                events: _id,
              },
            }
          );
        }
      } catch (err) {
        console.error(err);
        process.exit(1);
      }

    console.log('all done!');
    process.exit(0);
});

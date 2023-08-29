const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    type: {
        type: String,
        enum: ['party', 'music', 'food', 'others'],
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});
 const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
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
        required: true
    },
    type: {
        type: String,
        enum: ['party', 'music', 'food', 'others'],
        required: true
    },
    organizer: {
        type: String,
        required: true,
        trim: true,
    },
    eventAttendees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
});


const Event = model('Event', eventSchema);

module.exports = Event;

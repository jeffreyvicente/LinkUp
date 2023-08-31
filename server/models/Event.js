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
        type: String,
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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

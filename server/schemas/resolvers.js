const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        events: async () => {
            return await Event.find().populate('organizer');
        },
        event: async ( parent, { eventId }) => {
            return Event.findOne({ _id: eventId });
        },
        user: async (parent, { username }) => {
            return  User.findOne({ username }).populate('events');
        },
        users: async () => {
            return User.find().populate('events');
          },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createEvent: async (_, { title, description, location, date, type }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to create an event');
            }
            const newEvent = new Event({
                title,
                description,
                location,
                date: new Date(date),
                type,
                organizer: context.user._id
            });
            return await newEvent.save();
        },
        createUser: async (parent, { fullName, username, email, password }) => {
            const user = await User.create({ fullName, username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;

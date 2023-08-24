const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        events: async () => {
            return await Event.find().populate('organizer');
        },
        event: async (_, { id }) => {
            return await Event.findById(id).populate('organizer');
        },
        user: async (_, { id }) => {
            return await User.findById(id);
        }
    },
    Mutation: {
        createEvent: async (_, { title, description, location, date, type }, context) => {
            if (!context.userId) {
                throw new AuthenticationError('You need to be logged in to create an event');
            }
            const newEvent = new Event({
                title,
                description,
                location,
                date: new Date(date),
                type,
                organizer: context.userId
            });
            return await newEvent.save();
        },
        createUser: async (_, { name, email, password, birthday }) => {
            const user = new User({ name, email, password, birthday });
            const savedUser = await user.save();
            const token = signToken(savedUser);
            return { token, user: savedUser };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
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

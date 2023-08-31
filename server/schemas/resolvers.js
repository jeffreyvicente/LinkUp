const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        events: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Event.find(params).sort({ createdAt: -1 });
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
                return User.findOne({ _id: context.user._id }).populate('events');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createEvent: async (parent, { title, description, location, date }, context) => {
           try {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to create an event');
            } 
            const newEvent = new Event({
                title,
                description,
                location,
                date,
                organizer: context.user._id
            });
        
            return await newEvent.save();
        } catch (error) {
            console.log(error);
            return error;
        }
        },
        createUser: async (parent, { fullName, username, email, password }) => {
            const user = await User.create({ fullName, username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
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
        },

        addEventAttendee: async (parent,{ eventId }, context) => {
            if(context.user){
                return Event.findOneAndUpdate(
                    {_id: eventId},
                    {
                        $addToSet: { 
                            eventAttendees:context.user._id
                        },
                    },
                    {
                        new: true
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;

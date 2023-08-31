const { gql } = require('apollo-server-express');

const typeDefs = gql`


    type User {
        _id: ID
        fullName: String
        username: String
        email: String
        password: String
        events: [Event]!
    }

    type Event {
        _id: ID!
        title: String
        description: String
        location: String
        date: String
        organizer: User
        eventAttendees: [User]!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        events(username: String): [Event]
        event(eventId: ID!): Event
        me: User
 
      }

    type Mutation {
        createEvent(title: String!, description: String!, location: String!, date: String!): Event
        createUser(fullName: String!, username: String!, email: String!, password: String!): Auth!
        login(email: String!, password: String!): Auth
        addEventAttendee(eventId: ID, userId: ID):User
    }
`;

module.exports = typeDefs;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Event {
        _id: ID!
        title: String!
        description: String!
        location: String!
        date: String!
        type: String!
        organizer: User!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        birthday: String
    }

    type Auth {
        token: String!
        user: User!
    }

    type Query {
        events: [Event]!
        event(id: ID!): Event
        user(id: ID!): User
    }

    type Mutation {
        createEvent(title: String!, description: String!, location: String!, date: String!, type: String!): Event
        createUser(name: String!, email: String!, password: String!, birthday: String): Auth!
        login(email: String!, password: String!): Auth!
    }
`;

module.exports = typeDefs;

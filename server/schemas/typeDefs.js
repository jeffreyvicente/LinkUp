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
        fullName: String!
        username: String!
        email: String!
        password: String!
        me: User

    }

    type Auth {
        token: ID
        user: User!
    }

    type Query {
        users: [User]
        user(username: String!): User
        events(username: String): [Event]
        event(thoughtId: ID!): Event
        me: User
      }

    type Mutation {
        createEvent(title: String!, description: String!, location: String!, date: String!, type: String!): Event
        createUser(fullName: String!, username: String!, email: String!, password: String!): Auth!
        login(email: String!, password: String!): Auth!
    }
`;

module.exports = typeDefs;

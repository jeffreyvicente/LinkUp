import { gql } from '@apollo/client';


// Query to get a single event
// Used on the events page
export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    event(eventId: $eventId){
      _id
      title
      description
      location
      date
      organizer {
        _id
        username
      }
      
    }
  }
`;

export const QUERY_ALL_EVENT = gql`
  query getAllEvents {
    events {
      _id
      title
      description
      location
    }
  }
`;



export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      fullName
      username
      email
      events {
        _id
        title
        description
        date
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      fullName
      email
      events {
        _id
        title
        description
        date
      }
    }
  }
`;




/*



export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;



*/
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
      type
      organizer {
        _id
        name
      }
    }
  }
`;

export const QUERY_PAST_EVENT = gql`
  query


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
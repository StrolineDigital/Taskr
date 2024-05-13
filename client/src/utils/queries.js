import { gql } from '@apollo/client';
//This file holds the queries that will be used in the application
export const QUERY_USER = gql`
  {
    me {
      firstName
      lastName
      email
      tasks {
        _id
        title
        description
        dueDate
        completed
      }
    }
  }
`; 

export const QUERY_TASKS = gql`
  {
    gettask {
      _id
      title
      description
      dueDate
      completed
    }
  }
`;
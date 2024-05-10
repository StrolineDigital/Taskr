import { gql } from '@apollo/client';
//This file holds the queries that will be used in the application
export const QUERY_USER = gql`
  {
    user {
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

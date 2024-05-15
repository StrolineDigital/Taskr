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
       text
       isComplete
     }
   }
 }
`;


export const QUERY_TASKS = gql`
 {
   gettask {
     _id
     text
     isComplete
   }
 }
`;
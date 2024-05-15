import { gql } from "@apollo/client";
//This file holds the mutations that will be used in the application
export const LOGIN = gql`
 mutation login($email: String!, $password: String!) {
   login(email: $email, password: $password) {
     token
     user {
       _id
     }
   }
 }
`;


export const ADD_USER = gql`
 mutation addUser(
   $firstName: String!
   $lastName: String!
   $email: String!
   $password: String!
 ) {
   addUser(
     firstName: $firstName
     lastName: $lastName
     email: $email
     password: $password
   ) {
     token
     user {
       _id
      
     }
   }
 }
`;
export const ADD_TASK = gql`
mutation addTask($taskdata: TaskInput!) {
 addTask(taskdata: $taskdata) {
   _id
   tasks {
     _id
     text
     isComplete
   }
 }
}
`;


export const UPDATE_TASK = gql`
mutation updateTask($taskId: ID!, $taskdata: TaskInput!) {
 updateTask(taskId: $taskId, taskdata: $taskdata) {
   _id
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


export const DELETE_TASK = gql`
mutation deleteTask($taskId: ID!) {
 deleteTask(taskId: $taskId) {
   email
   tasks {
     _id
     text
   }
 }
}
`;
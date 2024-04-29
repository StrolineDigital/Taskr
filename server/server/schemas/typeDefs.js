


const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
     }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
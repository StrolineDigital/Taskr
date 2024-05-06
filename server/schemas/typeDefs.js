const typeDefs = `
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    tasks: [Task]
  }

  
  type Task {
    _id: ID
    title: String
    description: String
    dueDate: String
    completed: Boolean
  }


  type Auth {
    token: String
    user: User
  }

 
  type Query {
    me: User
    getTasks: [Task]
    getTask(taskId: ID!): Task
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addTask(title: String!, description: String, dueDate: String): Task
    updateTask(taskId: ID!, title: String, description: String, dueDate: String, completed: Boolean): Task
    deleteTask(taskId: ID!): Task
  }
`;

module.exports = typeDefs;
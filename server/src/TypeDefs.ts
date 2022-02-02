import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: String!
    username: String!
    email: String!
    password: String
    profilePicture: String
    createdAt: String
    updatedAt: String
  }

  type Login {
    token: String!
    data: User
  }

  type CreateAccountResponse{
    message: String!
    data: User
  }
  
  type Query {
    hello: String
  }

  type Mutation {
    createAccount(username: String!, email: String!, password: String!):CreateAccountResponse
    login(username: String!, password: String): Login!
  }
`;

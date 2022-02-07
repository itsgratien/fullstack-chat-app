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

  type CreateAccountResponse {
    message: String!
    data: User
  }

  type SendMessageResponse {
    message: String!
  }

  type ViewMessageResponse {
    data: [Message!]!
  }

  type Message {
    _id: String!
    message: String!
    sender: User!
    createdAt: String!
    updatedAt: String!
    conversation: String!
  }

  type Query {
    hello: String
    me: User
    viewMessage(conversation: String!): ViewMessageResponse!
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): CreateAccountResponse
    login(username: String!, password: String): Login!
    sendMessage(
      message: String!
      receiver: String!
      conversation: String
    ): SendMessageResponse!
  }

  type MessageSent {
    message: String!
    conversation: String
    receiver: String!
    timestamp: String!
  }

  type Subscription {
    messageSent: MessageSent
  }
`;

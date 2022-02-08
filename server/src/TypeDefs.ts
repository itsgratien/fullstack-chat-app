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

  type GetMessageResponse {
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

  type LatestMessage {
    message: String!
    timestamp: String!
  }

  type GetConversation {
    _id: String!
    latestMessage: LatestMessage
    createdAt: String!
    updatedAt: String!
    sender: User
  }

  type GetConversationResponse {
    data: [GetConversation]!
  }

  type GetWhoIsTypingResponse {
    message: String
    receiver: String
  }

  type HandleWhoIsTyping{
    message: String!
  }

  type Query {
    hello: String
    me: User
    getMessages(conversation: String!): GetMessageResponse!
    getConversations: GetConversationResponse
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
    handleWhoIsTyping(message: String, receiver: String!): HandleWhoIsTyping
  }

  type ReceiveMessageResponse {
    message: String!
    conversation: String
    receiver: String!
    timestamp: String!
  }

  type Subscription {
    receiveMessage: ReceiveMessageResponse
    getWhoIsTyping: GetWhoIsTypingResponse
  }
`;

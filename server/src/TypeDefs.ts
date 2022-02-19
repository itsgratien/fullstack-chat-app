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
    data: ReceiveMessageResponse
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
    stamp: String!
  }

  type LatestMessage {
    message: String!
    stamp: String!
  }

  type ConversationDetail {
    _id: String!
    latestMessage: LatestMessage
    createdAt: String!
    updatedAt: String!
    sender: User
  }

  type GetConversation {
    user: User!
    conversation: ConversationDetail
  }

  type GetConversationResponse {
    data: [GetConversation]!
  }

  type GetWhoIsTypingResponse {
    message: String
    receiver: String
  }

  type HandleWhoIsTyping {
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
    searchUser(user: String!): GetConversationResponse
  }

  type ReceiveMessageResponse {
    message: String!
    conversation: String
    receiver: String!
    stamp: String!
    _id: String
    sender: Sender
  }

  type Sender{
    id: String!
    username: String!
    profilePicture: String
  }

  type Subscription {
    receiveMessage: ReceiveMessageResponse
    getWhoIsTyping: GetWhoIsTypingResponse
  }
`;

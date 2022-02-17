import { gql } from '@apollo/client';
import { TUser, USER_FRAGMENT } from '.';
export interface TConversationItem {
  username: string;
  message: string;
  timestamp: number;
  conversationId: string | number;
}

export interface TLatestMessage {
  message: string;
  timestamp: string;
}
export interface TGetConversation {
  _id: string;
  latestMessage: TLatestMessage;
  createdAt: string;
  updatedAt: string;
  sender: TUser;
}

export interface TGetConversationResponse {
  getConversations: {
    data: TGetConversation[];
  };
}

export const GET_CONVERSATION_FRAGMENT = gql`
  fragment GetConversationFragment on GetConversationResponse {
    _id
    latestMessage {
      message
      timestamp
    }
    createdAt
    updatedAt
    sender {
      username
      _id
    }
  }
`;
export const GET_ALL_CONVERSATION = gql`
  query GetConversations {
    getConversations {
      data {
        _id
        latestMessage {
          message
          timestamp
        }
        sender {
          username
          _id
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export interface TSendMessageArgs {
  receiver: string;
  message: string;
  conversation?: string;
}

export interface TSendMessageResponse {
  sendMessage: {
    message: string;
  };
}

export const SEND_MESSAGE_GQL = gql`
  mutation SendMessage(
    $receiver: String!
    $message: String!
    $conversation: String!
  ) {
    sendMessage(
      message: $message
      receiver: $receiver
      conversation: $conversation
    ) {
      message
    }
  }
`;

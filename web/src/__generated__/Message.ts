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
  latestMessge: TLatestMessage;
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
  ${GET_CONVERSATION_FRAGMENT}
  query GetConversations {
    getConversations {
      data {
        ...GetConversationFragment
      }
    }
  }
`;

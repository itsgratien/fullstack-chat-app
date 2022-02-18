import { gql } from '@apollo/client';
import { TUser, USER_FRAGMENT } from '.';
export interface TConversationItem {
  username: string;
  message: string;
  timestamp: number;
  conversationId: string;
  senderId?: string;
}

export interface TLatestMessage {
  message: string;
  timestamp: string;
}
export interface TGetConversationDetail {
  _id: string;
  latestMessage: TLatestMessage;
  createdAt: string;
  updatedAt: string;
  sender: TUser;
}

export interface TGetAllConversation {
  user: TUser;
  conversation: TGetConversationDetail;
}
export interface TGetConversationResponse {
  getConversations: {
    data: TGetAllConversation[];
  };
}

export const GET_CONVERSATION_FRAGMENT = gql`
  fragment GetConversationFragment on ConversationDetail {
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
        user {
          _id
          username
          email
          profilePicture
        }
        conversation {
          ...GetConversationFragment
        }
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

export const SEARCH_USER_GQL = gql`
  ${GET_CONVERSATION_FRAGMENT}
  mutation SearchUser($user: String!) {
    searchUser(user: $user) {
      data {
        user {
          _id
          username
          email
          profilePicture
        }
        conversation {
          ...GetConversationFragment
        }
      }
    }
  }
`;

export interface TSearchUserArgs {
  user: string;
}

export interface TSearchUserResponse {
  searchUser: {
    data: TGetAllConversation[];
  };
}

export interface TGetMessage {
  id: string;
  conversation: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  sender: TUser;
}
export interface TGetMessageResponse {
  data: TGetMessage[];
}

export interface TGetMessageArgs{
  conversation: string;
}

export const GET_ALL_MESSAGE_GQL = gql`
  ${USER_FRAGMENT}
  query GetMessages($conversation: String!) {
    getMessages(conversation: $conversation) {
      data {
        id
        message
        createdAt
        updatedAt
        conversation
        sender {
          ...UserFragment
        }
      }
    }
  }
`;

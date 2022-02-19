import { gql } from '@apollo/client';
import { TUser, USER_FRAGMENT } from '.';
export interface TConversationItem {
  username: string;
  message: string;
  timestamp?: number;
  conversationId?: string;
  senderId?: string;
}

export interface TLatestMessage {
  message: string;
  stamp: string;
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
      stamp
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
    data: TReceiveMessage;
  };
}

export const SEND_MESSAGE_GQL = gql`
  mutation SendMessage(
    $receiver: String!
    $message: String!
    $conversation: String
  ) {
    sendMessage(
      message: $message
      receiver: $receiver
      conversation: $conversation
    ) {
      message
      data {
        _id
        message
        stamp
        receiver
        conversation
        sender {
          id
          username
          profilePicture
        }
      }
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
  _id: string;
  conversation: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  sender: TUser;
  stamp: string;
}
export interface TGetMessageResponse {
  getMessages: {
    data: TGetMessage[];
  };
}

export interface TGetMessageArgs {
  conversation: string;
}

export interface THandleWhoIsTypingArgs {
  receiver: string;
  message: string;
}

export interface THandleWhoIsTypingResponse {
  handleWhoIsTyping: {
    message: string;
  };
}

export interface TGetWhoIsTypingResponse {
  getWhoIsTyping: {
    message: string;
  };
}

export const GET_ALL_MESSAGE_GQL = gql`
  query GetMessages($conversation: String!) {
    getMessages(conversation: $conversation) {
      data {
        _id
        message
        createdAt
        updatedAt
        conversation
        stamp
        sender {
          _id
          username
          email
        }
      }
    }
  }
`;

export const GET_WHO_IS_TYPING_GQL = gql`
  subscription GetWhoIsTyping {
    getWhoIsTyping {
      message
    }
  }
`;

export const HANDLE_WHO_IS_TYPING_GQL = gql`
  mutation HandleWhoIsTyping($message: String, $receiver: String!) {
    handleWhoIsTyping(message: $message, receiver: $receiver) {
      message
    }
  }
`;

export const RECEIVE_MESSAGE_SUBSCRIPTION_GQL = gql`
  subscription ReceiveMessage {
    receiveMessage {
      _id
      message
      conversation
      receiver
      stamp
      sender {
        id
        username
        profilePicture
      }
    }
  }
`;

export interface TMessageItem {
  sender: {
    username: string;
    id: string;
  };
  message: string;
  stamp: string;
  id?: string;
}

export interface TReceiveMessageResponse {
  receiveMessage: TReceiveMessage;
}

export interface TReceiveMessage {
  _id?: string;
  message: string;
  conversation: string;
  receiver: string;
  stamp: string;
  sender: {
    id: string;
    username: string;
    profilePicture?: string;
  };
}

import { Types } from 'mongoose';
import { TUser } from '.';

export interface TConversation {
  users: [{ _id: Types.ObjectId }];
  createdAt: string;
  updatedAt: string;
}

export interface TConversationModel extends TConversation{
  _id: Types.ObjectId | string;
}

export interface TMessage {
  createdAt: string;
  updatedAt: string;
  sender: Types.ObjectId;
  conversation: Types.ObjectId;
  message: string;
  read?: boolean;
  timestamp: number;
}

export interface TSendMessageArgs {
  message: string;
  conversation?: string;
  receiver: string;
}

export interface TViewConversation {
  _id: string | Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  latestMessage?: {
    message: string;
    timestamp: string;
    _id: string | Types.ObjectId;
  };
  sender?: TUser | any;
}

export interface TVConversation{
  user: TUser;
  conversation?: TViewConversation;
}
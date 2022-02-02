import { Types } from 'mongoose';

export interface TConversation {
  users: [{ _id: Types.ObjectId }];
  createdAt: string;
  updatedAt: string;
}

export interface TMessage {
  createdAt: string;
  updatedAt: string;
  sender: Types.ObjectId;
  conversation: Types.ObjectId;
  message: string;
  read?: boolean;
}

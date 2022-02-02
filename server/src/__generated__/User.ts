import { Types } from 'mongoose';

export interface TUserModel {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TPayload {
  _id: Types.ObjectId;
}

export interface TCreateAccountArgs {
  username: string;
  email: string;
  password: string;
}

export interface TLoginArgs{
  username: string;
  password: string;
}
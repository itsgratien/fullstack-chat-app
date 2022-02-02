import { Document } from 'mongoose';

export interface TUserModel extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

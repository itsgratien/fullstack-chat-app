import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { TViewConversation } from '.';

export interface TUserModel {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TUser extends TUserModel {
  _id: Types.ObjectId | string;
}

export interface TPayload {
  _id: Types.ObjectId;
}

export interface TCreateAccountArgs {
  username: string;
  email: string;
  password: string;
}

export interface TLoginArgs {
  username: string;
  password: string;
}

export interface TContext {
  req: Request;
  res: Response;
  user?: TUser;
}

export interface TAuthTokenPayload extends JwtPayload {
  _id: string;
}

export enum CookieName {
  token = 'token',
}

export interface TSearchUser {
  conversations?: TViewConversation[];
  user: TUser;
}

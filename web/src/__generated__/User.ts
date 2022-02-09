import { gql } from '@apollo/client';

export interface TUser{
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export interface TLoginArgs {
  username: string;
  password: string;
}

export interface TLoginResponse {
  login: {
    token: string;
  };
}
export const USER_TYPE = gql`
  type User {
    _id: String!
    username: String!
    email: String!
    password: String
    profilePicture: String
    createdAt: String
    updatedAt: String
  }
`;
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  ${USER_TYPE}
  mutation Signup($username: String!, $password: String!, $email: String!) {
    createAccount(username: $username, password: $password, email: $email){
      message
      user: User
    }
  }
`;

export interface TSignupVariables extends TLoginArgs{
  email: string;
}

export interface TSignupResponse{
  createAccount: {
    message: string;
    user: TUser;
  }
}
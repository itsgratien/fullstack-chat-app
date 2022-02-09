import { gql } from '@apollo/client';

export interface TUser {
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
  fragment UserFragment on User {
    _id
    username
    email
    password
    profilePicture
    createdAt
    updatedAt
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
    createAccount(username: $username, password: $password, email: $email) {
      message
      data {
        ...UserFragment
      }
    }
  }
`;

export interface TSignupVariables extends TLoginArgs {
  email: string;
}

export interface TSignupResponse {
  createAccount: {
    message: string;
    data: TUser;
  };
}

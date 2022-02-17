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
    data: TUser;
  };
}
export const USER_FRAGMENT = gql`
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
  ${USER_FRAGMENT}
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      data {
        ...UserFragment
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  ${USER_FRAGMENT}
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

export const GET_USER_PROFILE = gql`
  ${USER_FRAGMENT}
  query GetCurrentProfile {
    me {
      ...UserFragment
    }
  }
`;

export interface TGetCurrentUserResponse {
  me: TUser;
}

export const GET_LOGGED_IN_USER = gql`
  ${USER_FRAGMENT}
  query GetLoggedInUser {
    loggedInUser @client {
      ...UserFragment
    }
  }
`;

export interface TGetLoggedInUser {
  loggedInUser: TUser;
}

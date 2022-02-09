import { gql } from '@apollo/client';

export interface TLoginArgs {
  username: string;
  password: string;
}

export interface TLoginResponse {
  login: {
    token: string;
  };
}
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

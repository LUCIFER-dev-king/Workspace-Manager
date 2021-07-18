import { gql } from "@apollo/client";

export const signUpHelper = gql`
  mutation SignUpMutation($signUpSignUpInput: SignUpInput) {
    signUp(signUpInput: $signUpSignUpInput) {
      _id
      username
      email
    }
  }
`;

export const signInHelper = gql`
  mutation SignInMutation($signInSignInInput: SignInInput) {
    signIn(signInInput: $signInSignInInput) {
      username
      email
      token
    }
  }
`;

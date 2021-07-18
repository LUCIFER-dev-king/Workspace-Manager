import { gql } from "@apollo/client";

export const signUpHelper = gql`
  mutation SignUpMutation($signUpSignUpInput: SignUpInput) {
    signUp(signUpInput: $signUpSignUpInput) {
      username
      email
    }
  }
`;

export const signInHelper = gql`
  mutation SignInMutation($signInSignInInput: SignInInput) {
    signIn(signInInput: $signInSignInInput) {
      _id
      username
      email
      token
    }
  }
`;

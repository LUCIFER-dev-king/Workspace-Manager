import { gql } from "@apollo/client";

export const getUser = gql`
  query Query {
    getUser {
      username
    }
  }
`;

export const createWorkspace = gql`
  mutation CreateWorkSpaceMutation(
    $createWorkSpaceUserId: ID
    $createWorkSpaceWorkspaceName: String
    $createWorkSpaceWorkspaceType: String
  ) {
    createWorkSpace(
      userId: $createWorkSpaceUserId
      workspaceName: $createWorkSpaceWorkspaceName
      workspaceType: $createWorkSpaceWorkspaceType
    ) {
      workspace {
        workspaceName
        workspaceType
      }
    }
  }
`;

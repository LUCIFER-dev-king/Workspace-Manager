import { gql } from "@apollo/client";

export const getUser = gql`
  query Query {
    getUser {
      username
      workspace {
        _id
        workspaceName
        boards {
          _id
          boardName
          listOfCards {
            _id
            listName
            cardList {
              _id
              cardName
              cardDesc
            }
          }
        }
      }
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

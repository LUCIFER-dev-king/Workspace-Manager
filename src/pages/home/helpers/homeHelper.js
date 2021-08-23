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
    $createWorkSpaceCreateWorkSpaceInput: CreateWorkSpaceInput
  ) {
    createWorkSpace(
      createWorkSpaceInput: $createWorkSpaceCreateWorkSpaceInput
    ) {
      workspace {
        workspaceName
      }
    }
  }
`;

export const createBoard = gql`
  mutation CreateBoardMutation($createBoardCreateBoardInput: CreateBoardInput) {
    createBoard(createBoardInput: $createBoardCreateBoardInput) {
      boardName
      _id
    }
  }
`;

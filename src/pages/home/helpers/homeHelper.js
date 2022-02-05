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
          imageUrl
          listOfCards {
            _id
            listName
            cardList {
              _id
              cardName
              cardDesc
              startDate
              endDate
              isCompleted
            }
          }
        }
      }
    }
  }
`;

export const createWorkspace = gql`
  mutation CreateWorkSpaceMutation(
    $createWorkSpaceInput: CreateWorkSpaceInput
  ) {
    createWorkSpace(createWorkSpaceInput: $createWorkSpaceInput) {
      workspace {
        _id
        workspaceName
        boards {
          _id
          boardName
          imageUrl
          listOfCards {
            _id
            listName
            cardList {
              _id
              cardName
              cardDesc
              startDate
              endDate
              isCompleted
            }
          }
        }
      }
    }
  }
`;

export const createBoard = gql`
  mutation CreateBoardMutation($createBoardCreateBoardInput: CreateBoardInput) {
    createBoard(createBoardInput: $createBoardCreateBoardInput) {
      workspace {
        _id
        workspaceName
        boards {
          _id
          boardName
          imageUrl
          listOfCards {
            _id
            listName
            cardList {
              _id
              cardName
              cardDesc
              startDate
              endDate
              isCompleted
            }
          }
        }
      }
    }
  }
`;

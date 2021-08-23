import { gql } from "@apollo/client";

export const getBoard = gql`
  query Query($getBoardGetBoardInput: GetBoardInput) {
    getBoard(getBoardInput: $getBoardGetBoardInput) {
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
`;

export const createListOfCards = gql`
  mutation Mutation($createCardListCreateCardListInput: CreateCardListInput) {
    createCardList(createCardListInput: $createCardListCreateCardListInput) {
      workspace {
        _id
        boards {
          _id
          listOfCards {
            _id
            listName
          }
        }
      }
    }
  }
`;

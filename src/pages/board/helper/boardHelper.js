import { gql } from "@apollo/client";

export const getBoard = gql`
  query Query($getBoardGetBoardInput: GetBoardInput) {
    getBoard(getBoardInput: $getBoardGetBoardInput) {
      _id
      listOfCards {
        _id
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
`;

export const createListOfCards = gql`
  mutation Mutation($createCardListInput: CreateCardListInput) {
    createCardList(createCardListInput: $createCardListInput) {
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
          checkList {
            _id
            checkListName
            isChecked
          }
        }
      }
    }
  }
`;

export const createCardToListOfCards = gql`
  mutation Mutation($createCardInput: CreateCardInput) {
    createCard(createCardInput: $createCardInput) {
      _id
      listOfCards {
        _id
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
`;

import { SET_USER, SET_USER_BOARD, SET_USER_WORKSPACE } from "./actions.types";

export const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload === null
        ? { ...state, user: {} }
        : { ...state, user: action.payload };
    case SET_USER_WORKSPACE:
      return action.payload === null
        ? { ...state, workspaces: {} }
        : { ...state, workspaces: action.payload };

    case SET_USER_BOARD:
      return action.payload === null
        ? { ...state, boards: {} }
        : { ...state, boards: action.payload };
    default:
      return state;
  }
};

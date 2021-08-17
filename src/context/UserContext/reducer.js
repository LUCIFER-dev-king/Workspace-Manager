import { SET_USER } from "./actions.types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload == null
        ? { ...state, user: {} }
        : { ...state, user: action.payload };

    default:
      return state;
  }
};

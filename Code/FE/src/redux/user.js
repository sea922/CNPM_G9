import { GET_USERS, SELECT_USER } from "./types/user";

const initialState = {
  users: [],
  selectedUser: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SELECT_USER: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }
    default:
      return state;
  }
};

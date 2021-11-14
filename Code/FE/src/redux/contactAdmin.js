import { GET_ALL_CONTACT } from "./types/contactAdmin";

const initialState = {
  contacts: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTACT: {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    default:
      return state;
  }
};

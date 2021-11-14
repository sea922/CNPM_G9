import { SEND_CONTACT_SUCCESS, SEND_CONTACT_FAIL } from "./types/contact";
export default (state = { contact: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_CONTACT_SUCCESS:
    case SEND_CONTACT_FAIL:
    default:
      return state;
  }
};

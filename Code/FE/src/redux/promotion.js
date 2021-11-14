import { GET_ALL_PROMOTION, SELECT_PROMOTION } from "./types/promotion";

const initialState = {
  promotions: [],
  selectedPromotion: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROMOTION: {
      return {
        ...state,
        promotions: action.payload,
      };
    }
    case SELECT_PROMOTION: {
      return {
        ...state,
        selectedPromotion: action.payload,
      };
    }
    default:
      return state;
  }
};

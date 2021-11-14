import {
  SET_CHECKIN_RESERVATION,
  SET_UNCHECKIN_RESERVATION,
  GET_MY_RESERVATIONS,
} from "./types/reservation";

const initialState = {
  reservationChecked: [],
  reservationUncheck: [],
  myReservations: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UNCHECKIN_RESERVATION:
      return {
        ...state,
        reservationUncheck: action.payload,
      };
    case SET_CHECKIN_RESERVATION: {
      return {
        ...state,
        reservationChecked: action.payload,
      };
    }
    case GET_MY_RESERVATIONS: {
      return {
        ...state,
        myReservations: action.payload,
      };
    }
    default:
      return state;
  }
};

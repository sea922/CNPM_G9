import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_DATE,
  SET_SELECTED_TIME,
  TOGGLE_LOGIN_POPUP,
  SHOW_INVITATION_FORM,
  RESET_CHECKOUT,
  FIND_SHOWTIME,
  SET_LIST_CINEMA_FOLLOW_MOVIE_ID,
  SET_LIST_RESERVATIONS,
  SET_DISCOUNT,
  SET_PROMOTION,
  CURRENT_RESERVATION,
} from "./types/checkout";

const initialState = {
  showtimes: [],
  selectedSeats: [],
  suggestedSeat: [],
  selectedCinema: "",
  selectedDate: null,
  selectedTime: "",
  showLoginPopup: false,
  cinemas: [],
  reservations: [],
  promotion: [],
  showInvitation: false,
};

const setSelectedSeats = (state, seats) => {
  let newSeats = [];
  const seatExist = state.selectedSeats.find(
    (seat) => JSON.stringify(seat) === JSON.stringify(seats)
  );
  !seatExist
    ? (newSeats = [...state.selectedSeats, seats])
    : (newSeats = state.selectedSeats.filter(
        (seat) => JSON.stringify(seat) !== JSON.stringify(seats)
      ));

  return {
    ...state,
    selectedSeats: newSeats,
  };
};

const setSuggestedSeats = (state, seats) => {
  let newSeats = [];

  newSeats = [...state.suggestedSeat, seats];

  return {
    ...state,
    suggestedSeat: newSeats,
  };
};

const setSelectedCinema = (state, selectedCinema) => ({
  ...state,
  selectedCinema,
});
const setSelectedDate = (state, selectedDate) => ({
  ...state,
  selectedDate,
});

const setSelectedTime = (state, selectedTime) => ({
  ...state,
  selectedTime,
});

const toggleLoginPopup = (state) => ({
  ...state,
  showLoginPopup: !state.showLoginPopup,
});
const showInvitationForm = (state) => ({
  ...state,
  showInvitation: !state.showInvitation,
});
const resetCheckout = () => initialState;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_CINEMA:
      return setSelectedCinema(state, payload);
    case SET_SELECTED_DATE:
      return setSelectedDate(state, payload);
    case SET_SELECTED_TIME:
      return setSelectedTime(state, payload);
    case TOGGLE_LOGIN_POPUP:
      return toggleLoginPopup(state);
    case RESET_CHECKOUT:
      return resetCheckout();
    case SHOW_INVITATION_FORM:
      return showInvitationForm(state);
    case FIND_SHOWTIME:
      return {
        ...state,
        showtimes: payload,
      };
    case SET_LIST_CINEMA_FOLLOW_MOVIE_ID: {
      return {
        ...state,
        cinemas: payload,
      };
    }
    case SET_LIST_RESERVATIONS: {
      return {
        ...state,
        reservations: payload,
      };
    }
    case SET_SELECTED_SEATS: {
      return {
        ...state,
        selectedSeats: payload,
      };
    }
    case SET_PROMOTION: {
      return {
        ...state,
        promotion: payload,
      };
    }
    case CURRENT_RESERVATION: {
      return {
        ...state,
        currentReservation: payload,
      };
    }
    default:
      return state;
  }
}

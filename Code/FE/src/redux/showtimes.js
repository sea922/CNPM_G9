import { GET_SHOWTIMES, SELECT_SHOWTIMES } from "./types/showtime";

const initialState = {
  showtimes: [],
  selectedShowtime: null,
};

const getShowtimes = (state, payload) => ({
  ...state,
  showtimes: payload,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SHOWTIMES:
      return getShowtimes(state, payload);
    case SELECT_SHOWTIMES:
      return {
        ...state,
        selectedShowtime: payload,
      };
    default:
      return state;
  }
};

import { GET_CINEMA, GET_CINEMAS, SELECT_CINEMA } from "./types/cinemas";

const initialState = {
  cinemas: [],
  selectedCinema: null,
};

const getCinemas = (state, payload) => ({
  ...state,
  cinemas: payload,
});

const getCinema = (state, payload) => ({
  ...state,
  selectedCinema: payload,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CINEMAS:
      return getCinemas(state, payload);
    case GET_CINEMA:
      return getCinema(state, payload);
    case SELECT_CINEMA:
      return {
        ...state,
        selectedCinema: payload,
      };
    default:
      return state;
  }
};

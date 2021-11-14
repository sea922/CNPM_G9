import moment from "moment";
import { BASE_URL } from "../../constants/Config";
import store from "../store";
import {
  SET_SELECTED_SEATS,
  SET_SELECTED_CINEMA,
  SET_SELECTED_DATE,
  SET_SELECTED_TIME,
  SET_INVITATION,
  TOGGLE_LOGIN_POPUP,
  SHOW_INVITATION_FORM,
  RESET_CHECKOUT,
  SET_SUGGESTED_SEATS,
  SET_QR_CODE,
  FIND_SHOWTIME,
  SET_LIST_CINEMA_FOLLOW_MOVIE_ID,
  SET_LIST_RESERVATIONS,
  SET_PROMOTION,
  CURRENT_RESERVATION,
} from "../types/checkout";

import { setAlert } from "./alert";

export const setSelectedSeats = (seats) => ({
  type: SET_SELECTED_SEATS,
  payload: seats,
});

export const setSuggestedSeats = (seats) => ({
  type: SET_SUGGESTED_SEATS,
  payload: seats,
});

export const setSelectedCinema = (cinema) => ({
  type: SET_SELECTED_CINEMA,
  payload: cinema,
});

//------------------------------------find show time
export const find_showtime_for_booking = (date, movieId, cinemaId) => async (
  dispatch
) => {
  
  const tempDate = moment(date).startOf("day")._d;
  dispatch({
    type: SET_SELECTED_DATE,
    payload: tempDate,
  });
  const dataFind = {
    selectedDate: tempDate,
    movieId: movieId,
    cinemaId: cinemaId,
  };
  try {
    dispatch({type:"SHOW_LOADING"})
    const url = BASE_URL + "reservations/find-showtime";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataFind),
    });
    const showtimes = await response.json();
    if (response.ok) {
      dispatch({ type: FIND_SHOWTIME, payload: showtimes });
      dispatch({type:"HIDE_LOADING"})
      dispatch(setSelectedTime(""));
    }
  } catch (error) {
    dispatch(setAlert("error", "error", 5000));
  }
};

////////////////////////////////////////////

export const setSelectedTime = (time) => ({
  type: SET_SELECTED_TIME,
  payload: time,
});

export const toggleLoginPopup = () => ({ type: TOGGLE_LOGIN_POPUP });
export const showInvitationForm = () => ({ type: SHOW_INVITATION_FORM });
export const resetCheckout = () => ({ type: RESET_CHECKOUT });

export const find_reservations = (data) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/find-reservations";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const reservations = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: SET_LIST_RESERVATIONS, payload: reservations });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert("error", "error", 5000));
  }
};
export const Find_cinema_booking = (movieId) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/find-cinema/" + movieId;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cinemas = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: SET_LIST_CINEMA_FOLLOW_MOVIE_ID, payload: cinemas });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert("error", "error", 5000));
  }
};
export const Find_promotion = (code) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "promotions/find-promotion";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    const promotions = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: SET_PROMOTION, payload: promotions });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert("error", "error", 5000));
  }
};
export const mailConfirm = (currentReservation) => async (dispatch) => {
  console.log("hello");
  try {
    const data = {
      to: currentReservation.userId.email,
      host: currentReservation.userId.name,
      movie: currentReservation.movieId.title,
      date: moment(currentReservation.date).format("DD-MM-YYYY"),
      time: currentReservation.startAt,
      cinema: currentReservation.cinemaId.name,
      link: "http://localhost:3000/checkin/" + currentReservation._id,
    };
    const url = BASE_URL + "confirm";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      dispatch(setAlert("Send email success!", "success", 3000));
    }
  } catch (error) {
    dispatch(setAlert("error", "error", 5000));
  }
};
export const Make_reservation = (reservation, movieId) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/create";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      const checkoutState = store.getState().checkoutState;
      const data = {
        startAt: checkoutState.selectedTime,
        date: checkoutState.selectedDate,
        movieId: movieId,
        cinemaId: checkoutState.selectedCinema._id,
      };
      dispatch(find_reservations(data));
      dispatch({ type: CURRENT_RESERVATION, payload: res });
      dispatch(setAlert("Success", "success", 3000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert("error", "error", 3000));
  }
};

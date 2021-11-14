import { BASE_URL } from "../../constants/Config";
import {
  SET_CHECKIN_RESERVATION,
  SET_PENDING_RESERVATION,
  SET_UNCHECKIN_RESERVATION,
  GET_MY_RESERVATIONS,
} from "../types/reservation";
import { setAlert } from "./alert";

export const getMyReservations = (userId) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "reservations/me";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    const myReservations = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: GET_MY_RESERVATIONS, payload: myReservations });
      // dispatch(setAlert("error.message", "error", 5000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const Get_checkin_reservation = () => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/checkin/true";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: SET_CHECKIN_RESERVATION, payload: res });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Get_uncheck_reservation = () => async (dispatch) => {
  try {
    const url = BASE_URL + "reservations/checkin/false";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({ type: SET_UNCHECKIN_RESERVATION, payload: res });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Checkin_reservation = (id) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/checkin-reservation/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(Get_checkin_reservation());
      dispatch(Get_uncheck_reservation());
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Change_status_reservation = (id) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/change-status/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(Get_checkin_reservation());
      dispatch(Get_uncheck_reservation());
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const Delete_reservation = (id) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "reservations/delete/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(Get_checkin_reservation());
      dispatch(Get_uncheck_reservation());
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};

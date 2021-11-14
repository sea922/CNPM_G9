import { BASE_URL } from "../../constants/Config";
import {
  DELETE_SHOWTIME,
  GET_SHOWTIMES,
  SELECT_SHOWTIMES,
} from "../types/showtime";
import { setAlert } from "./alert";

export const getShowtimes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "showtimes";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const showtimes = await response.json();
    if (response.ok) {
      dispatch({ type: GET_SHOWTIMES, payload: showtimes });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const addShowtime = (showtime) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "showtimes";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(showtime),
    });
    if (response.ok) {
      dispatch(getShowtimes());
      dispatch(setAlert("Showtime Created", "success", 5000));
      return { status: "success", message: "Showtime Created" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Cinema have not been saved, try again.",
    };
  }
};

export const updateShowtime = (showtime, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "showtimes/" + id;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(showtime),
    });
    if (response.ok) {
      dispatch(setAlert("Showtime Updated", "success", 5000));
      dispatch(getShowtimes());
      dispatch(onSelectShowtime(null));
      return { status: "success", message: "Showtime Updated" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Cinema have not been saved, try again.",
    };
  }
};

export const deleteShowtime = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "showtimes/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch({ type: DELETE_SHOWTIME, payload: id });
      dispatch(setAlert("Showtime Deleted", "success", 5000));
      dispatch(getShowtimes());
      return { status: "success", message: "Showtime Removed" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Showtime have not been deleted, try again.",
    };
  }
};
export const onSelectShowtime = (showtime) => {
  return {
    type: SELECT_SHOWTIMES,
    payload: showtime,
  };
};

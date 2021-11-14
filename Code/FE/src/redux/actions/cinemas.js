import { BASE_URL } from "../../constants/Config";
import { GET_CINEMA, GET_CINEMAS, SELECT_CINEMA } from "../types/cinemas";
import { setAlert } from "./alert";

export const uploadCinemaImage = (id, image) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const data = new FormData();
    data.append("file", image);
    const url = BASE_URL + "cinemas/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("Image Uploaded", "success", 5000));
      dispatch(getCinemas());
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const getCinemas = () => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "cinemas";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const cinemas = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: GET_CINEMAS, payload: cinemas });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const getCinema = (id) => async (dispatch) => {
  try {
    const url = BASE_URL + "cinemas/" + id;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const cinema = await response.json();
    if (response.ok) {
      dispatch({ type: GET_CINEMA, payload: cinema });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const createCinemas = (image, newCinema) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "cinemas";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCinema),
    });
    const cinema = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("Cinema Created", "success", 5000));
      if (image) dispatch(uploadCinemaImage(cinema._id, image));
      dispatch(getCinemas());
      return { status: "success", message: "Cinema Created" };
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Cinema have not been saved, try again.",
    };
  }
};

export const updateCinemas = (image, cinema, id) => async (dispatch) => {
  dispatch({type:"HIDE_LOADING"})
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "cinemas/" + id;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cinema),
    });
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("Cinema Updated", "success", 5000));
      if (image) dispatch(uploadCinemaImage(id, image));
      dispatch(onSelectCinema(null));
      dispatch(getCinemas());
      return { status: "success", message: "Cinema Updated" };
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Cinema have not been updated, try again.",
    };
  }
};

export const removeCinemas = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "cinemas/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(setAlert("Cinema Deleted", "success", 5000));
      dispatch(getCinemas());
      dispatch(onSelectCinema(null));
      return { status: "success", message: "Cinema Removed" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Cinema have not been deleted, try again.",
    };
  }
};
export const onSelectCinema = (data) => {
  return {
    type: SELECT_CINEMA,
    payload: data,
  };
};
export const searchFullTextCinema = (value) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "cinemas/search-full/" + value;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: GET_CINEMAS, payload: movies });

    }
  } catch {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert("error", "error", 2000));
  }
};

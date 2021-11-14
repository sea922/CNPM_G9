import { BASE_URL } from "../../constants/Config";
import {
  DELETE_USER,
  GET_USERS,
  SELECT_USER,
  UPDATE_USER,
} from "../types/user";
import { setAlert } from "./alert";

export const updateUser = (user, id) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "users/" + id;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const newUser = data.user;
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("User Updated", "success", 5000));
      // dispatch({ type: UPDATE_USER, payload: newUser });
      dispatch(getUsers());
      dispatch(onSelectUser(null));

      return { status: "success", message: "User Updated" };
    } else {
      dispatch({type:"HIDE_LOADING"})
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    dispatch({type:"HIDE_LOADING"})
    return {
      status: "error",
      message: " User have not been saved, try again.",
    };
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "users/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("User Deleted", "success", 5000));
      //dispatch({ type: DELETE_USER, payload: id });
      dispatch(getUsers());
      return { status: "success", message: "User Removed" };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " User have not been deleted, try again.",
    };
  }
};
export const onSelectUser = (data) => {
  return {
    type: SELECT_USER,
    payload: data,
  };
};
export const getUsers = () => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "users";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: GET_USERS, payload: users });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};

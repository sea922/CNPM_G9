import { baseUrl } from "../../common/baseUrl/baseUrl";
import { setAlert } from "./alert";
import { setUser, removeUser } from "../../utils/auth";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types/auth";
export const uploadImage = (id, image) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("file", image);
    const url = baseUrl + "/users/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("Image Uploaded", "success", 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};

// Register user
export const registerUser = ({
  name,
  username,
  email,
  phone,
  image,
  password,
}) => async (dispatch) => {
  try {
    dispatch({type:"SHOW_LOADING"})
    const url = baseUrl + "/users";
    const body = { name, username, email, phone, password };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    if (response.status === 400) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: REGISTER_FAIL });
      dispatch(
        setAlert(responseData.keyValue.phone + " was exist!", "error", 5000)
      );
    }
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      const { user } = responseData;
      user && setUser(user);
      if (image) dispatch(uploadImage(user._id, image)); // Upload image
      dispatch({ type: REGISTER_SUCCESS, payload: responseData });
      dispatch(setAlert("Register Success", "success", 5000));
    }
    if (responseData._message) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: REGISTER_FAIL });
      dispatch(setAlert(responseData.message, "error", 5000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch({ type: REGISTER_FAIL });
    dispatch(setAlert(error.message, "error", 5000));
  }
};

// Login user
export const login = ({ username, password }) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = baseUrl + "/users/login";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert(`Welcome ${user.name}`, "success", 5000));
    }
    if (responseData.error) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const facebookLogin = (dispatch) => async (values) => {
  try {
    const { email, userID, name } = values;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userID, name }),
    };
    const url = baseUrl + "/users/login/facebook";
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert(`Welcome ${user.name}`, "success", 5000));
    }
    if (responseData.error) {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const googleLogin = ({ profileObj }) => async (dispatch) => {
  try {
    const { email, googleId, name } = profileObj;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, googleId, name }),
    };
    const url = baseUrl + "/users/login/google";
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert(`Welcome ${user.name}`, "success", 5000));
    }
    if (responseData.error) {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = baseUrl + "/users/logout";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      removeUser();
      dispatch({ type: LOGOUT });
      dispatch(setAlert("LOGOUT Success", "success", 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

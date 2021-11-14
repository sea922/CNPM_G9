import { baseUrl } from "../../common/baseUrl/baseUrl";
import { GET_ALL_CONTACT } from "../types/contactAdmin";
import { setAlert } from "./alert";

export const getAllContact = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = baseUrl + "/contact"
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const contacts = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ALL_CONTACT, payload: contacts });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

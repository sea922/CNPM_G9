import { BASE_URL } from "../../constants/Config";
import { SEND_CONTACT_SUCCESS, SEND_CONTACT_FAIL } from "../types/contact";
import { setAlert } from "./alert";

export const uploadContactImage = (id, image) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("file", image);
    const url = BASE_URL + "contact/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert("Image Uploaded", "success", 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

// export const getCinemas = () => async (dispatch) => {
//   try {
//     const url = BASE_URL + "cinemas";
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     const cinemas = await response.json();
//     if (response.ok) {
//       dispatch({ type: GET_CINEMAS, payload: cinemas });
//     }
//   } catch (error) {
//     dispatch(setAlert(error.message, "error", 5000));
//   }
// };

export const createContact = ({ name, phone, email, message, image }) => async (
  dispatch
) => {
  try {
    const url = BASE_URL + "contact";
    const body = { name, email, phone, message };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const contact = await response.json();
    if (response.ok) {
      if (image) dispatch(uploadContactImage(contact._id, image));
      dispatch({ type: SEND_CONTACT_SUCCESS, payload: contact });
      dispatch(setAlert("Send Message Success", "success", 5000));
    }
  } catch (error) {
    dispatch({ type: SEND_CONTACT_FAIL });
    dispatch(setAlert(error.message, "error", 5000));
  }
};

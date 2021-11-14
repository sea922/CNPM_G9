import { BASE_URL } from "../../constants/Config";
import { GET_ALL_PROMOTION, SELECT_PROMOTION } from "../types/promotion";
import { setAlert } from "./alert";

export const uploadPromotionImage = (id, image) => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const data = new FormData();
    data.append("file", image);
    const url = BASE_URL + "promotions/photo/" + id;
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch(setAlert("Prmotion Uploaded", "success", 5000));
      dispatch(getPromotions());
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, "error", 5000));
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 5000));
  }
};
export const getPromotions = () => async (dispatch) => {
  dispatch({type:"SHOW_LOADING"})
  try {
    const url = BASE_URL + "promotions";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const promotions = await response.json();
    if (response.ok) {
      dispatch({type:"HIDE_LOADING"})
      dispatch({ type: GET_ALL_PROMOTION, payload: promotions });
    }
  } catch (error) {
    dispatch({type:"HIDE_LOADING"})
    dispatch(setAlert(error.message, "error", 2000));
  }
};
export const Search_full_promotion = (valueSearch) => async (dispatch) => {
  try {
    const url = BASE_URL + "promotions/search-full/" + valueSearch;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const promotions = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ALL_PROMOTION, payload: promotions });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};
export const addPromotion = (image, newPromotion) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "promotions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPromotion),
    });
    const promotion = await response.json();
    if (response.ok) {
      dispatch(setAlert("Movie have been saved!", "success", 2000));
      if (image) dispatch(uploadPromotionImage(promotion._id, image));
      dispatch(getPromotions());
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 2000));
  }
};
export const onSelectPromotion = (data) => {
  return {
    type: SELECT_PROMOTION,
    payload: data,
  };
};
export const removePromotion = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = BASE_URL + "promotions/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(setAlert("Promotion Deleted", "success", 5000));
      dispatch(getPromotions());
      dispatch(onSelectPromotion(null));
      return { status: "success", message: "Promotion Removed" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Cinema have not been deleted, try again.",
    };
  }
};

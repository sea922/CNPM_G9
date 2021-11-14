import localforage from "localforage";
import axios from "axios";

export const setToken = (token) => {
  setLocalForageToken(token);
  setHttpToken(token);
};

const setHttpToken = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const setLocalForageToken = (token) => {
  localforage.setItem("authtoken", token);
};

export { axios };

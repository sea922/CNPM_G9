import { axios } from "../helpers/auth";
import { BASE_URL } from "./../constants/Config";
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

// CREATE AN INSTANCE OF AXIOS
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});
axiosInstance.defaults.headers.common = axios.defaults.headers.common;

const postDataWithParams = async (url, data, params) => {
  try {
    const result = await axiosInstance.post(url, data, { params: params });
    return result;
  } catch (e) {
    throw e;
  }
};

const getDataByID = async (url, id) => {
  try {
    const result = await axiosInstance.get(`${url}/${id}`);
    return result;
  } catch (e) {
    throw e;
  }
};

const getDataByParams = async (url, params) => {
  try {
    const result = await axiosInstance.get(url, { params: params });
    return result;
  } catch (e) {
    throw e;
  }
};

const getTakenData = async (url) => {
  try {
    const result = await axiosInstance.get(url);
    return result;
  } catch (e) {
    throw e;
  }
};

const postDataMultipart = async (url, data) => {
  try {
    const result = await axiosInstance.post(url, data, config);
    return result;
  } catch (e) {
    throw e;
  }
};

const postData = async (url, data) => {
  try {
    const result = await axiosInstance.post(url, data);
    return result;
  } catch (e) {
    throw e;
  }
};

const deleteById = async (url, id) => {
  try {
    const result = await axiosInstance.delete(`${url}/${id}`);
    return result;
  } catch (e) {
    throw e;
  }
};

const deleteByUrl = async (url) => {
  try {
    const result = await axiosInstance.delete(url);
    return result;
  } catch (e) {
    throw e;
  }
};

const putData = async (url, id, data) => {
  try {
    const result = await axiosInstance.put(`${url}/${id}`, data);
    return result;
  } catch (e) {
    throw e;
  }
};

const putDataWithUrl = async (url, data) => {
  try {
    const result = await axiosInstance.post(url, data);
    return result;
  } catch (e) {
    throw e;
  }
};

const putDataUrl = async (url, data) => {
  try {
    const result = await axiosInstance.put(url, data);
    return result;
  } catch (e) {
    throw e;
  }
};

const putDataWithParams = async (url, id, data, params) => {
  try {
    const result = await axiosInstance.put(`${url}/${id}`, data, {
      params: params,
    });
    return result;
  } catch (e) {
    throw e;
  }
};

export {
  axiosInstance,
  postDataWithParams,
  getDataByID,
  getTakenData,
  postDataMultipart,
  postData,
  deleteById,
  putData,
  putDataWithUrl,
  putDataUrl,
  deleteByUrl,
  putDataWithParams,
  getDataByParams,
};

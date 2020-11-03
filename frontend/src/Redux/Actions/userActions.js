import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_MENU_REQUEST,
  USER_UPDATE_MENU_SUCCESS,
  USER_UPDATE_MENU_FAIL,
} from "../Types/userTypes";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", { email, password }, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, restaurantName) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password, restaurantName },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserMenuDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios(`/api/users/${id}`, config);
    console.log(data);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put("/api/users/profile", user, config);
    dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateMenu = (menu) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_MENU_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put("/api/users/menu", menu, config);
    dispatch({ type: USER_UPDATE_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_MENU_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

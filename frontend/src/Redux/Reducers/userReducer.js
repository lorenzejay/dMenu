import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_GET_MENU_REQUEST,
  USER_GET_MENU_SUCCESS,
  USER_GET_MENU_FAIL,
  USER_CREATE_MENU_SUCCESS,
  USER_CREATE_MENU_REQUEST,
  USER_CREATE_MENU_FAIL,
  USER_CREATE_MENU_RESET,
  USER_GET_MENU_ITEM_FAIL,
  USER_GET_MENU_ITEM_SUCCESS,
  USER_GET_MENU_ITEM_REQUEST,
  USER_DELETE_MENU_ITEM_REQUEST,
  USER_DELETE_MENU_ITEM_SUCCESS,
  USER_DELETE_MENU_ITEM_FAIL,
  USER_UPDATE_MENU_ITEM_REQUEST,
  USER_UPDATE_MENU_ITEM_SUCCESS,
  USER_UPDATE_MENU_ITEM_FAIL,
  USER_UPDATE_MENU_ITEM_RESET,
} from "../Types/userTypes";

const userLoginReducer = (initialState = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { isLoading: true };
    case USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { isLoading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return initialState;
  }
};

const userRegisterReducer = (initialState = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { isLoading: true };
    case USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { isLoading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return initialState;
  }
};

export const userMenuReducer = (state = { menu: {} }, action) => {
  switch (action.type) {
    case USER_GET_MENU_REQUEST:
      return { ...state, isLoading: true };
    case USER_GET_MENU_SUCCESS:
      return { isLoading: false, success: true, menu: action.payload };
    case USER_GET_MENU_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const userCreateMenuItemReducer = (state = { menuItem: {} }, action) => {
  switch (action.type) {
    case USER_CREATE_MENU_REQUEST:
      return { ...state, isLoading: true };
    case USER_CREATE_MENU_SUCCESS:
      return { isLoading: false, success: true, menuItem: action.payload };
    case USER_CREATE_MENU_FAIL:
      return { isLoading: false, error: action.payload };
    case USER_CREATE_MENU_RESET:
      return {};
    default:
      return { ...state };
  }
};
export const userGetMenuItemReducer = (state = { menuItem: {} }, action) => {
  switch (action.type) {
    case USER_GET_MENU_ITEM_REQUEST:
      return { ...state, isLoading: true };
    case USER_GET_MENU_ITEM_SUCCESS:
      return { isLoading: false, success: true, menuItem: action.payload };
    case USER_GET_MENU_ITEM_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export const userDeleteMenuItemReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_MENU_ITEM_REQUEST:
      return { ...state, isLoading: true };
    case USER_DELETE_MENU_ITEM_SUCCESS:
      return { isLoading: false, success: true };
    case USER_DELETE_MENU_ITEM_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export const userUpdateMenuItemReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_MENU_ITEM_REQUEST:
      return { ...state, isLoading: true };
    case USER_UPDATE_MENU_ITEM_SUCCESS:
      return { isLoading: false, success: true, menuItem: action.payload };
    case USER_UPDATE_MENU_ITEM_FAIL:
      return { isLoading: false, error: action.payload };
    case USER_UPDATE_MENU_ITEM_RESET:
      return {};
    default:
      return { ...state };
  }
};

export { userLoginReducer, userRegisterReducer };

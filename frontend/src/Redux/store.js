import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userCreateMenuItemReducer,
  userDeleteMenuItemReducer,
  userGetMenuItemReducer,
  userLoginReducer,
  userMenuReducer,
  userRegisterReducer,
  userUpdateMenuItemReducer,
} from "./Reducers/userReducer";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  userMenu: userMenuReducer,
  userCreateMenuItem: userCreateMenuItemReducer,
  userGetMenuItem: userGetMenuItemReducer,
  userDeleteMenuItem: userDeleteMenuItemReducer,
  userUpdateMenuItem: userUpdateMenuItemReducer,
});
const middlewares = [thunk];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

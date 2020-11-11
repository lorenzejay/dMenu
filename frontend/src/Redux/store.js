import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userCreateMenuItemReducer,
  userDetailsReducer,
  userLoginReducer,
  userMenuReducer,
  userRegisterReducer,
  userUpdateMenuReducer,
} from "./Reducers/userReducer";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  menuUpdate: userUpdateMenuReducer,

  userMenu: userMenuReducer,
  userCreateMenuItem: userCreateMenuItemReducer,
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

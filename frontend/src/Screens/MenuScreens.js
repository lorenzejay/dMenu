import React, { useEffect, useState } from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../Redux/Actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const MenuScreens = ({ history }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (user === {}) {
        dispatch(getUserDetails("profile"));
      }
    }
  }, [userInfo, user]);

  return (
    <div className="menu-section">
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {user.menu &&
        user.menu.map((item, i) => (
          <div key={i}>
            <MenuItemCard item={item} />
          </div>
        ))}
    </div>
  );
};

export default MenuScreens;

import React, { useEffect, useState } from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { useSelector, useDispatch } from "react-redux";
import { getMenu, getUserMenuDetails } from "../Redux/Actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const MenuScreens = ({ history }) => {
  const dispatch = useDispatch();

  const userMenu = useSelector((state) => state.userMenu);
  const { isLoading, error, success, menu } = userMenu;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMenu(userInfo._id));
    }
  }, [userInfo, success]);

  return (
    <div className="menu-section">
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {menu &&
        menu.map((item, i) => (
          <div key={i}>
            <MenuItemCard item={item} />
          </div>
        ))}
    </div>
  );
};

export default MenuScreens;

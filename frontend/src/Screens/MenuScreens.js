import React, { useEffect, useState } from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../Redux/Actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const MenuScreens = ({ history }) => {
  const [filterBy, setFilterBy] = useState("All");
  const [menuItems, setMenuItems] = useState();
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

  //filter by
  useEffect(() => {
    //create filter
    if (menu) {
      const filteredByCategory = menu.filter((item) => item.category === filterBy);
      if (filterBy === "All") {
        setMenuItems(menu);
      } else {
        setMenuItems(filteredByCategory);
      }
    }
  }, [success, filterBy]);
  console.log(filterBy, menuItems);

  return (
    <div className="menu-section">
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <div className="menu-section-header">
        <h1>{userInfo.restaurantName}</h1>
        <div className="menu-section-options">
          <p onClick={(e) => setFilterBy(e.target.textContent)}>All</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Breakfast</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Lunch</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Dinner</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Drinks</p>
        </div>
      </div>
      <div className="menu-section-items">
        {menuItems &&
          menuItems.map((item, i) => (
            <div key={i}>
              <MenuItemCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuScreens;

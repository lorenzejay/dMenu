import React, { useEffect, useState } from "react";
import MenuItemCard from "../Components/MenuItemCard";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../Redux/Actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const MenuScreens = ({ match }) => {
  const userId = match.params.id;
  const [filterBy, setFilterBy] = useState("All");
  const [menuItems, setMenuItems] = useState();
  const dispatch = useDispatch();
  const userMenu = useSelector((state) => state.userMenu);
  const { isLoading, error, success, menu } = userMenu;

  //not a logged in user
  useEffect(() => {
    dispatch(getMenu(userId));
  }, [dispatch, userId, success]);

  //filter by
  useEffect(() => {
    //create filter
    if (menu) {
      const filteredByCategory =
        menu.menu && menu.menu.filter((item) => item.category === filterBy);
      if (filterBy === "All") {
        setMenuItems(menu.menu);
      } else {
        setMenuItems(filteredByCategory);
      }
    }
  }, [success, filterBy]);

  return (
    <div className="menu-section">
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <div className="menu-section-header">
        <h1>{menu.restaurantName}</h1>
        <div className="menu-section-options">
          <p onClick={(e) => setFilterBy(e.target.textContent)}>All</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Breakfast</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Lunch</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Dinner</p>
          <p onClick={(e) => setFilterBy(e.target.textContent)}>Sides</p>
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

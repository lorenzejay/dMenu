import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

import { getUserMenuDetails, updateMenu } from "../Redux/Actions/userActions";

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch();
  //GET MENU
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;
  const [menu, setMenu] = useState([]);
  const menuUpdate = useSelector((state) => state.menuUpdate);
  const { success } = menuUpdate;

  //UPDATE MENU
  const [menuItemName, setMenuItemName] = useState("");
  const [menuItemImage, setMenuItemImage] = useState("");
  const [menuItemCalories, setMenuItemCalories] = useState();
  const [menuItemDescription, setMenuItemDescription] = useState("");
  const [menuItemPrice, setMenuItemPrice] = useState();
  const [menuItemCategory, setMenuItemCategory] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.menu) {
        dispatch(getUserMenuDetails("menu"));
      } else {
        setMenu(user.menu);
      }
    }
  }, [dispatch, history, user, userInfo, success]);

  useEffect(() => {
    if (success) {
      dispatch(getUserMenuDetails("menu"));
    }
  }, [success]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(error);
    });
  const handleSetImage = async (e) => {
    setMenuItemImage(e.target.value);
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const convertedFile = await toBase64(file);
    console.log(convertedFile);
    setMenuItemImage(convertedFile);
  };

  const handleUpdate = () => {
    dispatch(
      updateMenu({
        name: menuItemName,
        image: menuItemImage,
        description: menuItemDescription,
        category: menuItemCategory,
        price: menuItemPrice,
        calories: menuItemCalories,
      })
    );
  };

  return (
    <div className="admin-screen">
      <Link to="/user/menu">View Menu Here</Link>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <div className="admin-content">
        <form className="admin-add-item-form">
          <h3>Add Items to your Menu</h3>
          <input
            placeholder="Dish Name"
            type="text"
            value={menuItemName}
            onChange={(e) => setMenuItemName(e.target.value)}
          />
          <input type="file" accept="image/png, image/jpeg" onChange={handleSetImage} />
          <input
            placeholder="Calories"
            type="number"
            value={menuItemCalories || ""}
            onChange={(e) => setMenuItemCalories(e.target.value)}
          />
          <input
            placeholder="Category"
            type="text"
            value={menuItemCategory}
            onChange={(e) => setMenuItemCategory(e.target.value)}
          />
          <input
            placeholder="Description"
            type="text"
            value={menuItemDescription}
            onChange={(e) => setMenuItemDescription(e.target.value)}
          />
          <input
            placeholder="Price"
            type="text"
            value={menuItemPrice || ""}
            onChange={(e) => setMenuItemPrice(e.target.value)}
          />

          <button type="button" onClick={handleUpdate}>
            Add your new dish
          </button>
        </form>
        <div className="admin-menu">
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Food</th>
                <th>Image</th>
                <th>Calories</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </tbody>

            {menu.map((item, i) => (
              <tbody key={i}>
                <tr>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.image} alt={item.description} style={{ objectFit: "cover" }} />
                  </td>
                  <td>{item.calories}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;

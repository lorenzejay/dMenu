import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { getMenuItem } from "../Redux/Actions/userActions";
import { FaTrash, FaEdit } from "react-icons/fa";
import { USER_CREATE_MENU_RESET } from "../Redux/Types/userTypes";
import axios from "axios";
import MenuItemCard from "../Components/MenuItemCard";

const MenuItemEditScreen = ({ history, match }) => {
  const menuId = match.params.id;
  const dispatch = useDispatch();
  //GET MENU
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userGetMenuItem = useSelector((state) => state.userGetMenuItem);
  const { isLoading, error, success, menuItem } = userGetMenuItem;

  // const userCreateMenuItem = useSelector((state) => state.userCreateMenuItem);
  // const {
  //   isLoading: createLoading,
  //   error: createError,
  //   success: createSuccess,
  //   menuItem,
  // } = userCreateMenuItem;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMenuItem(menuId));
    }
  }, []);

  const handleImageSubmit = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  //   const handleUpdate = (e) => {
  //     e.preventDefault();
  //     dispatch(createMenuItem(userInfo._id, { name, image, calories, description, price, category }));
  //   };

  console.log(menuItem);
  return (
    <div className="menu-item-edit-screen">
      <Link to="/user/editmenu">Back</Link>

      <div className="menu-item-edit-content">
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <div className="menu-item-edit-form-item">
          <div className="menu-item-edit-form">
            <form>
              <h1>Edit Item</h1>
              <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Image URL here or use selector below"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <input name="image-selector" type="file" onChange={handleImageSubmit} />

              <textarea
                rows="4"
                cols="50"
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                placeholder="Calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <input
                placeholder="Category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <button type="submit">Add to menu</button>
            </form>
          </div>
          <div>
            <h1>Your Item</h1>
            <MenuItemCard item={menuItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemEditScreen;

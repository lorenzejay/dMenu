import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { getMenuItem, updateMenuItem } from "../Redux/Actions/userActions";
import axios from "axios";
import MenuItemCard from "../Components/MenuItemCard";
import { USER_UPDATE_MENU_ITEM_RESET } from "../Redux/Types/userTypes";

const ProfileEditScreen = ({ history, match }) => {
  const menuId = match.params.id;
  const dispatch = useDispatch();
  //GET MENU
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userGetMenuItem = useSelector((state) => state.userGetMenuItem);
  const { isLoading, error, menuItem } = userGetMenuItem;

  const userUpdateMenuItem = useSelector((state) => state.userUpdateMenuItem);
  const {
    isLoading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateMenuItem;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [, setUploading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_MENU_ITEM_RESET });
      history.push(`/user/menu/${menuId}`);
    }
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!menuItem.name) {
        dispatch(getMenuItem(menuId));
      } else {
        setName(menuItem.name);
        setImage(menuItem.image);
        setCalories(menuItem.calories);
        setDescription(menuItem.description);
        setPrice(menuItem.price);
        setCategory(menuItem.category);
      }
    }
  }, [dispatch, history, userInfo, menuId, menuItem, successUpdate]);

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

  const handleUpdateMenuItem = (e) => {
    e.preventDefault();
    dispatch(updateMenuItem(menuId, { name, image, calories, description, price, category }));
  };

  return (
    <div className="menu-item-edit-screen">
      <Link to="/user/editmenu">Back</Link>

      <div className="menu-item-edit-content">
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        <div className="menu-item-edit-form-item">
          <div className="menu-item-edit-form">
            <form onSubmit={handleUpdateMenuItem}>
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
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                placeholder="Calories"
                type="number"
                value={calories || ""}
                onChange={(e) => setCalories(e.target.value)}
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Sides">Sides</option>
                <option value="Drinks">Drinks</option>
              </select>
              <button type="submit">Update</button>
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

export default ProfileEditScreen;

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { createMenuItem, deleteMenuItem, getMenu } from "../Redux/Actions/userActions";
import { FaTrash, FaEdit } from "react-icons/fa";
import { USER_CREATE_MENU_RESET } from "../Redux/Types/userTypes";
import axios from "axios";

const AdminScreen = ({ history }) => {
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  //GET MENU
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userMenu = useSelector((state) => state.userMenu);
  const { isLoading, error, success, menu } = userMenu;

  const userDeleteMenuItem = useSelector((state) => state.userDeleteMenuItem);
  const {
    isLoading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = userDeleteMenuItem;

  const userCreateMenuItem = useSelector((state) => state.userCreateMenuItem);
  const {
    isLoading: createLoading,
    error: createError,
    success: createSuccess,
  } = userCreateMenuItem;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      history.push("/login");
    } else {
      dispatch(getMenu(userInfo._id));
    }
    if (createSuccess) {
      setName("");
      setImage("");
      setCalories("");
      setDescription("");
      setPrice("");
      setCategory("");
      dispatch({ type: USER_CREATE_MENU_RESET });
    }
  }, [dispatch, history, userInfo, success, createSuccess, deleteSuccess, userLogin]);

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

  const handleCreate = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      image === "" ||
      calories === "" ||
      description === "" ||
      price === "" ||
      category === ""
    ) {
      setFormError("All values must be filled in order to submit.");
    } else {
      dispatch(
        createMenuItem(userInfo._id, { name, image, calories, description, price, category })
      );
    }
  };

  const deleteItemHandler = (menuItemId) => {
    window.confirm("Are you sure?");
    dispatch(deleteMenuItem(menuItemId));
  };
  return (
    <div className="admin-screen">
      <h1>Edit Menu</h1>

      {userInfo && (
        <div className="admin-links">
          <Link to={`/menu/${userInfo._id}`}>View Menu Here</Link>
          <Link to={`/qrcode/${userInfo._id}`}>View QR Code Here</Link>
        </div>
      )}

      <div className="admin-content">
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <div className="admin-create-table">
          {createLoading && <Loader />}
          {createError && <Message variant="danger">{createError}</Message>}
          {deleteLoading && <Loader />}
          {deleteError && <Message variant="dangder">{deleteError}</Message>}
          <form onSubmit={handleCreate}>
            {formError && <Message variant="danger">{formError}</Message>}
            <h1>Create Item</h1>
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Sides">Sides</option>
              <option value="Drinks">Drinks</option>
            </select>
            <button type="submit">Add to menu</button>
          </form>

          <Table responsive striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Food</th>
                <th>Image</th>
                <th>Calories</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
              </tr>
            </tbody>

            {menu.menu &&
              menu.menu.map((item, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.image} alt={item.description} style={{ objectFit: "cover" }} />
                    </td>
                    <td>{item.calories}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td>{item.category}</td>
                    <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Link to={`/menuitem/${item._id}`}>
                        <FaEdit size={20} />
                      </Link>

                      <FaTrash
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteItemHandler(item._id)}
                      />
                    </td>
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

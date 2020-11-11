import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Button from "../Components/Button/index";
import { createMenuItem, getMenu } from "../Redux/Actions/userActions";
import { FaTrash, FaEdit } from "react-icons/fa";
import { USER_CREATE_MENU_RESET } from "../Redux/Types/userTypes";

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch();
  //GET MENU
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userMenu = useSelector((state) => state.userMenu);
  const { isLoading, error, success, menu } = userMenu;

  const userCreateMenuItem = useSelector((state) => state.userCreateMenuItem);
  const {
    isLoading: createLoading,
    error: createError,
    success: createSuccess,
    menuItem,
  } = userCreateMenuItem;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [calories, setCalories] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (createSuccess) {
      setName("");
      setImage("");
      setCalories();
      setDescription("");
      setPrice();
      setCategory("");
      dispatch({ type: USER_CREATE_MENU_RESET });
    }
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMenu(userInfo._id));
    }
  }, [dispatch, history, userInfo, success, createSuccess]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createMenuItem(userInfo._id, { name, image, calories, description, price, category }));
  };
  return (
    <div className="admin-screen">
      <h1>Edit Menu</h1>
      <Link to="/user/menu">View Menu Here</Link>

      <div className="admin-content">
        {isLoading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <div className="admin-create-table">
          {createLoading && <Loader />}
          {createError && <Message>{createError}</Message>}
          <form onSubmit={handleCreate}>
            <h1>Create Item</h1>
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <textarea
              rows="4"
              cols="50"
              placeholder="Description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>

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
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Food</th>
                <th>Image</th>
                <th>Calories</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
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
                  <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to="/menu/:id">
                      <FaEdit size={20} />
                    </Link>

                    <FaTrash size={20} style={{ cursor: "pointer" }} />
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

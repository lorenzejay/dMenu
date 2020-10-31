import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

import { getUserDetails } from "../Redux/Actions/userActions";

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;
  const [menu, setMenu] = useState([]);

  console.log(user);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.menu) {
        dispatch(getUserDetails("profile"));
      } else {
        setMenu(user.menu);
      }
    }
  }, [dispatch, history, user, userInfo]);
  console.log(menu);

  return (
    <div className="admin-screen">
      <Link to="/user/menu">Menu</Link>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <div className="admin-content">
        <form className="admin-add-item-form">
          <h3>Add Items to your Menu</h3>
          <input placeholder="Dish Name" />
          <input placeholder="Image" />
          <input placeholder="Calories" />
          <input placeholder="Description" />
          <input placeholder="Price" />
          <button>Add New Dish</button>
        </form>
        <div className="admin-menu">
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Dish</th>
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

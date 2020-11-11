import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";
//add links later
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          dMenu
        </Link>
      </div>
      {!userInfo ? (
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-links">
          <li>Welcome {userInfo.name}</li>

          <li>
            <Link to="/user/editmenu">Menu</Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;

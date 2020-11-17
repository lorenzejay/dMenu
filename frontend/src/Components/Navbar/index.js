import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";
import { Navbar } from "react-bootstrap";
//add links later
const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };
  console.log(userInfo);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Di Menu</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <Nav>
                  <LinkContainer to="/user/editmenu">
                    <Nav.Link>
                      <i class="fas fa-carrot"></i>Edit Menu
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    // <div className="nav-wrapper">
    //   <nav className="navbar">
    //     <div className="logo">
    //       <Link to="/" className="logo-link">
    //         <span style={{ textTransform: "none" }}>Le Menu</span>
    //       </Link>
    //     </div>
    //     {!userInfo ? (
    //       <ul className={`nav-links ${navActive ? "nav-active" : ""}`}>
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/register">Register</Link>
    //         </li>
    //       </ul>
    //     ) : (
    //       <ul className="nav-links">
    //         <li>Welcome {userInfo.name}</li>

    //         <li>
    //           <Link to="/user/editmenu">Edit Menu</Link>
    //         </li>
    //         <li>
    //           <Link to="/login" onClick={handleLogout}>
    //             Logout
    //           </Link>
    //         </li>
    //       </ul>
    //     )}
    //     <div className="burger" onClick={() => setNavActive(!navActive)}>
    //       <div></div>
    //       <div></div>
    //       <div></div>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Header;

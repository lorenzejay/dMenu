import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "../Form/index";
import Input from "../Input";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/index";
import Message from "../Message/index";
import { register } from "../../Redux/Actions/userActions";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error, userInfo } = userRegister;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userInfo) {
      history.push("/user/admin");
    }
  }, [history, userInfo]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, restaurantName));
    }
  };

  return (
    <div className="register-page">
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <div className="register-content">
        <img src={"/clipart/undraw_cooking_lyxy.png"} />
        <Form title="Register" handleSubmit={handleRegister}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Full Name"
            type="text"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Buisness Name"
            type="text"
            value={restaurantName}
            handleChange={(e) => setRestaurantName(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;

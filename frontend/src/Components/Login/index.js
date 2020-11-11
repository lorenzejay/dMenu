import React, { useState, useEffect } from "react";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/Actions/userActions";
import Loader from "../Loader";
import Message from "../Message";

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error, userInfo } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      history.push("/user/editmenu");
    }
  }, [history, userInfo]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-page">
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <div className="login-content">
        <img src={"/clipart/undraw_Chef_cu0r.png"} />
        <Form title="Login" handleSubmit={handleLogin}>
          <Input
            placeholder="Email"
            name="email"
            value={email}
            type="text"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type={"submit"}>Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

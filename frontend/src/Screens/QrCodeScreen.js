import React, { useEffect } from "react";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../Redux/Actions/userActions";
import { Link } from "react-router-dom";

const QrCodeScreen = (match, history) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMenu(userInfo._id));
    }
  }, [dispatch]);
  return (
    <div className="qr-order-screen">
      <Link to="/user/editmenu">Back</Link>
      <div className="qr-content-screen">
        <h1>{userInfo.restaurantName}</h1>
        <p>View menu here</p>
        <QRCode value={`http://dimenu.herokuapp.com/menu/${userInfo._id}`} />
      </div>
    </div>
  );
};

export default QrCodeScreen;

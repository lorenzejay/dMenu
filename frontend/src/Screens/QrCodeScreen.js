import React from "react";
import QRCode from "qrcode.react";

const QrCodeScreen = (match) => {
  return (
    <div className="qr-order-screen">
      <h1>QR Code</h1>
      <QRCode value="https://www.google.com/docs/about/" />
    </div>
  );
};

export default QrCodeScreen;

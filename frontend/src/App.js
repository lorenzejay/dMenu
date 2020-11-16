import React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar/index";
import MenuScreens from "./Screens/MenuScreens";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminScreen from "./Screens/AdminScreen";
import MenuItemEditScreen from "./Screens/MenuItemEditScreen";
import QrCodeScreen from "./Screens/QrCodeScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="app-contents">
          <Route exact path="/" component={LandingPage} />
          <Route path="/menu/:id" component={MenuScreens} />
          <Route path="/user/editmenu" component={AdminScreen} />
          <Route path="/qrcode/:id" component={QrCodeScreen} />
          <Route path="/menuitem/:id" component={MenuItemEditScreen} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar/index";
import MenuScreens from "./Screens/MenuScreens";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminScreen from "./Screens/AdminScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="app-contents">
          <Route exact path="/" component={LandingPage} />
          <Route path="/user/menu" component={MenuScreens} />
          <Route path="/user/editmenu" component={AdminScreen} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

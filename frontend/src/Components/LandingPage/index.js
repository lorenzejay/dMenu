import React from "react";
import "./styles.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-contents">
        <h1>Welcome To dMenu</h1>
        <p>Digitalizing your menus into a QR code.</p>

        <div className="landing-page-mission-statement">
          <h3>Our mission statement</h3>
          <p>
            We understand that many restaurants have been struggling during the shutdowns caused by
            Covid-19.
          </p>
          <p>
            Our goal is let your restuarant buisness reopen as well as accomplish the safety
            measures by allowing your menus to be accessed from outside your restuarant.
          </p>
          <p>
            With a digitalized Menu, your guests can choose what food they want without stepping
            inside your restaurant, maintaining safety for your employees and guests. Additional
            features may include guests making purchases from this site as well, if you do not
            already have an online system.
          </p>
          <h3>How do I use this?</h3>
          <p>
            Simple, restaurant owners just have to create an account. Once logged in, they can input
            their mouthwatering foods onto our premium menu themes.
          </p>
          <p>After you complete adding your menu, we will generate a QR code for you.</p>
          <p>Print that code out and post it outside your restaurant. </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

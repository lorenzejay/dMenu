import React from "react";
import "./styles.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-contents">
        <h1>Welcome to Le Menu</h1>
        <p>Modern, Minimalistic and Simple</p>

        <div className="landing-page-mission-statement">
          <h2>Our mission</h2>
          <p>
            Our goal is to deliver a modern, safer, and digital substitute for your paper menus. We
            know COVID-19 has impacted many restaurants. Based in Los Angeles, there are many
            restrictions towards many restaurant businesses. Instead of exposing your employees or
            customers, we have built an easy to use application that will bring your menu into your
            patrons smartphone without having to touch a physical menu. Let us help you turn back
            the fight against COVID-19 and reopen your buisness safely.
          </p>
          <p>
            Our goal is let your restuarant buisness reopen safely by minimizing handing out menus
            to your guests. Now your employees no longer have to sanitize every menu before and
            after every customer. Your customer will now have your menu and be ready to order once
            their waiter arrives.
          </p>
          <p>
            With a
            <span style={{ textDecoration: "underline", fontWeight: "bold" }}> digitalized </span>
            menu, your guests can choose what food they want without stepping inside your
            restaurant, maintaining safety for your employees and guests. Additional features may
            include guests making purchases from this site as well, if you do not already have an
            online system.
          </p>
          <p>
            If this sounds like something you like, create an account and let us help you create
            your digitalized menu.
          </p>
        </div>
        <img src={"/clipart/undraw_Chef_cu0r.png"} alt="chefs ready to cook." />
        <div className="q-a">
          <h2>Q/A:</h2>
          <h3>How do I use this as a Restaurant Owner?</h3>
          <ol>
            <li>Create an account.</li>
            <li>
              Click on Menu. This is where you can add your items categorized by Breakfast, Lunch,
              Dinner, Sides and Drinks.
            </li>
            <li>
              After creating items, you should view how your new digitalized menu looks like. Adding
              items will automatically generate your QR Code.
            </li>
            <li>
              If you are satisfied with the way everything looks, return to your Edit Menu and then
              press on View QR Code.
            </li>
            <li>Print out your QR Code and you're all set.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

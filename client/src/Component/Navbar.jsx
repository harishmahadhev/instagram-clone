import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { refreshPage } from "./Shared";
import dp from "../images/default.jpg";
import Cookies from "js-cookie";

export default function Navbar({ profile }) {
  const [active, setActive] = useState(1);
  const [dropDown, setdropDown] = useState(false);
  const handleChange = (index) => {
    setActive(index);
  };

  const logout = () => {
    Cookies.remove("--t");
    refreshPage();
  };
  const handleClick = () => {
    logout();
  };
  return (
    <div className="Navbar">
      <div className="container">
        <div className="navLogo">
          <Link to="/">
            <img src={logo} alt="Instagram" />
          </Link>
        </div>

        <div className="navSearch">
          <input
            type="text"
            placeholder="&#xF002; Search"
            style={{ fontFamily: "Arial, FontAwesome" }}
          />
        </div>

        <div className="navIcons">
          <Link to="/app/home" onClick={() => handleChange(1)}>
            <i
              className={
                active === 1
                  ? "bi bi-house-door-fill active"
                  : "bi bi-house-door-fill"
              }
            ></i>
          </Link>

          <Link to="/app/profile" onClick={() => handleChange(4)}>
            <i
              className={
                active === 4 ? "bi bi-person-fill active" : "bi bi-person-fill"
              }
            ></i>
          </Link>
          <Link to="/app/create" onClick={() => handleChange(3)}>
            <i
              className={
                active === 3
                  ? "bi bi-plus-circle-fill active"
                  : "bi bi-plus-circle-fill"
              }
            ></i>
          </Link>
          <img
            src={profile.profile ? profile.profile.pic : dp}
            alt=""
            onClick={() => {
              setdropDown((on) => !on);
            }}
          />
        </div>
      </div>
      <div className={`logoutPop ${dropDown ? "active" : null}`}>
        <ul>
          <li onClick={handleClick}>
            <i className="bi bi-box-arrow-right"></i>Log out
          </li>
        </ul>
      </div>
    </div>
  );
}

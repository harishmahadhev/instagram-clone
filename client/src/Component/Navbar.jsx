import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { refreshPage } from "./Shared";
import dp from "../images/default.jpg";
import Cookies from "js-cookie";

export default function Navbar({ profile, users }) {
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState("");
  const [dropDown, setdropDown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const outside = useRef();
  const handleChange = (index) => {
    setActive(index);
  };

  const logout = () => {
    Cookies.remove("--t");
    refreshPage();
  };
  const handleClick = (e) => {
    if (outside.current.contains(e.target)) {
      return;
    }
    setShowSearch(false);
  };
  useEffect(() => {
    const getclick = document.addEventListener("click", handleClick);
    return () => {
      getclick();
    };
  }, []);

  return (
    <div className="Navbar" ref={outside}>
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
            onFocus={() => setShowSearch(true)}
            onChange={(e) => setSearch(e.target.value)}
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
          <li onClick={() => logout()}>
            <i className="bi bi-box-arrow-right"></i>Log out
          </li>
        </ul>
      </div>
      <div className={`Searchpopup ${showSearch ? "active" : ""}`}>
        <ul>
          {users
            .filter((user) => user._id !== profile.profile._id)
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <li key={user._id}>
                <Link
                  to={`/app/profile/${user._id}`}
                  onClick={() => {
                    setShowSearch(false);
                    setSearch("");
                  }}
                >
                  <img src={user.pic} alt="Profile" />
                  <span>{user.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

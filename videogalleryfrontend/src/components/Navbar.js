import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { UserContext } from "../context/UserContext";
import MenuNoSession from "./MenuNoSession";
import MenuSession from "./MenuSession";

const Navbar = () => {
  
  const { session } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <img className="color-image" src={Logo} alt="Video gallery logo" height="50" />
          Video Gallery
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/videos"
                className="nav-link"
                aria-current="page"
              >
                Videos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link bg-transparent border-0"
                href="/"
                id="userOptions"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="bi bi-person-circle text-white"
                  style={{ fontSize: 18 }}
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-end" 
                aria-labelledby="userOptions"
              >
                {session ? <MenuSession /> : <MenuNoSession />}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

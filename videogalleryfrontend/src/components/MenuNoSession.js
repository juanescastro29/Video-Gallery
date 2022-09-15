import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const MenuNoSession = () => {
  return (
    <>
      <li>
        <NavLink
          to="/register"
          className="dropdown-item"
          style={({ isActive }) => ({
            background: isActive && "#6c757d",
          })}
        >
          Register
        </NavLink>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <NavLink
          to="/login"
          className="dropdown-item"
          style={({ isActive }) => ({
            background: isActive && "#6c757d",
          })}
        >
          Log In
        </NavLink>
      </li>
    </>
  );
};

export default MenuNoSession;

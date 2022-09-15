import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import './Navbar.css'

const MenuSession = () => {

  const {setUser, setSession} = useContext(UserContext)
  const navigate = useNavigate()

  function logout () {
    window.localStorage.removeItem("session");
    setSession(false);
    setUser(null);
    navigate("/")
  }

  return (
    <>
      <li>
        <NavLink to="/profile" className="dropdown-item" style={({ isActive }) => ({
            background: isActive && "#6c757d",
          })}>
          My profile
        </NavLink>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <NavLink to="" className="dropdown-item" style={({ isActive }) => ({
            background: isActive && "#6c757d",
          })} onClick={() => (logout())}>
          Log Out
        </NavLink>
      </li>
    </>
  );
};

export default MenuSession;

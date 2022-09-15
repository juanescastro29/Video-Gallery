import React from "react";
import { NavLink } from 'react-router-dom'
import Logo from "../assets/logo.png";

const Footer = () => {

  return (
    <div className="container-fluid" style={{background: "black"}}>
      <footer className="d-flex justify-content-between align-items-center py-2" style={{height: "81px"}}>

        <p className="col-md-4 text-center" style={{color: "white"}}>
          © 2022 Video Gallery
        </p>

        <NavLink
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center"
        >
          <img src={Logo} alt="Video gallery logo" height="50" />
        </NavLink>

        <ul className="nav col-md-4 justify-content-center">
          <li className="nav-item">
            <a href="https://github.com/juanescastro29/Video-Gallery" className="nav-link px-2 text-white" target="_blank" rel="noreferrer">
            <i className="bi bi-git" style={{ fontSize: 22 }}></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/juanescastro29" className="nav-link px-2 text-white" target="_blank" rel="noreferrer">
              <i className="bi bi-github" style={{ fontSize: 22 }}></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="https://www.linkedin.com/in/juan-esteban-castro-molano-248912150/" className="nav-link px-2 text-white" target="_blank" rel="noreferrer">
              <i className="bi bi-linkedin" style={{ fontSize: 22 }}></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;

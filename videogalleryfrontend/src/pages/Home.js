import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user.userEmail);

  return (
    <div className="container-lg my-5 mb-5 p-4 align-items-center justify-content-center">
      <div className="row g-2 p-4">
        <div className="col-md-6 bg bg-dark text-white d-flex align-items-center text-center p-4">
          <h1>
            Welcome to <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video
            Gallery
          </h1>
        </div>
        <div className="col-md-6 p-4">
          <h1>How to use?</h1>
          <p style={{ textAlign: "justify" }}>
            Hello, next we will give a detailed description on how to use Video
            Gallery.
          </p>
          <ul
            className="list-group list-group-flush"
            style={{ textAlign: "justify" }}
          >
            <li
              className="list-group-item"
              style={{ backgroundColor: "transparent" }}
            >
              1. To use Video Gallery you must be a registered user and you must
              have your email account verified.
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "transparent" }}
            >
              2. After you have logged in you will have access to Video Gallery.
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "transparent" }}
            >
              3. You will find a space where you can paste a Youtube link which
              will save the video in your personal gallery by clicking on the
              "Add video" button.
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "transparent" }}
            >
              4. Done, that's how easy it is to use Video Gallery.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

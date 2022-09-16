import React from "react";
import Carousel from "../components/Carousel";
import Logo from "../assets/logo-carousel.png";
import Image1 from "../assets/carousel-1.jpg";
import Form from "../components/FormLogin";
import './Login.css'

const Login = () => {
  const images = [
    { id: "0", src: Logo },
    {
      id: "1",
      src: Image1,
    },
  ];

  return (
    <div className="container-lg my-5 mb-5 p-4 align-items-center justify-content-center">
      <div className="row g-2 p-4 background rounded-4">
        <div className="col-md-7 p-4">
          <Carousel images={images} />
        </div>
        <div className="col-md-5 p-4 d-flex align-items-center">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Login;

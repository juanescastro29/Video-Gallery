import React from "react";
import Carousel from "../components/Carousel";
import Logo from "../assets/logo-carousel.png";
import Image1 from "../assets/carousel-1.jpg";
import FormLogin from "../components/FormLogin";

const Login = () => {
  const images = [
    { id: "0", src: Logo },
    {
      id: "1",
      src: Image1,
    },
  ];

  return (
    <div className="container-xl p-4 align-items-center justify-content-center">
      <div className="row g-2 p-4 background">
        <div className="col-md-7 p-4">
          <Carousel images={images} />
        </div>
        <div className="col-md-5 p-4 d-flex align-items-center">
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;

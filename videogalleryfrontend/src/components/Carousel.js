import React from "react";

const Carousel = ({ images }) => {
  return (

    <div id="carouselVG" className="carousel slide p-2" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map(({ src, id }) => (
          <div
            className="carousel-item active"
            data-bs-interval="3000"
            key={id}
          >
            <img
              src={src}
              className="d-block w-100 rounded-3"
              alt="..."
              height={360}
              style={{width: "100%"}}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselVG"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

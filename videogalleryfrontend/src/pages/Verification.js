import React from "react";
import { useLocation } from "react-router-dom";

const Verification = () => {
  const location = useLocation();
  const userId = location.state.userId;

  return (
    <div className="container vh-100 justify-content-center align-items-center d-flex">
      <div className="row row g-1 p-3 m-4 border border-dark rounded">
        <div className="col-12 text-center p-2">
          <h3>
            Your user its not verified.
            <br /> Please check your email and copy the code for verified your
            account.
          </h3>
        </div>
        <div className="col-12 p-3">
          <label className="fs-5">Verification code:</label>
          <input type="text" className="m-2"></input>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary m-2">
            Resend code
          </button>
          <button type="submit" className="btn btn-primary m-2">
            Validate code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Verification = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const { setUser, setSession } = useContext(UserContext);
  const [time, setTime] = useState(40);
  const [responseBack, setResponseBack] = useState("");
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  var count;
  useEffect(() => {
    if (time > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      count = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }
    return () => clearInterval(count);
  }, [time]);

  function resendCode() {
    fetch(`http://localhost:8080/user/verificationEmail/resend/${userId}`, {
      method: "POST",
    });
    setResponseBack("¡Code resend successfull!");
    setTime(40);
  }

  async function validateCode() {
    const data = {
      verificationCode: code,
    };
    const response = await fetch(
      `http://localhost:8080/user/verifyUser/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const dataBackend = await response.json();
    if (!dataBackend.error) {
      window.localStorage.setItem("user", JSON.stringify(dataBackend.user));
      setUser(dataBackend.user);
      window.localStorage.setItem("session", true);
      setSession(true);
      navigate(dataBackend.route);
    } else {
      setResponseBack(dataBackend.error);
    }
  }

  return (
    <div className="container-xl my-5 p-5">
      <div className="row g-1 p-5">
        <div className="col-12 text-center p-2">
          <h3 className="text-white">
            Your user its not verified.
            <br /> Please check your email and copy the code for verified your
            account.
          </h3>
        </div>
        <div className="col-md-6 offset-md-3 p-2 text-center fs-5">
          <input
            type="text"
            className="form-control text-center m-2"
            onChange={(e) => setCode(e.target.value)}
          ></input>
        </div>
        <div className="container text-center p-3">
          {time === 0 ? (
            <button
              className="btn btn-dark col-4 p-2"
              type="submit"
              onClick={() => resendCode()}
            >
              Resend code
            </button>
          ) : (
            <button className="btn btn-dark disabled p-2 col-4" type="submit">
              Resend code - {time}
            </button>
          )}
          <button
            className="btn btn-dark col-4 p-2 ms-2"
            type="submit"
            onClick={() => validateCode()}
          >
            Validate code
          </button>
        </div>
      </div>
      {responseBack === "Verification code incorrect" ? (
        <div className="text-danger text-center">
          <h6>{responseBack}</h6>
        </div>
      ) : (
        <div className="text-success text-center">
          <h6>{responseBack}</h6>
        </div>
      )}
    </div>
  );
};

export default Verification;

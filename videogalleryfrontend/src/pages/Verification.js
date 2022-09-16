import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Verification = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const { setUser, setSession } = useContext(UserContext);
  const [time, setTime] = useState(5);
  const [responseBack, setResponseBack] = useState("");
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  var count;
  useEffect(() => {
    if (time > 0) {
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
    <div className="container-lg my-5 mb-5 p-4">
      <div className="row row g-1 p-4 border border-dark rounded">
        <div className="col-12 text-center p-3">
          <h3>
            Your user its not verified.
            <br /> Please check your email and copy the code for verified your
            account.
          </h3>
        </div>
        <div className="col-12 p-2 text-center fs-5">
          <input
            type="text"
            className="text-center m-2"
            onChange={(e) => setCode(e.target.value)}
          ></input>
        </div>
        <div className="col-12 text-center p-2">
          {time === 0 ? (
            <button
              type="submit"
              className="btn btn-primary m-2"
              onClick={() => resendCode()}
            >
              Resend code
            </button>
          ) : (
            <button type="submit" className="btn btn-primary m-2 disabled">
              Resend code - {time}
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={() => validateCode()}
          >
            Validate code
          </button>
          {responseBack === "Verification code incorrect" ? (
            <div className="text-danger">
              <small>{responseBack}</small>
            </div>
          ) : (
            <div className="text-success">
              <small>{responseBack}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Form = () => {
  const [credentialError, setCredentialError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, setSession, setVerification } = useContext(UserContext);

  async function login(dataForm) {
    const data = {
      userEmail: dataForm.userEmail,
      userPassword: dataForm.userPassword,
    };
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataBackend = await response.json();
    if(dataBackend.route !== "/register") {
      if (dataBackend.error !== "Password incorrect") {
        if (dataBackend.route !== "/verification") {
          if (dataBackend.route === "/") {
            window.localStorage.setItem("user", JSON.stringify(dataBackend.user));
            setUser(dataBackend.user);
            window.localStorage.setItem("session", true)
            setSession(true);
            navigate(dataBackend.route);
          }
        }else {
          setVerification(true);
          navigate(dataBackend.route, {state: { userId: dataBackend.userId}})
        }
      }else {
        setCredentialError(dataBackend.error);
      }
    }else {
      navigate(dataBackend.route);
    }
  }

  return (
    <form
      className="row p-2 text-white"
      onSubmit={handleSubmit(login)}
    >
      <div className="col-12 p-2">
        <h3 className="fw-bolder">Login</h3>
      </div>
      <div className="col-12 p-2">
        <label htmlFor="userEmail" className="form-label fw-bolder">
          Email:
        </label>
        <input
          type="text"
          className="form-control border-dark"
          name="userEmail"
          id="userEmail"
          placeholder="example@email.com"
          autoComplete="nope"
          {...register("userEmail", {
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.userEmail?.type === "pattern" && (
          <div className="text-danger">
            <small>Format email not valid.</small>
          </div>
        )}
        {errors.userEmail?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
      </div>
      <div className="col-12 p-2">
        <label htmlFor="userPassword" className="form-label fw-bolder">
          Password:
        </label>
        <input
          type="password"
          className="form-control border-dark"
          name="userPassword"
          id="userPassword"
          autoComplete="nope"
          {...register("userPassword", { required: true })}
        />
        {errors.userPassword?.type === "required" && (
          <div className="text-danger">
            <small>This field is required.</small>
          </div>
        )}
      </div>
      {credentialError !== "" && (
        <div className="text-danger">
          <small>{credentialError}</small>
        </div>
      )}
      <div className="d-grid col-6 mx-auto p-2 my-2">
        <button className="btn btn-dark" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Form;
